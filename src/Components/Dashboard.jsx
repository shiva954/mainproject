import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
// import SearchIcon from '@mui/icons-material/Search';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import { useNavigate } from "react-router-dom";

import HomeContent from './HomeContent';
import PersonContent from './PersonContent';
import MeetingContent from './MeetingContent';
import logo from "../assets/dashboardlogo.png";
import '../Styles/Dashboard.css';

const NAVIGATION = [
  { segment: 'dashboard', title: 'Home', icon: <HomeIcon /> },
  { segment: 'profile', title: 'Profile', icon: <AccountCircleIcon /> },
  { segment: 'meeting', title: 'Meeting', icon: <VideoCallIcon /> },
];

const demoTheme = createTheme({
  // cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  // colorSchemes: { light: true, dark: true },
  // breakpoints: {
  //   values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 },
  // },
});


function DashboardContent({ pathname }) {
  switch (pathname) {
    case '/dashboard':
      return <HomeContent />;
    case '/profile':
      return <PersonContent />;
    case '/meeting':
      return <MeetingContent />;
    default:
      return <HomeContent />;
  }
}

DashboardContent.propTypes = { pathname: PropTypes.string.isRequired };

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{ display: { xs: 'inline', md: 'none' } }}
          >
            {/* <SearchIcon /> */}
          </IconButton>
        </div>
      </Tooltip>
      <ThemeSwitcher />
    </Stack>
  );
}

function SidebarFooter({ mini }) {
  return (
    <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap' }}>
{mini ? '© Connect' : `© ${new Date().getFullYear()} Connect Meet`}
    </Typography>
  );
}

SidebarFooter.propTypes = { mini: PropTypes.bool.isRequired };

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center"  spacing={2}>
      <img src={logo} alt ="logo" width="50" height="50" />
      <Typography variant="h6"> 
      <div className="logo-container">
          <h1 className="logo">Connect<span className="highlight">Meet</span></h1>
         
        </div>
      </Typography>
      <Tooltip title="Connected to production">
        <span></span>
      </Tooltip>
    </Stack>
  );
}


function Dashboard(props) {
  const { window } = props;
  const navigate = useNavigate();


  const [session, setSession] = React.useState({
    user: JSON.parse(localStorage.getItem('user')) || {
      name: 'Guest User',
      email: 'guest@example.com',
      image: 'https://picsum.photos/150', 
    },
  });

  
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setSession({ user: storedUser });
  }, []);

 
  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setSession({ user: storedUser });
      },
      signOut: () => {
        localStorage.removeItem('user');
         
        setSession({
          user: {
            name: 'Guest User',
            email: 'guest@example.com',
            image: 'https://picsum.photos/150',
          },
        });
           navigate('/Signin');
      },
    }),
    []
  );

  
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      {/* <DashboardLayout
  sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: 'rgb(33, 24, 53)', // Sidebar background color
      color: 'white',
    },
    '& .MuiAppBar-root': {
      backgroundColor: '#2A2A3D', // Header background color
    },
  }}
  slots={{
    appTitle: CustomAppTitle,
    sidebarFooter: SidebarFooter,
  }}
> */}
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          // toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >

        <DashboardContent pathname={router.pathname} />

      </DashboardLayout>
    </AppProvider>
  );
}

Dashboard.propTypes = { window: PropTypes.func };

export default Dashboard;

