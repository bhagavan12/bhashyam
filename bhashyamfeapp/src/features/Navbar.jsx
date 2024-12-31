// // import React from 'react'
// // import { Link, Outlet, useNavigate } from 'react-router-dom'

// // function Navbar() {
// //   var navigate = useNavigate();
// //     function logout(){
// //         window.localStorage.clear();
// //         navigate('/');
// //     }
// //   return (
// //     <div>
// //       <nav className="navbar navbar-expand-lg bg-light shadow" style={{background:'linear-gradient(69.9deg, rgb(76, 79, 106) 3.2%, rgb(118, 124, 163) 97.6%)'}}>
// //         <div className="container-fluid">
// //             <Link to='/' className="navbar-brand text-light"><img src="https://www.bhashyamschools.com/assets/images/logo/logo.png" alt="BHASHYAM SCHOOL" style={{width:'100px',height:'50px'}}/></Link>
// //             <Link className="navbar-brand text-light" to="/home">Home</Link>
// //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// //             <span className="navbar-toggler-icon"></span>
// //             </button>
// //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
// //                 <li className='nav-item'>
// //                     <Link to='/allcomplaints' className="nav-link text-light">Customer Care</Link>
// //                 </li>
// //                 <li className='nav-item'>
// //                     <Link to='/zonals' className="nav-link text-light">Zonal Officers</Link>
// //                 </li>
// //                 <li className='nav-item'>
// //                     <Link to='/principal' className="nav-link text-light">Principal</Link>
// //                 </li>
// //             </ul>
// //             {/* <form className="d-flex" role="search">
// //                 <button className="btn btn-outline-light">Logout</button>
// //             </form> */}
// //             <ul className="navbar-nav  mb-2 mb-lg-0">
// //                 <li className='nav-item'>
// //                     <Link to='/addbranch' className="nav-link text-light">Add Branch</Link>
// //                 </li>
// //                 <li className='nav-item'>
// //                     <Link to='/addzonal' className="nav-link text-light">Add ZEO</Link>
// //                 </li>
// //                 <li className='nav-item'>
// //                     <Link to='/complaint' className="nav-link text-light">Add Complaint</Link>
// //                 </li>
// //                 <li className='nav-item'>
// //                     <Link to='/' className="btn btn-outline-light" onClick={logout}>Logout</Link>
// //                 </li>
// //             </ul>
// //             </div>
// //         </div>
// //       </nav>

// //       <Outlet/>
// //     </div>
// //   )
// // }

// // export default Navbar
import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Navbar = ({ routes,role , setRole ,setRoutes}) => {
    const rolee=localStorage.getItem("role");
    console.log("rolee",rolee);
    var navigate = useNavigate();
    function logout() {
        window.localStorage.clear();
        setRole("");
        navigate('/');
        setRoutes([]);
    }
    
  
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Bhashyam</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {routes.map((route, index) => (
                            route.path !== "/login" ? (
                                <li key={index} className="nav-item">
                                    <NavLink
                                        to={route.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        {route.label}
                                    </NavLink>
                                </li>
                            ) : (
                                <li key={index} className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={logout}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        {route.label}
                                    </button>
                                </li>
                            )
                        ))}
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useRoleContext } from '../RoleContext';

// const Navbar = () => {
//   const { routes, role, logout } = useRoleContext(); // Get role and routes from context

//   const [filteredRoutes, setFilteredRoutes] = useState([]);

//   useEffect(() => {
//     // Filter routes based on the role or login status
//     const updatedRoutes = routes.filter((route) => {
//       if (route.path === "/login" && role) {
//         // Show "Logout" if logged in
//         return true;
//       }
//       if (route.path !== "/login") {
//         return true;
//       }
//       return false;
//     });
//     setFilteredRoutes(updatedRoutes);
//   }, [routes, role]); // Re-run when routes or role changes

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">Bhashyam</a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             {filteredRoutes.map((route, index) => (
//               route.path !== "/login" ? (
//                 <li key={index} className="nav-item">
//                   <NavLink
//                     to={route.path}
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     {route.label}
//                   </NavLink>
//                 </li>
//               ) : (
//                 <li key={index} className="nav-item">
//                   <button
//                     className="nav-link btn btn-link"
//                     onClick={logout}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     {route.label}
//                   </button>
//                 </li>
//               )
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
