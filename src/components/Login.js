import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// display's & submits login form
function Login() {

    const [fullname, setFullname] = useState('');
    const [lemail, setlEmail] = useState('');
    const [lpassword, setlPassword] = useState('');
    const [semail, setsEmail] = useState('');
    const [spassword, setsPassword] = useState('');
    const [lerr, setlErr] = useState('');
    const [serr, setsErr] = useState('');
    const [login, showLogin] = useState(true);
    let history = useHistory();

    // login submission
    function submitLogin(e) {
        e.preventDefault();

        if(lemail!=='' && lpassword!=='') {
            const val = {
                "email" : lemail,
                "password" : lpassword
            }
            axios
                .post("http://127.0.0.1:8000/login", val)
                .then(response => {
                    console.log(response.data);
                    if(response.data.auth === false) {
                        setlErr(response.data.msg);
                    }
                    else {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("isAdmin", response.data.isAdmin);
                        setlEmail('');
                        setlPassword('');
                        history.push('/')
                        window.location.reload();
                    }
                })       
                .catch(error => {
                    setlErr(error.data.msg);
                })
        }
        else {
            setlErr("Fill all fields!");
        }
    };

    // signup submission
    function submitSignup(e) {
        e.preventDefault();

        if(fullname!=='' && semail!=='' && spassword!=='') {
            const val = {
                "full_name" : fullname,
                "email" : semail,
                "password" : spassword
            }
            axios
                .post("http://127.0.0.1:8000/register", val) 
                .then(response => {
                    if(response.data === "success") {
                        setFullname('')
                        setsEmail('')
                        setsPassword('')
                        showLogin(true);
                    }
                    else {
                        setsErr(response.data)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            setsErr("Fill all fields!");
        }
    }

    // display's the login form
    function displayLogin() {
        showLogin(true);
    }

    // display's the signup form
    function displaySignup() {
        showLogin(false);
    }

    return (
        <div id="login-popup">
            <button id="d-login-btn" onClick={displayLogin}>Login</button>  &nbsp;
            <button id="d-signup-btn" onClick={displaySignup}>SignUp</button>
        
        {login ? 
            <div id="login-content">
                <form onSubmit={submitLogin}>
                    <input 
                        value={lemail} 
                        onChange={e => setlEmail(e.target.value)} 
                        type="email" placeholder="Email" id="l-email" />     <br/><br/>
                    
                    <input 
                        value={lpassword} 
                        onChange={e => setlPassword(e.target.value)} 
                        type="password" placeholder="Password" id="l-pswd" />       <br/><br/>
                    
                    <button type="submit" id="l-login">Login</button> <br/><br/>
                    <div id="l-forgot-pswd">Forgot Password</div>
                </form> <br/>
                {lerr ? <div id="lerr">{lerr}</div> : <div></div>}
            </div>
            :
            <div id="signup-content">
                <form onSubmit={submitSignup}>
                    <input 
                        value={fullname} 
                        onChange={e => setFullname(e.target.value)} 
                        type="text" placeholder="Full Name" id="r-fullname" />       <br/><br/>

                    <input 
                        value={semail} 
                        onChange={e => setsEmail(e.target.value)} 
                        type="email" placeholder="Email" id="r-email" />     <br/><br/>
                    
                    <input 
                        value={spassword} 
                        onChange={e => setsPassword(e.target.value)} 
                        type="password" placeholder="Password" id="r-pswd" />       <br/><br/>
                    
                    <button type="submit" id="r-signup">Create</button> <br/><br/>
                </form>
                {serr ? <div id="serr">{serr}</div> : <div></div>}
            </div> 
        }      
        </div>
    );
}
export {Login};