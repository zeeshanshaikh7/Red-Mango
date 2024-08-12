import { Banner } from "../components/pages/common"
import { MenuItemsList } from "../components/pages/Home"

const Home = () => {
  return (
    <div>
        <Banner/>
        <div className="container p-2">
            <MenuItemsList/>
        </div>
    </div>
  )
}

export default Home