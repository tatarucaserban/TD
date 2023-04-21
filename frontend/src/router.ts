import { createWebHistory, createRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/drums',
    name: 'drums',
    component: () => import('./components/DrumsList.vue')
  },
  {
    path: '/drums/:id',
    name: 'drum-details',
    component: () => import('./components/DrumDetails.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('./components/AddDrum.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
