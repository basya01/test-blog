import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { addAlert } from '../store/slices/alerts';
import { login as loginUser } from '../store/slices/auth';
import { useAppDispatch, useAppSelector } from './';

export const useAuth = () => {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('alerts');

  return (login: string, password: string) => {
    const authUser = users.find((user) => user.password === password && user.login === login);
    if (!authUser) {
      dispatch(addAlert({ severity: 'error', text: t('loginError') }));
      return null;
    }
    dispatch(addAlert({ severity: 'success', text: t('loginSuccess') }));
    navigate('/profile');
    dispatch(loginUser(authUser.id));

    return authUser;
  };
};
