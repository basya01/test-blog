import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { addAlert } from '../store/slices/alerts';
import { logout } from '../store/slices/auth';

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(addAlert({text: 'You are logged out', severity: 'info'}));
    dispatch(logout());
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon fontSize="large" color="primary" to="/profile" />
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClick={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link to="/profile">My Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link to="/">Log Out</Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};
