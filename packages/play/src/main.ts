import { createApp } from 'vue'
import App from './App.vue'
import ToyElement from 'xiaozi-element'
import { zhCn } from '@xiaozi-element/locale'
import 'xiaozi-element/dist/index.css'

createApp(App).use(ToyElement,{locale:zhCn}).mount('#app')
