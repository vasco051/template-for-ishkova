import {TClock} from 'types/entities/TClock.ts';

export interface IClockItemProps {
  item: TClock
  isCurrent: boolean
  onChangeIsCurrent(item: TClock): void
  onRemoveInBasket(item: TClock): void
}