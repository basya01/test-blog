import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import blue from '@mui/material/colors/blue';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation('auth');

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
          {t('auth')}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField required variant="standard" label={t('login')} name="login" />
          <TextField type="password" required variant="standard" label={t('pass')} name="password" />
        </Box>
        <Button type="submit" sx={{ mt: 2 }} variant="contained">
          {t('send')}
        </Button>
      </Box>
    </Modal>
  );
};
