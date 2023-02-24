import CloseIcon from '@mui/icons-material/Close';
import { Collapse } from '@mui/material';
import Alert, { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { AlertsContext } from '../App';
import { Alert as IAlert, Severity } from '../models';

interface AlertsProps {
  alerts: IAlert[];
}

interface TempAlertProps extends AlertProps {
  _id: number;
  severity: Severity;
  children?: React.ReactNode;
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  const { deleteAlert } = useContext(AlertsContext);

  const TempAlert: React.FC<TempAlertProps> = React.forwardRef(
    ({ _id, severity, children, ...props }, ref) => {
      const timeOutMemo = React.useMemo(
        () =>
          setTimeout(() => {
            deleteAlert(_id);
          }, 5000),
        []
      );

      const onCloseAlert = (id: number) => {
        clearInterval(timeOutMemo);
        deleteAlert(id);
      };

      return (
        <Alert
          ref={ref}
          {...props}
          severity={severity}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => onCloseAlert(_id)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {children}
        </Alert>
      );
    }
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 20,
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 10000,
      }}
      component={TransitionGroup}
    >
      {alerts.map((alert) => (
        <Collapse key={alert.id}>
          <TempAlert _id={alert.id} severity={alert.severity}>
            {alert.text}
          </TempAlert>
        </Collapse>
      ))}
    </Box>
  );
};
