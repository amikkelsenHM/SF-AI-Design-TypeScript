import { CookiesEnum } from 'models/enums/CookiesEnum';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';

const ProtectedRoute: React.FC<any> = ({ children, allowedRoutes }) => {
  const router = useRouter();
  const cookies = new Cookies();

  const isAuthenticated = !!cookies.get(CookiesEnum.TOKEN);
  useEffect(() => {
    if (!isAuthenticated && !allowedRoutes.includes(router.pathname)) {
      router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [isAuthenticated, router, allowedRoutes]);
  return children;
};
export default ProtectedRoute;
