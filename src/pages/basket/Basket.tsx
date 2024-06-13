import {observer} from 'mobx-react';

import {useStore} from 'hooks/useStore.ts';
import Breadcrumbs from 'components/ui/breadcrumbs';
import {ClockItem} from './components/clock-item/ClockItem.tsx';

import {staticLinks} from 'config/routingLinks.ts';
import {splitNumber} from 'utils/numberUtils.ts';

import {TClock} from 'types/entities/TClock.ts';
import {TBreadcrumbsItem} from 'components/ui/breadcrumbs/types.ts';

import styles from './Basket.module.scss'

export const BasketPage = observer(() => {
  const basketStore = useStore().basket

  const breadcrumbs: TBreadcrumbsItem[] = [
    {
      title: 'Каталог',
      link: staticLinks.main
    },
    {
      title: 'Корзина'
    }
  ]

  const basketPrice = basketStore.priceClocks

  const getIsItemInCurrent = (id: number) => basketStore.hasItemInCurrentClocks(id)

  const onChangeIsCurrent = (item: TClock) => basketStore.changeCurrentItem(item)

  const onRemoveInBasket = (item: TClock) => basketStore.removeItemInBasket(item)

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Breadcrumbs items={breadcrumbs}/>

        <div className={styles.header}>
          <h1 className={styles.title}>Корзина</h1>

          <div className={styles.priceWrapper}>
            <span className={styles.text}>Выбранно {basketStore.currentClocks.length} товаров на</span>
            <span className={styles.price}>{splitNumber(basketPrice.priceCurrentBasket)} ₽</span>
            <span className={styles.prevPrice}>{splitNumber(basketPrice.prevPriceCurrentBasket)} ₽</span>
          </div>

          <div className={styles.priceWrapper}>
            <span className={styles.text}>Стоимость всей корзины</span>
            <span className={styles.price}>{splitNumber(basketPrice.priceAllBasket)} ₽</span>
            <span className={styles.prevPrice}>{splitNumber(basketPrice.prevPriceAllBasket)} ₽</span>
          </div>
        </div>

        <ul className={styles.list}>
          {basketStore.clocks.map(clock => (
            <ClockItem
              item={clock}
              key={clock.id}
              isCurrent={getIsItemInCurrent(clock.id)}
              onChangeIsCurrent={onChangeIsCurrent}
              onRemoveInBasket={onRemoveInBasket}
            />
          ))}
        </ul>
      </div>
    </main>
  )
})