import { Tab, Tabs as MUITabs, Box } from '@mui/material'
import { FC, useState } from 'react'

interface TabsProps {
  tabs: {
    name: string
    element: JSX.Element
  }[]
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', paddingLeft: 5 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MUITabs
          value={value}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
        >
          {tabs.map(({ name }, index) => (
            <Tab key={index} label={name} />
          ))}
        </MUITabs>

        <Box>{tabs[value].element}</Box>
      </Box>
    </Box>
  )
}

export default Tabs
