// import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context' 

export default function TopBar() {
  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext)
  const handleLogout =  () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  }

  return (
    <div id="topBar" className='flex flex-row w-full'>
      {/* { user !== null && <p>Bienvenido {user.username}</p>}
      
      {isLoggedIn === true ? (
        <>
        <NavLink to="/" style={toggleStyles}> Home </NavLink>
        <button onClick={handleLogout}>LOGOUT</button>
        
        </>
      ) : (
        <>
         <NavLink to="/signup" style={toggleStyles}> Registro </NavLink>
         <NavLink to="/login" style={toggleStyles}> Acceder </NavLink>
         </>
     )}
      <TextField
          required
          id="outlined-required"
          label="Search"
          defaultValue="Hello World"
          color="warning"
        />      */}
        
        <input id="search" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
    </div>
  );
}

