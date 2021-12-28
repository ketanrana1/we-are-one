import Header from './Header'
import FooterNew from './FooterNew'
import styles from '../styles/Layout.module.css'


const LayoutNew = ({children}) => {
  return (
    <div>

          <Header />
          {children}
          <FooterNew />

    </div>
  )
}

export default LayoutNew