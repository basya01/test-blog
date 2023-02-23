import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import blue from '@mui/material/colors/blue';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const AuthModal: FC<Props> = ({open, onClose, onSubmit}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
      <Box
        sx={{
          zIndex: 999,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: `3px solid ${blue[500]}`,
          borderRadius: '8px',
          p: 4,
          width: '300px',
        }}
        onSubmit={onSubmit}
        component="form"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Authorization
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField required variant="standard" label="Login" name="login" />
          <TextField required variant="standard" label="Password" name="password" />
        </Box>
        <Button type="submit" sx={{ mt: 2 }} variant="contained">
          Send
        </Button>
      </Box>
    </Modal>
  );
};