import { Box, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, MouseEvent, useContext } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/slices/auth';
import { AlertsContext } from '../App';

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const {addAlert} = useContext(AlertsContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    addAlert({text: 'You are logged out', severity: 'info'})
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
