import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from "@/components/Layout.vue";

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../components/About.vue')
      },
      {
        path: '/separate/two-voice',
        name: 'SeparateTwoVoice',
        component: () => import('../components/separate/SeparateTwoVoice.vue')
      },
      {
        path: '/separate/voice-noise',
        name: 'SeparateVoiceNoise',
        component: () => import('../components/separate/SeparateVoiceNoise.vue')
      },
      {
        path: '/recording',
        name: 'Recorder',
        component: () => import('../components/recorder/Recorder.vue')
      },
      {
        path: '/personal/account',
        name: 'Personal-Account',
        component: () => import('../components/personal/Account.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
