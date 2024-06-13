import {CatalogPage} from 'pages/catalog/Catalog.tsx';
import {BasketPage} from 'pages/basket/Basket.tsx';
import {ProductPage} from 'pages/product/Product.tsx';
import {NotFoundPage} from 'pages/not-found/NotFound.tsx';

import {staticLinks} from 'config/routingLinks.ts';

export const publicRoutes = [
  {
    path: staticLinks.main,
    element: <CatalogPage/>
  },
  {
    path: staticLinks.products,
    element: <CatalogPage/>
  },
  {
    path: staticLinks.product,
    element: <ProductPage/>
  },
  {
    path: staticLinks.basket,
    element: <BasketPage/>
  },
  {
    path: staticLinks.notFound,
    element: <NotFoundPage/>
  }
]