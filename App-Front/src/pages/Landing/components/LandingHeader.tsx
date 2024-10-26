import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Typography,
} from '@mui/material'
import { AppBar, Toolbar } from '@mui/material'
import { FC } from 'react'

import useAuthManager from '../../../hooks/useAuthManager'
import useAuthStore from '../../../store/authStore'
import { useAppNavigate } from '../../../utils/navigation/navigation'
import { palette } from '../../../utils/palette'

type HeaderLandingProps = {
  scrollToSection?: (ref: React.RefObject<HTMLDivElement>) => void
  pricingRef?: React.RefObject<HTMLDivElement>
  produitRef?: React.RefObject<HTMLDivElement>
}

const HeaderLanding: FC<HeaderLandingProps> = ({
  scrollToSection,
  pricingRef,
  produitRef,
}) => {
  const { navigation } = useAppNavigate()
  const authManager = useAuthManager()
  const { authUser } = useAuthStore()

  return (
    <AppBar
      style={{
        backgroundColor: palette.background.primary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        boxShadow: 'none',
        position: 'sticky',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <div
        role="banner"
        style={{
          backgroundClip: 'border-box',
          width: '100%',
          marginBottom: 0,
        }}
      >
        <Container
          sx={{
            width: '100%',
            maxWidth: '1150px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Left section: Logo */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: 'black',
                }}
                onClick={() => navigation.toHome()}
              >
                LOGO
              </Typography>
            </Box>

            {/* Center section: Links */}
            <Box
              role="navigation"
              sx={{
                display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginRight: '50px',
              }}
            >
              <Link
                sx={{ color: 'black', mx: 2, cursor: 'pointer' }}
                onClick={() =>
                  scrollToSection && pricingRef && scrollToSection(pricingRef)
                }
              >
                Pricing
              </Link>
              <Link
                sx={{ color: 'black', mx: 2, cursor: 'pointer' }}
                onClick={() =>
                  produitRef && scrollToSection && scrollToSection(produitRef)
                }
              >
                Produit
              </Link>
            </Box>

            {/* Right section: Auth buttons */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {authUser ? (
                <Box>
                  {authUser.isVerified ? (
                    <Link
                      sx={{ color: 'black', mx: 2 }}
                      onClick={() => navigation.toSettings()}
                    >
                      Page
                    </Link>
                  ) : (
                    <Link
                      sx={{ color: 'black', mx: 2 }}
                      onClick={() => navigation.toSubscription()}
                    >
                      Subscription
                    </Link>
                  )}
                  <Link
                    sx={{ color: 'black', mx: 2 }}
                    onClick={() => authManager.signOut()}
                  >
                    Logout
                  </Link>
                </Box>
              ) : (
                <Box
                  sx={{
                    ml: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    sx={{ color: 'black', mx: 2 }}
                    onClick={() => authManager.signIn()}
                  >
                    Login
                  </Link>
                  <Button
                    sx={{
                      ml: 2,
                      display: {
                        xs: 'none',
                        sm: 'flex',
                        md: 'flex',
                        lg: 'flex',
                        xl: 'flex',
                      },
                      flexDirection: 'row',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => authManager.signIn()}
                  >
                    Essai gratuit
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </div>
      <Divider />
    </AppBar>
  )
}

export default HeaderLanding
