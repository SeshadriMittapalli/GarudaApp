import './Login.css';
import axios from 'axios';
import {useState} from 'react';
import Home from '../Home-page/Home';

function Login() {
    const [isAdminUser, setAdminUser] = useState(false);
    const [isMemberUser, setMemberUser] = useState(true);
    const [userInfo, setUserInfo] = useState({username:'', password:'', userType: '',id: 0});
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userType, setUserType] = useState('member');
    const [isError, setError] = useState();
    const [isUserNameError, setUserNameError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [isLoginSucess, setLoginSuccess] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [currentUserType, setCurrentUserType] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);

    const onAdminClick = event => {
        setIsValidPassword(true);
        setUserNameError(false);
        setError(false);
        setPasswordError(false);
        setAdminUser(true);
        setMemberUser(false);
    }

    const onMemberClick = event => {
        setIsValidPassword(true);
        setUserNameError(false);
        setPasswordError(false);
        setError(false);
        setMemberUser(true);
        setAdminUser(false);
    }

    function handleSubmit(event) {
        let passwordRegex = /^(?=[a-zA-Z0-9#@$?])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/;
        let passwordcheck = isValidPassword;
        if (passwordRegex.test(userPassword))
        {
            passwordcheck = true;
            setIsValidPassword(passwordcheck);
        }
        else
        {
            passwordcheck = false;
            setIsValidPassword(passwordcheck);
        }
        if(!isUserNameError && passwordcheck)
        {
            event.preventDefault();
            const ids = userInfo.users.map(x=>x.id);
            axios.post('https://garudadb.azurewebsites.net/api/HttpTrigger1?code=dAdM8kG_KodllF3J0nByzmZf08oQheM06n9cU1uVJwegAzFuCM3hUA==', {
                username: userName,
                password: userPassword,
                userType: userType,
                id: ids.reduce((a, b) => Math.max(a, b), -Infinity) + 1
            })
            .then(res => {
                alert("User Added Successfully");
            });
        }
    }

    const getUserData = () => {
        return axios.get('https://garudadb.azurewebsites.net/api/HttpTrigger1?code=dAdM8kG_KodllF3J0nByzmZf08oQheM06n9cU1uVJwegAzFuCM3hUA==')
        .then((res) => {
            setUserInfo(res.data);
            return res.data;
        });
    }

    function setUsrName(e) {
        let emailRegex = /[a-z0-9]+@lorvin.com/;
        if (!emailRegex.test(e.target.value) || e.target.value === '') {
            setUserNameError(true);
        } else {
            setUserNameError(false);
            setUserName(e.target.value);
        }
        setError(false);
    }

    function setPasswd(e) {
        setError(false);
        if(e.target.value === '')
            setPasswordError(true)
        else
        {
            setPassword(e.target.value);
            setIsValidPassword(true);
            setPasswordError(false);
        }
    }

    async function userCheck() {
        if (userName!=='' && userPassword !== '')
        {
            const userData = await getUserData();
            if(userData.users.some(x=>x.username === userName && x.password === userPassword))
            {
                let currentUserType = userData.users.find(x=>x.username === userName && x.password === userPassword).userType;
                setCurrentUserType(currentUserType);
                setError(false);
                setLoginSuccess(true);
            }
            else
            setError(true);
        }
        else
        {
            setPasswordError(false);
            setError(true)
        }
    }

    function setUserTypeValue(e) {
        let isAdmin = !isChecked
        setChecked(isAdmin);
        if(isAdmin)
        setUserType('admin');
        else
        setUserType('member');
    }


  return (
    !isLoginSucess ?
    (<div className="app">
        <div className="form">
        {isMemberUser? (<h1>Login</h1>): (<h1>Create a User</h1>)}
                <div className="input-box">
                    <input type="text" id="username" placeholder="Username" onBlur={(e)=>setUsrName(e)} />
                    <i className='bx bxs-user'></i>
                </div>
                {isUserNameError && (<div className="error">Invalid EmailId</div>)}
                <div className="input-box">
                    <input type="password" id="password" placeholder="Password" onBlur={(e)=>setPasswd(e)}/>
                    <i className='bx bxs-lock'></i>
                </div>
                {!isValidPassword && (<div className="invalidPassword">Password should contain uppercase, lowercase, numbers, and match of these characters #@$?</div>)}
                {isMemberUser && isPasswordError && (<div className="error">Invalid Password</div>)}
                {!isAdminUser && isError && (<div className="error">Invalid Username and Password</div>)}
                {!isMemberUser && 
                    (<div className="checkbox">
                        <label className="switch">
                        <input type="checkbox" value={userType} onChange={(e)=>setUserTypeValue(e)} />
                            <div className="slider"></div>
                        </label>
                        <span>Admin</span>
                    </div>
                    )
                }
            {isMemberUser?(<input type="button" id="adduser" value ="Login" className="btn" onClick={userCheck}/>):
                (<input type="button" id="adduser" value ="Add User" className="btn" onClick={handleSubmit}/>)
            }
        </div>
        <div>
        {isMemberUser ? (<input type="button" id="adminlogin" value ="Create User" className="userbtn" onClick={onAdminClick}/>):
                (<input type="button" id="memberlogin" value ="Member Login" className="userbtn" onClick={onMemberClick}/>)
            }
        </div>
    </div>):<Home currentUserType = {currentUserType}/>
  );
}

export default Login;