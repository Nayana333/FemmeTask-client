import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protect({ children }: any) {
  const navigate = useNavigate();
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      alert('not auth user')
      navigate('/notAuthorized');
    }
  }, [user, navigate]);

  if (user) {
    return children;
  }

  return null; 
}

export default Protect;
