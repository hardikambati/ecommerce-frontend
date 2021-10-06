import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Login } from './Login';
import { RoutePath } from './RoutePath';
// ICONS
import NotificationsIcon from '@material-ui/icons/Notifications';

// Navbar + Drawer functions 
function Navbar() {

    return (
        <div>
        <Router>
            <div id="nav-outer">
                <div id="nav-logo">
                    BUY&SELL
                </div>
                
                <div id="nav-ele">
                    <div id="nav-ele1">
                        <NavLink exact to="/" id="nav-a">Home</NavLink>
                        <NavLink exact to="/products" id="nav-a">Products</NavLink>
                        
                        {localStorage.getItem("token") ? 
                            <NavLink exact to="/product/add" id="nav-a">Add Products</NavLink>
                            :
                            <div></div>
                        }

                        {/* {localStorage.getItem("token") ? 
                            <Popup trigger={<button id="nav-bell"><NotificationsIcon /></button>} position="bottom">
                                <div></div>
                            </Popup> 
                            :
                            <div></div>
                        } */}

                        {/* reloads after clicking 'logout' */}
                        {localStorage.getItem("token") ? 
                            <button id="nav-login" onClick={() => {localStorage.removeItem("token"); window.location.replace('/')}}>Logout</button>
                            :
                            <Popup trigger={<button id="nav-login">Login | SignUp</button>} position="bottom">
                                <Login />
                            </Popup>
                        }
                    </div>
                </div>
            </div>
            
            <RoutePath />
        </Router>
        </div>
    );
}
export {Navbar};