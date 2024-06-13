import {Link} from 'react-router-dom';

import {staticLinks} from 'config/routingLinks.ts';

import IcCatalog from 'assets/icons/ic_catalog.svg?react';
import IcBasket from 'assets/icons/ic_basket.svg?react';
import ImgLogo from 'assets/images/img_logo.png';
import styles from './Header.module.scss'

export const Header = () => {
  const links = [
    {
      title: 'Каталог',
      icon: <IcCatalog/>,
      link: staticLinks.main
    },
    {
      title: 'Корзина',
      icon: <IcBasket/>,
      link: staticLinks.basket
    },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to={staticLinks.main}>
          <img src={ImgLogo} alt="logo" className={styles.logo}/>
        </Link>

        <ul className={styles.items}>
          {links.map((link, index) => (
            <li className={styles.item} key={index}>
              <Link to={link.link} className={styles.link}>
                {link.icon}
                <span className={styles.itemTitle}>{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}