import App from '@/App.vue'
import 'vue-skeletor/dist/vue-skeletor.css';
import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import router from '@/router'
import { Skeletor } from 'vue-skeletor';


// Plugins
import { registerPlugins } from '@/plugins'
import vuetify from '@/plugins/vuetify'
import {apolloProvider, apolloClient} from '@/plugins/apollo'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})


app.use(router)
app.use(apolloProvider)
app.use(vuetify)
app.component(Skeletor.name, Skeletor);

registerPlugins(app)

app.mount('#app')
