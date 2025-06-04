// lib/apolloClient.ts
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql', // GraphQL エンドポイント
});

const authLink = setContext((_, { headers }) => {
  // localStorage はクライアント側限定で使う
  if (typeof window === 'undefined') {
    return { headers }; // SSR中はトークンなし
  }

  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
