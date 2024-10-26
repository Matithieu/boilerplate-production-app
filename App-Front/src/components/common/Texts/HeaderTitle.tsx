import { Box, Typography } from '@mui/material'
import { FC } from 'react'

type HeaderTitleProps = {
  text: string
}

const HeaderTitle: FC<HeaderTitleProps> = ({ text }) => {
  return (
    <Box>
      <Typography sx={{ marginTop: 2 }} variant="h3">
        {text}
      </Typography>
    </Box>
  )
}

export default HeaderTitle
