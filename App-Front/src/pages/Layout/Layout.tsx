import { Box } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import LayoutSidebar from './components/LayoutSideBar'

const Layout: FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Box component="main">
        <LayoutSidebar children={<Outlet />} />
      </Box>
    </Box>
  )
}

export default Layout
