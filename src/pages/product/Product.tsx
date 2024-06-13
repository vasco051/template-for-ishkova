import {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useParams} from 'react-router-dom';
import clsx from 'clsx';

import {useStore} from 'hooks/useStore.ts';
import Breadcrumbs from 'components/ui/breadcrumbs';
import {Button, ButtonTheme, ButtonVariant} from 'components/ui-kit/buttons';

import {staticLinks} from 'config/routingLinks.ts';

import {TBreadcrumbsItem} from 'components/ui/breadcrumbs/types.ts';
import {TClock} from 'types/entities/TClock.ts';

import styles from './Product.module.scss';

export const ProductPage = observer(() => {
  const store = useStore()
  const basketStore = store.basket
  const {currentClock, fetchClock} = store.clock

  const [indexCurrentImage, setIndexCurrentImage] = useState(0)
  const {id} = useParams()

  useEffect(() => {
    fetchClock(+id!)
  }, []);

  if (!currentClock) return null

  const onAddInBasket = (item: TClock) => basketStore.addItemInBasket(item)

  const onRemoveInBasket = (item: TClock) => basketStore.removeItemInBasket(item)

  const breadcrumbs: TBreadcrumbsItem[] = [
    {
      title: 'Каталог'
    },
    {
      title: 'Наручные часы',
      link: staticLinks.products
    },
    {
      title: currentClock.name
    }
  ]

  const inBasket = basketStore.hasItemInBasket(currentClock.id)

  const inStockState = currentClock.in_stock ? 'Есть в наличии' : 'Нет в наличии'

  const inStockClasses = clsx(styles.text, {
    [styles.inStock]: currentClock.in_stock,
    [styles.notInStock]: !currentClock.in_stock
  })

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Breadcrumbs items={breadcrumbs}/>

        <section className={styles.header}>
          <div className={styles.imageWrapper}>
            <img src={currentClock.images[indexCurrentImage]} className={styles.image}/>

            <ul className={styles.imageList}>
              {currentClock.images.length > 1 && currentClock.images.map((imageLink, index) => (
                <li className={styles.imageItem} onClick={() => setIndexCurrentImage(index)}>
                  <img src={imageLink} alt="" className={styles.itemImage}/>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.right}>
            <h1 className={styles.title}>{currentClock.name}</h1>

            <p className={styles.description}>{currentClock.description}</p>

            <div className={styles.info}>
              <span className={styles.text}>Страна производства: {currentClock.city}</span>
              <span className={styles.text}>Тип механизма: {currentClock.type}</span>
              <span className={styles.text}>Цвет: {currentClock.color}</span>
            </div>

            <span className={inStockClasses}>{inStockState}</span>

            {inBasket
              ? (
                <Button
                  className={styles.button}
                  theme={ButtonTheme.OUTLINED}
                  variant={ButtonVariant.ROUNDED}
                  onClick={() => onRemoveInBasket(currentClock)}
                >
                  Убрать из корзины
                </Button>
              ) : (
                <Button
                  className={styles.button}
                  variant={ButtonVariant.ROUNDED}
                  onClick={() => onAddInBasket(currentClock)}
                >
                  Добавить в корзину
                </Button>
              )}
          </div>
        </section>
      </div>
    </main>
  )
})