import {Link} from 'react-router-dom';
import clsx from 'clsx';

import {Button, ButtonTheme, ButtonVariant} from 'components/ui-kit/buttons';

import {dynamicLinks} from 'config/routingLinks.ts';
import {splitNumber} from 'utils/numberUtils.ts';

import {IClockItemProps} from './types.ts';

import styles from './ClockItem.module.scss'

export const ClockItem = ({item, inBasket, onRemoveInBasket, onAddInBasket}: IClockItemProps) => {
  const inStockState = item.in_stock ? 'В наличии' : 'Нет в наличии'

  const onButtonClickMiddleware = (e: any) => {
    e.preventDefault();

    if (inBasket) onRemoveInBasket(item)
    else onAddInBasket(item)
  }

  const inStockClasses = clsx({
    [styles.inStock]: item.in_stock,
    [styles.notInStock]: !item.in_stock
  })

  return (
    <li className={styles.item}>
      <Link to={dynamicLinks.product(item.id)} target="_blank" className={styles.link}>
        <img className={styles.image} src={item.images[0]} alt="clock"/>

        <div className={styles.center}>
          <h4 className={styles.title}>{item.name}</h4>

          <div className={styles.info}>
            <span>Страна производства: {item.city}</span>
            <span>Тип механизма: {item.type}</span>
            <span>Цвет: {item.color}</span>
          </div>

          <span className={inStockClasses}>{inStockState}</span>
        </div>

        <div className={styles.right}>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{splitNumber(item.price)} ₽</span>
            {!!item.prev_price && <span className={styles.prevPrice}>{splitNumber(item.prev_price)} ₽</span>}
          </div>

          {inBasket
            ? <Button variant={ButtonVariant.ROUNDED} theme={ButtonTheme.OUTLINED} onClick={onButtonClickMiddleware}>В корзине</Button>
            : <Button variant={ButtonVariant.ROUNDED} onClick={onButtonClickMiddleware}>Добавить корзину</Button>
          }
        </div>
      </Link>
    </li>
  )
}