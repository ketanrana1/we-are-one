import Header from './Header'
import FooterNew from './FooterNew'
import styles from '../styles/Layout.module.css'
import store from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, } from 'redux-persist'
import { Provider } from 'react-redux'

let persistor = persistStore(store);


const LayoutNew = ({children}) => {
  return (
    <div>
         <Provider store={store} >
          <Header />
          {children}
          <FooterNew />
          </Provider>
    </div>
  )
}

export default LayoutNew