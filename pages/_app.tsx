import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ReduxStore from '../redux/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={ReduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
