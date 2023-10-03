import { NavLink } from "react-router-dom";

const Navbar = () => {
    
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" id="navbarUL">
              <li className="nav-item">
                <NavLink to="/home" className={({isActive}) => ( (window.location.href.charAt(window.location.href.length - 1) === '/') || isActive ) ? "nav-active" : "nav-link"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/createaccount" className={({isActive}) => isActive ? "nav-active" : "nav-link"}>
                  Create Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/deposit" className={({isActive}) => isActive ? "nav-active" : "nav-link"}>
                  Deposit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/withdraw" className={({isActive}) => isActive ? "nav-active" : "nav-link"}>
                  Withdraw
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/allData" className={({ isActive}) => isActive ? "nav-active" : "nav-link"}>
                  All Data
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
