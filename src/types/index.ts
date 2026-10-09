export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
}

export interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'wedding' | 'mashiya' | 'engagement' | 'events' | 'hospitality';
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  duration: string;
  badge?: string;
  popular?: boolean;
  image: string;
  description: string;
  features: string[];
  inclusions: string[];
  suggestedAddOns?: AddOnItem[];
}

export interface CartItem {
  id: string;
  packageId: string;
  name: string;
  basePrice: number;
  duration: string;
  image: string;
  quantity: number;
  guestCount?: number;
  hospitalityBoxesCount?: number;
  hospitalityBoxPrice?: number;
  selectedAddOns: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  eventDate?: string;
  notes?: string;
}

export interface CustomerOrderData {
  orderId: string;
  fullName: string;
  phoneNumber: string;
  eventType: string;
  eventDate: string;
  address: string;
  landmark: string;
  notes: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}
