export const staticLinks = {
  main: '/',
  template: '/template/:id',

  notFound: '/*'
}

export const dynamicLinks = {
  template: (id: number) => `/template/${id}`
}