import {TClock} from 'types/entities/TClock.ts';

export interface IClockItemProps {
  item: TClock;
  inBasket: boolean;
  onAddInBasket(item: TClock): void
  onRemoveInBasket(item: TClock): void
}