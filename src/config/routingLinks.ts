export const staticLinks = {
  main: '/',
  basket: '/basket',
  products: '/products',
  product: '/products/:id',

  notFound: '/*'
}

export const dynamicLinks = {
  product: (id: number) => `/products/${id}`
}