import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';


import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getTokenToSessionStorage, getUserInfoToSessionStorage } from './reducer/loginComm';


// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

import { ProductCartWidget } from './sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function App() {
  const isLoginDispatch = useDispatch();

  useEffect(() => {
    const token = getTokenToSessionStorage();
    if (token) {
      const userInfo = getUserInfoToSessionStorage();
      isLoginDispatch({type: 'isLogin', token, data: userInfo});
    }else{
      isLoginDispatch({type: 'isNonLogin'});
    }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          
          <ProductCartWidget />
          <ScrollToTop />
          <StyledChart />
          <Router />

        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
