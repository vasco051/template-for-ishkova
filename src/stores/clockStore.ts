import {makeAutoObservable, observable, values} from 'mobx';

import ClockService from 'api/clockService.ts';

import {TClock} from 'types/entities/TClock.ts';
import {IClockStore} from 'types/stores/IClockStore.ts';

export class ClockStore implements IClockStore {
  _clocks = observable.map<number, TClock>()
  _currentClock: TClock | null = null
  _isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  // gets
  get clocks() {
    return values(this._clocks)
  }

  get currentClock() {
    return this._currentClock
  }

  // sets
  setClock(clock: TClock) {
    this._clocks.set(clock.id, clock)
  }

  setCurrentClock(clock: TClock | null) {
    this._currentClock = clock
  }

  setIsLoading(isLoading: boolean) {
    this._isLoading = isLoading
  }

  fetchClocks = async (query?: string) => {
    this.setIsLoading(true)
    this._clocks.clear()

    const response = await ClockService.fetchClocks(query)

    if ('data' in response) {
      response.data.forEach(clock => this.setClock(clock))
    }

    this.setIsLoading(false)
  }

  fetchClock = async (id: number) => {
    this.setIsLoading(true)
    this.setCurrentClock(null)

    const response = await ClockService.fetchClock(id)

    if ('data' in response) {
      this.setCurrentClock(response.data[0])
    }

    this.setIsLoading(false)
  }
}