import Index from '../../components/channel/Index'
import LayoutNew from 'components/common/LayoutNew';

export default function Channel(){
    return (
        <Index />
    )
}

Channel.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
