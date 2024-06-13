import { Link } from "react-router-dom";
import clsx from "clsx";

import { IBreadcrumbsProps } from "./types.ts";

import styles from './styles.module.scss'

const Breadcrumbs = ({items}: IBreadcrumbsProps) => {
  const getItemClasses = (index: number) => clsx(styles.item, {
    [styles.lastItem]: index >= items.length - 1
  })

  return (
    <ul className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <>
          {index >= 1 && <li className={getItemClasses(index)} key={`${index}hr`}><span className={styles.slash}>/</span></li>}

          <li className={getItemClasses(index)} key={index}>
            {'link' in item
              ? <Link to={item.link!}>{item.title}</Link>
              : <span>{item.title}</span>
            }
          </li>
        </>
      ))}
    </ul>
  );
};

export default Breadcrumbs;