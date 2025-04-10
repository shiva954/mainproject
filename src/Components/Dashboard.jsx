// import React, { useEffect, useRef, useState } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import { Layout, Menu, Button, theme, Typography, Spin, Modal, message, Avatar, Dropdown } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
// import { HomeOutlined, VideoCameraOutlined } from "@ant-design/icons";
// import HomeContent from "./HomeContent";
// import MeetingContent from "./MeetingContent";
// import PersonContent from "./PersonContent";

// const { Header, Sider, Content } = Layout;

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [user, setUser] = useState(null); 
//   const navigate = useNavigate();

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

  
//   useEffect(() => {
   
//     const loggedInUser = localStorage.getItem('user');
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []);

 
//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     message.info("Logged out successfully");
    
   
//     navigate('/login');
//   };

//   const profileMenu = {
//     items: [
//       {
//         key: '1',
//         icon: <UserOutlined />,
//         label: <Link to="/dashboard/profile">My Profile</Link>,
//       },
//       {
//         key: '2',
//         icon: <SettingOutlined />,
//         label: 'Settings',
//       },
//       {
//         type: 'divider',
//       },
//       {
//         key: '3',
//         icon: <LogoutOutlined />,
//         label: 'Logout',
//         onClick: handleLogout,
//       },
//     ],
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
   
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         style={{
//           background: "#001529",
//         }}
//       >
//         <div
//           style={{
//             height: 74,
//             margin: 16,
//             borderRadius: 6,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "white",
//             fontWeight: "bold",
//           }}
//         >
//           CONNECT MEET
//         </div>
      
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             {
//               key: "1",
//               icon: <HomeOutlined />,
//               label: <Link to="/dashboard">Home</Link>,
//             },
//             {
//               key: "2",
//               icon: <VideoCameraOutlined />,
//               label: <Link to="/dashboard/meetings">Meetings</Link>,
//             },
//             {
//               key: "3",
//               icon: <UserOutlined />,
//               label: <Link to="/dashboard/profile">Profile</Link>,
//             },
//           ]}
//         />
//       </Sider>

//       <Layout>
      
//         <Header
//           style={{
//             padding: "0 16px",
//             background: "#001529",
//             display: "flex",
//             alignItems: "center",
//             height: "13%",
//             width: "86vw",
//             justifyContent: "space-between",
//             boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "18px",
//               width: 48,
//               height: 48,
//               transition: "0.3s",
//               color: "white",
//             }}
//           />
          
     
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             {user ? (
         
//               <Dropdown menu={profileMenu} placement="bottomRight">
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                   <span style={{ color: 'white', marginRight: '10px' }}>
//                     {user.name || user.email || 'User'}
//                   </span>
//                   <Avatar 
//                     size="large" 
//                     icon={<UserOutlined />} 
//                     src={user.avatar || user.photoURL}
//                     style={{ backgroundColor: (user.avatar || user.photoURL) ? 'transparent' : '#1890ff' }}
//                   />
//                 </div>
//               </Dropdown>
//             ) : (
              
//               <Button 
//                 type="primary" 
//                 onClick={() => navigate('/login')}
//               >
//                 Login / Sign Up
//               </Button>
//             )}
//           </div>
//         </Header>

    
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: '#efdfdf',
//             borderRadius: '4px',
//             width: "85vw",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Routes>
         
//             <Route path="/" element={<HomeContent />} />
//             <Route path="/meetings" element={<MeetingContent />} />
//             <Route path="/profile" element={<PersonContent user={user} />} />
//           </Routes>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;














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

