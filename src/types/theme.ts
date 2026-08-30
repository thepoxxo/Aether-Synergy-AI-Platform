export type ThemeMode = 'dark' | 'light' | 'neon';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  iconName: string;
  description: string;
}
