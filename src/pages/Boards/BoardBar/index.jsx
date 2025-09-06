import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        borderBottom: '1px solid white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label='Arya MERN Stack Board'
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label='Public/Private Workspace'
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label='Add to Google Drive'
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label='Automation'
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label='Filters'
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://i.pinimg.com/736x/a1/66/5f/a1665fa365cc0b699cff539eff7c6ae5.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://i.pinimg.com/originals/3d/54/a3/3d54a3afe927891ec41fec08f2c563d8.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://i.redd.it/alya-sometimes-hides-her-feelings-in-russian-anime-teaser-v0-ui348rix27qb1.png?s=ab7a1d3001968b988762cc90fb2d319e2c3d8b72'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://tse3.mm.bing.net/th/id/OIP.09j9q1MY41veAutzee87awHaKg?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://tse1.mm.bing.net/th/id/OIP.HotbTwmM6jBSApuWuCPhLQHaKg?cb=thfc1&w=846&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://s1.zerochan.net/Alisa.Mikhailova.Kujou.600.4127796.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://pbs.twimg.com/media/FQ7P6pQUcAACaei.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://s1.zerochan.net/Alisa.Mikhailova.Kujou.600.4127796.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://pbs.twimg.com/media/FQ7P6pQUcAACaei.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://s1.zerochan.net/Alisa.Mikhailova.Kujou.600.4127796.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://pbs.twimg.com/media/FQ7P6pQUcAACaei.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://s1.zerochan.net/Alisa.Mikhailova.Kujou.600.4127796.jpg'
            />
          </Tooltip>
          <Tooltip title='Arya'>
            <Avatar
              alt='Arya'
              src='https://pbs.twimg.com/media/FQ7P6pQUcAACaei.jpg'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
