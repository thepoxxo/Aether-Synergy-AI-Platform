import { dbService } from './db';
import { StoredUser, BillingInvoice, UserPaymentMethod } from '../types/database';

const INVOICES_KEY = 'aether_billing_invoices_v1';
const AUTO_BILLING_SETTINGS_KEY = 'aether_auto_billing_enabled_v1';

export interface AutoBillingResult {
  chargedCount: number;
  failedCount: number;
  downgradedCount: number;
  totalCollected: number;
  logs: string[];
}

class BillingService {
  private invoices: BillingInvoice[] = [];
  private autoBillingEnabled: boolean = true;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(INVOICES_KEY);
      if (stored) {
        this.invoices = JSON.parse(stored);
      } else {
        // Initial sample invoices
        this.invoices = [
          {
            id: 'inv_2026_08_01',
            userId: 'usr_agency_01',
            userName: 'Jane Doe',
            userEmail: 'jane@quantumdigital.studio',
            amount: 149,
            planName: 'Agency Enterprise',
            cardLast4: '4242',
            status: 'paid',
            date: '2026-08-10 14:32:00',
            description: 'Renovación mensual suscripción Agency (5 licencias + 9,999 renders IA)'
          },
          {
            id: 'inv_2026_08_02',
            userId: 'usr_pro_01',
            userName: 'Sarah Connor',
            userEmail: 'sarah.design@aurora.studio',
            amount: 49,
            planName: 'Pro Designer',
            cardLast4: '8821',
            status: 'paid',
            date: '2026-08-15 09:15:00',
            description: 'Renovación mensual suscripción Pro Studio (500 renders IA)'
          }
        ];
        this.saveInvoices();
      }

      const autoSetting = localStorage.getItem(AUTO_BILLING_SETTINGS_KEY);
      this.autoBillingEnabled = autoSetting !== 'false';
    } catch (e) {
      this.invoices = [];
    }
  }

  private saveInvoices() {
    try {
      localStorage.setItem(INVOICES_KEY, JSON.stringify(this.invoices));
    } catch (e) {
      console.error('Error saving invoices', e);
    }
  }

  public getInvoices(): BillingInvoice[] {
    return [...this.invoices];
  }

  public isAutoBillingEnabled(): boolean {
    return this.autoBillingEnabled;
  }

  public setAutoBillingEnabled(enabled: boolean) {
    this.autoBillingEnabled = enabled;
    localStorage.setItem(AUTO_BILLING_SETTINGS_KEY, String(enabled));
  }

  /**
   * Ejecuta el cobro a un usuario individual si tiene tarjeta registrada.
   */
  public chargeUser(userId: string): { success: boolean; message: string; invoice?: BillingInvoice } {
    const user = dbService.getUserById(userId);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado en base de datos.' };
    }

    if (user.role === 'free' || user.planPrice === 0) {
      return { success: false, message: 'El usuario está en Plan Free ($0), no requiere cobro.' };
    }

    if (!user.paymentCard) {
      return {
        success: false,
        message: 'El usuario no tiene una tarjeta de crédito o débito registrada para cobro automático.'
      };
    }

    // Cobro exitoso simulado con Stripe / Recurrente
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const renewalDateStr = nextMonth.toISOString().split('T')[0];

    const newInvoice: BillingInvoice = {
      id: `inv_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      amount: user.planPrice,
      planName: user.planName,
      cardLast4: user.paymentCard.last4,
      status: 'paid',
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description: `Cobro automático exitoso: ${user.planName} ($${user.planPrice} USD)`
    };

    this.invoices.unshift(newInvoice);
    this.saveInvoices();

    // Actualizar usuario en DB
    const allUsers = dbService.getAllUsers();
    const updatedUsers = allUsers.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          subscriptionStatus: 'active' as const,
          subscriptionRenewalDate: renewalDateStr,
          lastPaymentDate: newInvoice.date,
          lastPaymentAmount: user.planPrice,
          billingFailuresCount: 0,
          aiCredits: {
            total: u.role === 'agency' ? 9999 : 500,
            used: 0
          }
        };
      }
      return u;
    });

    localStorage.setItem('aether_users_database_v1', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('aether_database_updated'));

    return {
      success: true,
      message: `¡Cobro automático de $${user.planPrice} USD procesado con éxito en tarjeta •••• ${user.paymentCard.last4}! Suscripción extendida hasta ${renewalDateStr}.`,
      invoice: newInvoice
    };
  }

  /**
   * Ejecuta el escaneo general y cobro automático recurrente de todas las suscripciones vencidas.
   */
  public runAutoBillingSweep(): AutoBillingResult {
    const users = dbService.getAllUsers();
    let chargedCount = 0;
    let failedCount = 0;
    let downgradedCount = 0;
    let totalCollected = 0;
    const logs: string[] = [];

    const now = new Date();

    const updatedUsers = users.map((user) => {
      // Solo evaluar usuarios que no sean Free y no sean Admin
      if (user.role === 'free' || user.role === 'admin' || user.planPrice === 0) {
        return user;
      }

      const isDue =
        user.subscriptionStatus === 'expired' ||
        user.subscriptionStatus === 'past_due' ||
        !user.subscriptionRenewalDate ||
        new Date(user.subscriptionRenewalDate) <= now;

      if (!isDue) {
        return user;
      }

      // Si tiene tarjeta registrada y autorizada para auto-renovación
      if (user.paymentCard && user.paymentCard.autoRenew) {
        // Simulación: las tarjetas con last4 != '0000' pasan con éxito
        if (user.paymentCard.last4 !== '0000') {
          chargedCount++;
          totalCollected += user.planPrice;

          const nextMonth = new Date();
          nextMonth.setDate(nextMonth.getDate() + 30);
          const renewalDateStr = nextMonth.toISOString().split('T')[0];

          const invoice: BillingInvoice = {
            id: `inv_auto_${Date.now()}_${user.id}`,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            amount: user.planPrice,
            planName: user.planName,
            cardLast4: user.paymentCard.last4,
            status: 'paid',
            date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            description: `Auto-Billing Cron: Renovación exitosa ${user.planName}`
          };
          this.invoices.unshift(invoice);

          logs.push(`✅ [Cobro Exitoso] ${user.name} (${user.email}) -> $${user.planPrice} USD cobrados a •••• ${user.paymentCard.last4}.`);

          return {
            ...user,
            subscriptionStatus: 'active' as const,
            subscriptionRenewalDate: renewalDateStr,
            lastPaymentDate: invoice.date,
            lastPaymentAmount: user.planPrice,
            billingFailuresCount: 0,
            aiCredits: {
              total: user.role === 'agency' ? 9999 : 500,
              used: 0
            }
          };
        } else {
          // Tarjeta rechazada / fondos insuficientes
          failedCount++;
          const newFailures = (user.billingFailuresCount || 0) + 1;
          logs.push(`❌ [Fallo de Tarjeta] ${user.name} -> Tarjeta •••• ${user.paymentCard.last4} rechazada (Intento ${newFailures}/3).`);

          if (newFailures >= 3) {
            downgradedCount++;
            logs.push(`⚠️ [Degradación a Free] ${user.name} degradado a Free Starter tras 3 intentos fallidos de cobro.`);
            return {
              ...user,
              role: 'free' as const,
              planName: 'Free Starter ($0)',
              planPrice: 0,
              subscriptionStatus: 'canceled' as const,
              billingFailuresCount: newFailures
            };
          }

          return {
            ...user,
            subscriptionStatus: 'past_due' as const,
            billingFailuresCount: newFailures
          };
        }
      } else {
        // No tiene tarjeta registrada
        failedCount++;
        downgradedCount++;
        logs.push(`⚠️ [Sin Tarjeta] ${user.name} no tiene método de pago registrado. Suscripción suspendida y transferida a Free Starter.`);

        return {
          ...user,
          role: 'free' as const,
          planName: 'Free Starter ($0)',
          planPrice: 0,
          subscriptionStatus: 'expired' as const,
          billingFailuresCount: (user.billingFailuresCount || 0) + 1
        };
      }
    });

    this.saveInvoices();
    localStorage.setItem('aether_users_database_v1', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('aether_database_updated'));

    return {
      chargedCount,
      failedCount,
      downgradedCount,
      totalCollected,
      logs
    };
  }

  /**
   * Elimina permanentemente a un usuario de la plataforma y revoca sus credenciales.
   */
  public deleteUser(userId: string): { success: boolean; message: string } {
    const users = dbService.getAllUsers();
    const userToDelete = users.find((u) => u.id === userId);

    if (!userToDelete) {
      return { success: false, message: 'El usuario no existe o ya fue eliminado.' };
    }

    if (userToDelete.role === 'admin' && users.filter((u) => u.role === 'admin').length <= 1) {
      return { success: false, message: 'No puedes eliminar al único Super Administrador de la plataforma.' };
    }

    const filtered = users.filter((u) => u.id !== userId);
    localStorage.setItem('aether_users_database_v1', JSON.stringify(filtered));
    window.dispatchEvent(new Event('aether_database_updated'));

    return {
      success: true,
      message: `El usuario ${userToDelete.name} (${userToDelete.email}) y todas sus licencias han sido eliminados de forma permanente.`
    };
  }
}

export const billingService = new BillingService();
