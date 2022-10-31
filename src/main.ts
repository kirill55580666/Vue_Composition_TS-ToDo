import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import {GlobalComponents} from '@/components/ui'
import component from "*.vue";
import router from "@/router";
import VIntersection from "./directives/VIntersection"
import VFocus from "./directives/VFocus";

const app = createApp(App);

GlobalComponents.forEach((component) => {
    app.component(component.name, component.component)
})

app.directive('intersection', VIntersection)
app.directive(VFocus.name, VFocus)

app
    .use(router)
    .use(store)
    .mount('#app')
