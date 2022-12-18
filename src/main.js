import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

import "@/assets/css/global.css"

createApp(App).use(store).use(router).use(ElementPlus).use(Antd)
    .mount('#app')
