export interface CartItem {
  id: number;
  basket_id: number;
  preview_img: string;
  title: string;
  count: number;
  price: number;
  status_order: string;
}

export interface CartState {
  items: CartItem[];
}
