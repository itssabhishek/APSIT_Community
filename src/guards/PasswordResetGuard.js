import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// hooks
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
// routes
import LoadingScreen from '../components/LoadingScreen';
import ResetPassword from '../pages/auth/reset-password';


// ----------------------------------------------------------------------

PasswordResetGuard.propTypes = {
  children: PropTypes.node,
};

export default function PasswordResetGuard({ children }) {

  const { isVerified, isInitialized } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isVerified) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <ResetPassword />;
  }

  return <>{children}</>;
}
