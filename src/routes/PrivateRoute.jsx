import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loadUserData } from '../redux/thunks/authAPI';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const isAuthenticated = useSelector((state) => state.auth.uid);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!isAuthenticated) {
          dispatch(loadUserData(user.uid))
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.error('Failed to load user data:', error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, isAuthenticated, dispatch]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;
