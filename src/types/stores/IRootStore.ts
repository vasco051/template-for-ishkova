import {IClockStore} from './IClockStore.ts';
import {IBasketStore} from './IBasketStore.ts';

export interface IRootStore {
  clock: IClockStore
  basket: IBasketStore
}