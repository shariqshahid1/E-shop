export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: CartItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
}
