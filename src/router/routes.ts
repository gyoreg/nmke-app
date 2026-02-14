import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'raktar',
        component: () => import('pages/raktar/_layout.vue'),
        meta: {
          sectionTabs: [
            { label: 'Eszközök', to: '/raktar/eszkozok', icon: 'mdi-warehouse' },
            { label: 'Helyszínek', to: '/raktar/helyszinek', icon: 'mdi-map-marker' },
          ],
        },
        children: [
          { path: '', component: () => import('pages/raktar/IndexPage.vue') },
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
