import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { auth } from "../Services/firebase";
import { signOut } from "firebase/auth";

const settings = ['Profile', 'Logout'];

const NavBar = () => {
  const [anchorUser, setAnchorUser] = useState(null);
  const [locationServices, setLocationServices] = useState('On');
  const [switchStatus, setSwitchStatus] = useState(true);

  const logout = async () => {
    await signOut(auth);
  };

  const handleOpenUserMenu = (e) => {
    setAnchorUser(e.currentTarget);
  };
  const handleCloseUserMenu = (e) => {
    if (e.target.innerHTML === 'Logout') {
      logout();
    }
    setAnchorUser(null);
  };

  const handleSwitch = (e) => {
    setSwitchStatus(e.target.checked);

    if (e.target.checked){
      setLocationServices('On');
    } else {
      setLocationServices('Off');
    }
  }

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl' >
        <Toolbar>
          <FormControl>
            <Box sx={{flexGrow: 0}}>
              <FormControlLabel
                value="start"
                control={<Switch color="secondary" checked={switchStatus} onChange={handleSwitch} />}
                label={`Location ${locationServices}`}
                labelPlacement="start"
              />
            </Box>
          </FormControl>

          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display:'flex', justifyContent: 'center' }}
          >
            PROXIMITY
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
