import {TClock} from 'types/entities/TClock.ts';

export interface IBasketStore {
  get clocks(): readonly TClock[]
  get currentClocks(): readonly TClock[]
  get priceClocks(): TPriceClock
  hasItemInBasket(id: number): boolean
  hasItemInCurrentClocks(id: number): boolean

  fetchBasket(): void
  addItemInBasket(item: TClock): void
  removeItemInBasket(item: TClock): void
  changeCurrentItem(item: TClock): void
}

type TPriceClock = {
  priceAllBasket: number;
  prevPriceAllBasket: number;
  priceCurrentBasket: number;
  prevPriceCurrentBasket: number;
}