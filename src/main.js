import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'



const pinia = createPinia()


createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')


const defaultDocumentTitle = 'SlamMaster'


router.afterEach((to) => {
    document.title = to.meta?.title
        ? `${to.meta.title} — ${defaultDocumentTitle}`
        : defaultDocumentTitle
})