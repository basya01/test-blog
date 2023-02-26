import { useNavigate } from 'react-router-dom';
import { addAlert } from '../store/slices/alerts';
import { login as loginUser } from '../store/slices/auth';
import { useAppDispatch, useAppSelector } from './redux';

export const useAuth = () => {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (login: string, password: string) => {
    const authUser = users.find((user) => user.password === password && user.login === login);
    if (!authUser) {
      dispatch(addAlert({ severity: 'error', text: 'You entered incorrect login or password' }));
      return null;
    }
    dispatch(addAlert({ severity: 'success', text: 'You are logged in' }));
    navigate('/profile');
    dispatch(loginUser(authUser.id));

    return authUser;
  };
};
