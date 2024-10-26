import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeIcon from '@mui/icons-material/LightMode'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles'

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props
  const { mode, setMode } = useColorScheme()

  if (!mode) {
    return <IconButton color="inherit" {...other} disabled sx={sx} />
  }

  return (
    <IconButton
      color="inherit"
      id="toggle-mode"
      {...other}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark')
        } else {
          setMode('light')
        }

        onClick?.(event)
      }}
    >
      {mode === 'dark' ? <DarkModeRoundedIcon /> : <LightModeIcon />}
    </IconButton>
  )
}
