import Footer from '../../components/pages/footer'
import SubscriptionList from '../../components/parts/SubscriptionList/SubscriptionList'
import HeaderLanding from '../Landing/components/LandingHeader'

const SubscriptionPage: React.FC = () => {
  return (
    <div>
      <HeaderLanding />
      <SubscriptionList />
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default SubscriptionPage
