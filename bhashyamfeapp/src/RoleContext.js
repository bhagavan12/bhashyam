// import React, { createContext, useState, useContext, useEffect } from 'react';
// import zonalRoutes from './routes/zonalRoutes';
// import principalRoutes from './routes/principalRoutes';
// import customercareRoutes from './routes/customerCareRoutes';
// import adminRoutes from './routes/adminRoutes';

// const RoleContext = createContext();

// export const useRoleContext = () => {
//   return useContext(RoleContext);
// };

// export const RoleProvider = ({ children }) => {
//   const [role, setRole] = useState(localStorage.getItem('role') || ''); // Initialize role from localStorage
//   const [routes, setRoutes] = useState([]);

//   useEffect(() => {
//     if (role) {
//       // Set routes based on the user's role
//       switch (role) {
//         case 'zonalofficer':
//           setRoutes(zonalRoutes);
//           break;
//         case 'principal':
//           setRoutes(principalRoutes);
//           break;
//         case 'Customercare':
//           setRoutes(customercareRoutes);
//           break;
//         case 'Admin':
//           setRoutes(adminRoutes);
//           break;
//         default:
//           setRoutes([]); // Clear routes if the role is undefined
//           break;
//       }
//     }
//   }, [role]);

//   const logout = () => {
//     localStorage.clear();
//     setRole('');
//   };

  

//   return (
//     <RoleContext.Provider value={{ role, routes, logout }}>
//       {children}
//     </RoleContext.Provider>
//   );
// };
