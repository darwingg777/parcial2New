import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as bootstrap from 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css';


window.bootstrap = bootstrap
const app = createApp(App)
 
app.use(router)
app.mount('#app')
