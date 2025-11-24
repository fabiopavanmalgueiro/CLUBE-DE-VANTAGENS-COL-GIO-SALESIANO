

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  offer: string;
  offerDetails: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  address: string;
  discountCodePrefix: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isFavorite?: boolean;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  avatarUrl: string;
  totalSavings: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'offer' | 'system' | 'alert';
}

export interface NotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
}