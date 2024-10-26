import { Box } from '@mui/material'
import { FC, useRef } from 'react'

import Footer from '../../components/pages/footer.tsx'
import SubscriptionList from '../../components/parts/SubscriptionList/SubscriptionList.tsx'
import HeaderLanding from './components/LandingHeader.tsx'

const LandingPage: FC = () => {
  const pricingRef = useRef<HTMLDivElement>(null)
  const produitRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5' }}>
      <HeaderLanding
        pricingRef={pricingRef}
        produitRef={produitRef}
        scrollToSection={scrollToSection}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <h1>Boilerplate-Production-App</h1>
          <> Here a beautilful landing page </>
        </div>
      </div>

      <div
        ref={pricingRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SubscriptionList />
      </div>

      <Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default LandingPage
