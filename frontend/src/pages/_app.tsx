import type { ReactElement, ReactNode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './_app.css'
import '../pages/home/home.scss'
import '../pages/printables/printables.scss'
import './globals.scss'
import '../pages/channel/channel.scss'
import '../pages/awards/awards.scss'
import '../pages/about/about.scss'
import '../pages/contact/contact.scss'
import '../pages/login/login.scss'
import '../pages/register/register.scss'
import '../pages/cart/cart.scss'
import '../pages/product/product.scss'
import './checkoutold/checkout.scss'
import '../pages/password/password.scss'
import '../pages/logout/logout.scss'
import '../pages/admin/admin.scss'
import '../pages/books/books.scss'
import '../pages/artprints/artprints.scss'
import '../pages/application/application.scss'
import '../pages/checkout/checkoutnew.scss'
import '../pages/account/account.scss'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { NextPage } from 'next'
import store from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, } from 'redux-persist'
import { Provider } from 'react-redux'

let persistor = persistStore(store);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
  

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)
  
  return getLayout(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>   
    )

}

