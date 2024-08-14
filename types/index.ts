export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string;
  rating: number;
}

export interface Guests {
  rooms: number;
  adults: number;
  children: number;
  checkin: string;
  checkout: string;
}