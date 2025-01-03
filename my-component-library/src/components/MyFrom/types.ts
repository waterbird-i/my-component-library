export interface Option {
  value: string;
  label: string;
}

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'select';
  options?: Option[];
  required?: boolean;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
}

export interface FormData {
  [key: string]: string | boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormOptions {
  validate?: (values: FormData) => ValidationErrors;
  onSuccess?: () => void;
} 