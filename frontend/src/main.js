import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import App from './App.vue'
import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

// Plugins
import { registerPlugins } from '@/plugins'
import vuetify from './plugins/vuetify'
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(apolloProvider)

registerPlugins(app)

app
  .use(vuetify)
  .mount('#app')
