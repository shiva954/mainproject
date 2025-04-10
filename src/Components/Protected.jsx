import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protected = ({ children, role }) => {
   const cookie = Cookies.get("session")
  const session = cookie ? JSON.parse(cookie) : null ;
  // const session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;











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

