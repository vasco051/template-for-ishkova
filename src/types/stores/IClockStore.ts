import {TClock} from 'types/entities/TClock.ts';

export interface IClockStore {
  get clocks(): readonly TClock[]
  get currentClock(): TClock | null

  fetchClocks(query?: string): void
  fetchClock(id: number): void
}