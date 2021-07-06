import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.serverUrl,
  credentials: 'include',
  cache: new InMemoryCache()
})

export default client
