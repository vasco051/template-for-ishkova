export type TClock = {
  id: number,
  name: string,
  description: string,
  city: string,
  type: string,
  color: string,
  price: number,
  prev_price: number | null,
  in_stock: boolean,
  images: string[]
}