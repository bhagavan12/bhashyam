// // import logo from "./logo.svg";
// // import "./App.css";


// // function App() {
//   //   return (
//     //     <div>
//     //       <Outlet />
//     //       {/* <h3>Bhashyam School</h3> */}
//     //       {/* <HomeLogin></HomeLogin> */}
// //     </div>
// //   );
// // }

// // export default App;
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./features/Navbar";
import zonalRoutes from "./routes/zonalRoutes";
import principalRoutes from "./routes/principalRoutes";
import customercareRoutes from "./routes/customerCareRoutes";
import adminRoutes from "./routes/adminRoutes";

const App = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState(window.localStorage.getItem("role")||"");
  useEffect(() => {
    const role = window.localStorage.getItem("role");
    // setRole(role);
    if (role) {
      // Set the routes based on role
      switch (role) {
        case "zonalofficer":
          setRoutes(zonalRoutes);
          break;
        case "principal":
          setRoutes(principalRoutes);
          break;
        case "Customercare":
          setRoutes(customercareRoutes);
          break;
        case "Admin":
          setRoutes(adminRoutes);
          break;
        default:
          navigate("/login"); // Redirect to login if no role is found
          break;
      }
    } else {
      navigate("/login"); // Redirect to login if role is not found
    }
  }, [role, navigate]);
  return (
    <div>
      <Navbar routes={routes} role={role} setRole={setRole} setRoutes={setRoutes}/>
      <Outlet />
    </div>
  );
};
export default App;
// export default App;
// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Navbar from './features/Navbar';
// import { RoleProvider, useRoleContext } from './RoleContext';

// const App = () => {
//   const { routes, role, logout } = useRoleContext(); // Get role and routes from context
//   const navigate = useNavigate();

//   // Redirect to login if no role is found
//   if (!role) {
//     navigate('/login');
//   }

//   return (
//     <div>
//       <Navbar routes={routes} role={role} logout={logout} />
//       <Outlet />
//     </div>
//   );
// };

// // Wrap the entire app with RoleProvider
// const AppWrapper = () => (
//   <RoleProvider>
//     <App />
//   </RoleProvider>
// );

// export default AppWrapper;
