import axios from 'axios';

import {GetBasketResponse} from 'types/api/TBasketResponse.ts';
import {TBasket} from '../types/entities/TBasket.ts';

class BasketService {
  async fetchBasket(id: string) {
    return await axios.get<GetBasketResponse>(`http://localhost:3001/basket?id=${id}`)
  }

  async createBasket() {
    const basket: TBasket = {id: crypto.randomUUID(), clocks_ids: [], current_clocks_ids: []}

    localStorage.setItem('sessionId', basket.id)

    return await axios.post<GetBasketResponse>(`http://localhost:3001/basket`, basket)
  }

  async updateBasket(basket: TBasket) {
    return await axios.put<GetBasketResponse>(`http://localhost:3001/basket/${basket.id}`, basket)
  }
}

export default new BasketService();