import react from "react";
import Index from '../../components/printables/Index'
import LayoutNew from "components/common/LayoutNew";

export default function Printables() {
    return (
        <div>
           <Index />
        </div>
    )
}

Printables.getLayout = function getLayout(page) {
  return (
    <LayoutNew>
          {page}
    </LayoutNew>
  )
} 