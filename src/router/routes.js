
const routes = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'countryList', component: () => import('pages/IndexPage.vue') },
      { path: '/country/:cca3', name: 'countryDetail', component: () => import('pages/countryDetail.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
