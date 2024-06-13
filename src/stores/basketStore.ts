import {observable, values} from 'mobx';

import ClockService from 'api/clockService.ts';
import BasketService from 'api/basketService.ts';

import {IBasketStore} from 'types/stores/IBasketStore.ts';
import {TClock} from 'types/entities/TClock.ts';

export class BasketStore implements IBasketStore {
  _sessionId: string | null = null
  _clocks = observable.map<number, TClock>()
  _currentClocks = observable.map<number, TClock>()

  constructor() {
    const id = localStorage.getItem('sessionId')

    if (id) {
      this._sessionId = id
      this.fetchBasket();
    } else {
      BasketService.createBasket()
    }
  }

  // gets
  get clocks() {
    return values(this._clocks);
  }

  get currentClocks() {
    return values(this._currentClocks);
  }

  get priceClocks() {
    const config = {
      priceAllBasket: 0,
      prevPriceAllBasket: 0,
      priceCurrentBasket: 0,
      prevPriceCurrentBasket: 0,
    }

    this.clocks.forEach(clock => {
      config.priceAllBasket += clock.price
      config.prevPriceAllBasket += clock.prev_price ? clock.prev_price : clock.price
    })

    this.currentClocks.forEach(clock => {
      config.priceCurrentBasket += clock.price
      config.prevPriceCurrentBasket += clock.prev_price ? clock.prev_price : clock.price
    })

    return config
  }

  hasItemInBasket(id: number) {
    return !!this._clocks.get(id)
  }

  hasItemInCurrentClocks(id: number) {
    return !!this._currentClocks.get(id)
  }

  // sets
  setClock(clock: TClock) {
    this._clocks.set(clock.id, clock)
  }

  setCurrentClock(clock: TClock) {
    this._currentClocks.set(clock.id, clock)
  }

  // async
  async fetchBasket() {
    this._clocks.clear()
    this._currentClocks.clear()

    if (this._sessionId) {
      const response = await BasketService.fetchBasket(this._sessionId)

      if ('data' in response) {
        const {clocks_ids, current_clocks_ids} = response.data[0];

        clocks_ids.forEach(clockId => this.fetchClock(clockId, false))
        current_clocks_ids.forEach(clockId => this.fetchClock(clockId, true))
      }
    }
  }

  async addItemInBasket(item: TClock) {
    if (this._sessionId) {
      const getBasketResponse = await BasketService.fetchBasket(this._sessionId)

      if ('data' in getBasketResponse) {
        const basket = getBasketResponse.data[0]

        basket.clocks_ids.push(item.id)
        basket.current_clocks_ids.push(item.id)

        const updateBasketResponse = await BasketService.updateBasket(basket)

        if (updateBasketResponse.status === 200) {
          this.setClock(item)
          this.setCurrentClock(item)
        }
      }
    }
  }

  async removeItemInBasket(item: TClock) {
    if (this._sessionId) {
      const getBasketResponse = await BasketService.fetchBasket(this._sessionId)

      if ('data' in getBasketResponse) {
        const basket = getBasketResponse.data[0]

        basket.clocks_ids = basket.clocks_ids.filter(id => id !== item.id)
        basket.current_clocks_ids = basket.current_clocks_ids.filter(id => id !== item.id)

        const updateBasketResponse = await BasketService.updateBasket(basket)

        if (updateBasketResponse.status === 200) {
          this._clocks.delete(item.id)
          this._currentClocks.delete(item.id)
        }
      }
    }
  }

  async changeCurrentItem(item: TClock) {
    if (this._sessionId) {
      const getBasketResponse = await BasketService.fetchBasket(this._sessionId)

      if ('data' in getBasketResponse) {
        const basket = getBasketResponse.data[0]

        if (!this.hasItemInCurrentClocks(item.id)) basket.current_clocks_ids.push(item.id)
        else basket.current_clocks_ids = basket.current_clocks_ids.filter(id => id !== item.id)

        const updateBasketResponse = await BasketService.updateBasket(basket)

        if (updateBasketResponse.status === 200) {
          if (!this.hasItemInCurrentClocks(item.id)) this.setCurrentClock(item)
          else this._currentClocks.delete(item.id)
        }
      }
    }
  }

  async fetchClock(id: number, isCurrent: boolean) {
    this._clocks.clear()
    this._currentClocks.clear()

    const response = await ClockService.fetchClock(id)

    if ('data' in response) {
      if (isCurrent) this.setCurrentClock(response.data[0])
      else this.setClock(response.data[0])
    }
  }
}