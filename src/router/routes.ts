import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'raktar',
        component: () => import('pages/raktar/IndexPage.vue'),
        children: [
          { path: '', redirect: '/raktar/eszkozok' },
          { path: 'eszkozok', component: () => import('pages/raktar/EszkozokPage.vue') },
          { path: 'helyszinek', component: () => import('pages/raktar/HelyszinekPage.vue') },
        ],
      },
      { path: 'foglalasok', component: () => import('pages/FoglalasokPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
