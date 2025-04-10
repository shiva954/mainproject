
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Grid, 
  Paper, 
  TextField, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import '../Styles/ProfilePage.css';
function PersonContent() {
  const [user, setUser] = useState({
    name: JSON.parse(localStorage.getItem('user'))?.name || 'Guest User',
    email: JSON.parse(localStorage.getItem('user'))?.email || 'guest@example.com',
    github: JSON.parse(localStorage.getItem('user'))?.github || 'https://github.com/guest',
    phone: JSON.parse(localStorage.getItem('user'))?.phone || 'Not Provided',
  });

  const [editMode, setEditMode] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = (field) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
  };

  const profileFields = [
    { label: 'Name', key: 'name', value: user.name },
    { label: 'Email', key: 'email', value: user.email },
    { label: 'GitHub', key: 'github', value: user.github },
    { label: 'Phone', key: 'phone', value: user.phone },
  ];

  return (
    <Box className="container">
      <Typography variant="h4" className="profile-title">
        <AccountCircleIcon className="profile-icon" />
        User Profile
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} className="avatar-section">
          <Paper elevation={3} className="profile-card">
            <Avatar className="avatar" src="https://via.placeholder.com/150" />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="profile-details">
            <Typography variant="h6" gutterBottom>
              Profile Details
            </Typography>
            <TableContainer className="table-container">
              <Table>
                <TableBody>
                  {profileFields.map((field) => (
                    <TableRow key={field.key}>
                      <TableCell className="table-label">
                        {field.label}
                      </TableCell>
                      <TableCell>
                        {editMode[field.key] ? (
                          <TextField
                            fullWidth
                            name={field.key}
                            value={user[field.key]}
                            onChange={handleInputChange}
                            variant="outlined"
                            size="small"
                          />
                        ) : (
                          field.key === "github" ? (
                            <a href={user.github} target="_blank" rel="noopener noreferrer">
                              {user.github}
                            </a>
                          ) : (
                            field.value
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          color={editMode[field.key] ? "success" : "primary"}
                          onClick={() => 
                            editMode[field.key] ? handleSave() : handleEditToggle(field.key)
                          }
                          startIcon={editMode[field.key] ? <SaveIcon /> : <EditIcon />}
                          className="edit-button"
                        >
                          {editMode[field.key] ? 'Save' : 'Edit'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonContent;






























































































// import * as React from 'react';

// import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';

// // // Import the new content components


// function PersonContent() {
//   const user = JSON.parse(localStorage.getItem("user")) || {
//     name: "Guest User",
//     email: "guest@example.com",
//     image: "https://via.placeholder.com/150",
//   };

//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="h4" gutterBottom>Your Profile</Typography>
//       <Box sx={{ my: 2 }}>
//         <img 
//           src={user.image} 
//           alt={user.name} 
//           style={{ width: 100, height: 100, borderRadius: '50%' }} 
//         />
//       </Box>
//       <Typography variant="h6">{user.name}</Typography>
//       <Typography variant="body1">{user.email}</Typography>
//     </Box>
//   );
// }
// export default PersonContent;







// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Avatar, 
//   Grid, 
//   Paper, 
//   TextField, 
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow
// } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';

// function PersonContent() {
//   const [user, setUser] = useState({
//     name: JSON.parse(localStorage.getItem('user'))?.name || 'Guest User',
//     email: JSON.parse(localStorage.getItem('user'))?.email || 'guest@example.com',
//   });

//   const [editMode, setEditMode] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditToggle = (field) => {
//     setEditMode(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   const handleSave = () => {
//     // In a real app, you'd typically call an API to update user profile
//     localStorage.setItem('user', JSON.stringify(user));
//     alert('Profile updated successfully!');
//   };

//   const profileFields = [
//     { 
//       label: 'Name', 
//       key: 'name', 
//       value: user.name 
//     },
//     { 
//       label: 'Email', 
//       key: 'email', 
//       value: user.email 
//     }
//   ];

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         <AccountCircleIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
//         User Profile
//       </Typography>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//             <Avatar 
//               sx={{ 
//                 width: 100, 
//                 height: 100, 
//                 margin: '0 auto 16px',
//                 bgcolor: 'primary.main' 
//               }}
//               src="https://via.placeholder.com/150"
//             />
//             <Typography variant="h6">{user.name}</Typography>
//             <Typography variant="body2">{user.email}</Typography>
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Profile Details
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableBody>
//                   {profileFields.map((field) => (
//                     <TableRow key={field.key}>
//                       <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>
//                         {field.label}
//                       </TableCell>
//                       <TableCell>
//                         {editMode[field.key] ? (
//                           <TextField
//                             fullWidth
//                             name={field.key}
//                             value={user[field.key]}
//                             onChange={handleInputChange}
//                             variant="outlined"
//                             size="small"
//                           />
//                         ) : (
//                           field.value
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           color={editMode[field.key] ? "success" : "primary"}
//                           onClick={() => 
//                             editMode[field.key] 
//                               ? handleSave() 
//                               : handleEditToggle(field.key)
//                           }
//                           startIcon={editMode[field.key] ? <SaveIcon /> : <EditIcon />}
//                         >
//                           {editMode[field.key] ? 'Save' : 'Edit'}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default PersonContent;


// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Avatar, 
//   Grid, 
//   Paper, 
//   TextField, 
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow
// } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
//  // Import external CSS file
// import '../Styles/ProfilePage.css';
// function PersonContent() {
//   const [user, setUser] = useState({
//     name: JSON.parse(localStorage.getItem('user'))?.name || 'Guest User',
//     email: JSON.parse(localStorage.getItem('user'))?.email || 'guest@example.com',
//     github: JSON.parse(localStorage.getItem('user'))?.github || 'https://github.com/guest',
//     phone: JSON.parse(localStorage.getItem('user'))?.phone || 'Not Provided',
//   });

//   const [editMode, setEditMode] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditToggle = (field) => {
//     setEditMode(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   const handleSave = () => {
//     localStorage.setItem('user', JSON.stringify(user));
//     alert('Profile updated successfully!');
//   };

//   const profileFields = [
//     { label: 'Name', key: 'name', value: user.name },
//     { label: 'Email', key: 'email', value: user.email },
//     { label: 'GitHub', key: 'github', value: user.github },
//     { label: 'Phone', key: 'phone', value: user.phone },
//   ];

//   return (
//     <Box className="container">
//       <Typography variant="h4" className="profile-title">
//         <AccountCircleIcon className="profile-icon" />
//         User Profile
//       </Typography>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4} className="avatar-section">
//           <Paper elevation={3} className="profile-card">
//             <Avatar className="avatar" src="https://via.placeholder.com/150" />
//             <Typography variant="h6">{user.name}</Typography>
//             <Typography variant="body2">{user.email}</Typography>
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} className="profile-details">
//             <Typography variant="h6" gutterBottom>
//               Profile Details
//             </Typography>
//             <TableContainer className="table-container">
//               <Table>
//                 <TableBody>
//                   {profileFields.map((field) => (
//                     <TableRow key={field.key}>
//                       <TableCell className="table-label">
//                         {field.label}
//                       </TableCell>
//                       <TableCell>
//                         {editMode[field.key] ? (
//                           <TextField
//                             fullWidth
//                             name={field.key}
//                             value={user[field.key]}
//                             onChange={handleInputChange}
//                             variant="outlined"
//                             size="small"
//                           />
//                         ) : (
//                           field.key === "github" ? (
//                             <a href={user.github} target="_blank" rel="noopener noreferrer">
//                               {user.github}
//                             </a>
//                           ) : (
//                             field.value
//                           )
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           color={editMode[field.key] ? "success" : "primary"}
//                           onClick={() => 
//                             editMode[field.key] ? handleSave() : handleEditToggle(field.key)
//                           }
//                           startIcon={editMode[field.key] ? <SaveIcon /> : <EditIcon />}
//                           className="edit-button"
//                         >
//                           {editMode[field.key] ? 'Save' : 'Edit'}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default PersonContent;
























































































