import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
let root = document.querySelector('auto-translate-for-youtube')
if(!root){
  root = document.createElement('auto-translate-for-youtube')
  document.body.appendChild(root)
  const app = createApp(App)
  app.use(ElementPlus)
  app.mount(root)
}

