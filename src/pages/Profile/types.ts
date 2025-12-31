export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

export interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

export interface QuickLink {
  title: string;
  description: string;
  onClick: () => void;
}
