import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div>
      <Outlet />
      {/* <h3>Bhashyam School</h3> */}
      {/* <HomeLogin></HomeLogin> */}
    </div>
  );
}

export default App;
