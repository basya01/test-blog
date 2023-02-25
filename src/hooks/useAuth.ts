import { useAppDispatch, useAppSelector } from './redux';
import { login as loginUser } from '../store/slices/auth';
import { useContext } from 'react';
import { AlertsContext } from '../App';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addAlert } = useContext(AlertsContext);

  return (login: string, password: string) => {
    const authUser = users.find((user) => user.password === password && user.login === login);
    if (!authUser) {
      addAlert({ severity: 'error', text: 'You entered incorrect login or password' });
      return null;
    }
    addAlert({ severity: 'success', text: 'You are logged in' });
    navigate('/profile');
    dispatch(loginUser(authUser.id));

    return authUser;
  };
};
