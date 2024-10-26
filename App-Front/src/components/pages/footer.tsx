import { Box } from '@mui/material'

export default function Footer() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        Footer
      </Box>
    </div>
  )
}
