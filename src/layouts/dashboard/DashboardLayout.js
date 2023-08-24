import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
// @mui
import { styled, StyledEngineProvider } from '@mui/material/styles';

// hooks
import useResponsive from '../../hooks/useResponsive';
//
import Header from './header';
import Nav from './nav';
import BottomNavbar from './bottom-nav';

// ----------------------------------------------------------------------


const NAV_WIDTH = 280;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme, open }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: open ? NAV_WIDTH + 16 : theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));


// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(isDesktop);

  const {isLogin, userInfo} = useSelector((state) => state);

  // useEffect(() => {
  //   console.log(isLogin);
  //   console.log(userInfo);
  // }, [isLogin, userInfo]);

  return (
    <StyledRoot>
      <Header isLogin={isLogin} userInfo={userInfo} isMobile={isMobile} openNav={open} onOpenNav={() => setOpen(true)} onCloseNav={() => setOpen(false)} />
      
      <Nav isLogin={isLogin} userInfo={userInfo} isMobile={isMobile} openNav={open} onCloseNav={() => setOpen(false)} onOpenNav={() => setOpen(true)}/>
      
      <Main isLogin={isLogin} userInfo={userInfo} isMobile={isMobile} open={open}>
        <Outlet />
      </Main>

      {/* { isMobile &&  */}
      <BottomNavbar /> 
      {/* } */}
    </StyledRoot>
  );
}
