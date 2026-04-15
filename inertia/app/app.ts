import '../css/app.css'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createApp, type DefineComponent, h } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import Layout from '../layouts/Default.vue'

createInertiaApp({
  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue'),
      Layout
    )
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ui)
      .mount(el)
  },
  progress: {
    color: '#57534e',
  },
})
