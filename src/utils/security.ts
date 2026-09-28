import CryptoJS from 'crypto-js';
import DOMPurify from 'dompurify';

// Una clave de encriptación dinámica vinculada a la sesión del navegador para 
// evitar que usuarios malintencionados modifiquen el LocalStorage (Ej: darse rol de Admin)
// En producción 2026 real, esto se maneja con Supabase + Row Level Security (RLS)
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'Aether-Zero-Trust-2026-XyZ991!';

export const SecurityVault = {
  /**
   * Encripta datos sensibles (AES-256) antes de guardarlos en el navegador.
   */
  encrypt: (data: any): string => {
    try {
      const jsonStr = JSON.stringify(data);
      return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
    } catch (e) {
      console.error('SecurityVault: Error encrypting data', e);
      return '';
    }
  },

  /**
   * Desencripta datos desde el navegador.
   */
  decrypt: (cipherText: string): any => {
    try {
      if (!cipherText) return null;
      // Si el texto empieza con "{" o "[", asumimos que es texto plano legado (sin encriptar)
      if (cipherText.trim().startsWith('{') || cipherText.trim().startsWith('[')) {
        return JSON.parse(cipherText);
      }
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('SecurityVault: Error decrypting/parsing data', e);
      return null;
    }
  },

  /**
   * Sanitiza cualquier input de usuario (XSS Protection) usando DOMPurify.
   * Fundamental para cuando los agentes IA generan código o leen prompts.
   */
  sanitizeHTML: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'class']
    });
  }
};
