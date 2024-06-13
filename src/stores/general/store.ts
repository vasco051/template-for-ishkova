import {makeAutoObservable} from 'mobx';

import {ClockStore} from '../clockStore.ts';
import {BasketStore} from '../basketStore.ts';

import {IRootStore} from 'types/stores/IRootStore.ts';
import {IClockStore} from 'types/stores/IClockStore.ts';
import {IBasketStore} from 'types/stores/IBasketStore.ts';

export class Store implements IRootStore {
  clock: IClockStore
  basket: IBasketStore

  constructor() {
    this.clock = new ClockStore()
    this.basket = new BasketStore()
    makeAutoObservable(this);
  }
}

export const store = new Store();