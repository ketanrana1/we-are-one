import Header from './Header'
import FooterNew from './FooterNew'
import styles from '../styles/Layout.module.css'

const LayoutNew = ({children}) => {
  return (
    <>
          <Header />
          {children}
          <FooterNew />
    </>
  )
}

export default LayoutNew