import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {observer} from 'mobx-react';

import {useStore} from 'hooks/useStore.ts';
import Breadcrumbs from 'components/ui/breadcrumbs';
import {ClockItem} from './components/clock-item/ClockItem.tsx';
import {SearchPanel} from './components/search-panel/SearchPanel.tsx';

import {TBreadcrumbsItem} from 'components/ui/breadcrumbs/types.ts';
import {TClock} from 'types/entities/TClock.ts';

import styles from './Catalog.module.scss'

export const CatalogPage = observer(() => {
  const store = useStore()
  const clockStore = store.clock
  const basketStore = store.basket

  const [searchParams] = useSearchParams()

  const breadcrumbs: TBreadcrumbsItem[] = [
    {
      title: 'Каталог'
    },
    {
      title: 'Наручные часы'
    }
  ]

  useEffect(() => {
    clockStore.fetchClocks(searchParams.toString())
  }, [searchParams]);

  const getIsItemInBasket = (id: number) => basketStore.hasItemInBasket(id)

  const onAddInBasket = (item: TClock) => basketStore.addItemInBasket(item)

  const onRemoveInBasket = (item: TClock) => basketStore.removeItemInBasket(item)

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Breadcrumbs items={breadcrumbs}/>

        <div className={styles.header}>
          <h1 className={styles.title}>Наручные часы</h1>
          <SearchPanel/>
          <span className={styles.subTitle}>Найдено {clockStore.clocks.length} товаров по вашему запросу</span>
        </div>

        <ul className={styles.list}>
          {clockStore.clocks.map(clock => (
            <ClockItem
              item={clock}
              key={clock.id}
              inBasket={getIsItemInBasket(clock.id)}
              onAddInBasket={onAddInBasket}
              onRemoveInBasket={onRemoveInBasket}
            />
          ))}
        </ul>
      </div>
    </main>
  )
})