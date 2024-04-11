import googleLogo from '../../Assets/flat-color-icons_google.png'
import fbLogo from '../../Assets/devicon_facebook.png'
import  './style.css';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../auth/useAuth'
import axios from '../../api/axios'
import { useNavigate, Link, useLocation } from 'react-router-dom';




    // const LOGIN_URL = '/auth/signin';
    const LOGIN_URL = '/auth/login';

export const Login = () => {

  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const userRef = useRef();
  // const errorRef = useRef();

  const [user,setUser] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // },[])

  // useEffect(() =>{
  //   setErrorMessage('');
  // }, [user,password])

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({
                username: user,
                password: password
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            }

        )
        
        console.log(response);
        console.log(user, password);
        // setSuccess(true);
        navigate(from, {replace:true})
        setUser('');
        setPassword('');

    }catch(error){
      console.log("HAPPY BIRTHDAY")
    }
    
  }

  return (
    <>  <div className="h-screen g-screen bg-[#F5F7F8] flex justify-center items-center text-center " >
               

                    <form className='containerSignUp' onSubmit={handleSubmit}>
                        <h1 className=' text-[2rem] tracking-wider '>Sign in to Payroll</h1>

                        <label htmlFor="username">Username:</label>
                        <input
                            id='username' 
                            className="inputSignUP" 
                            type="text" 
                            placeholder="Username"
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            id='password' 
                            className="inputSignUP" 
                            type="password" 
                            placeholder="Password"
                            
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                        <button className="btnLogin">Login</button>
                    </form>
                    
                    {/* <div className="mt-3" >Create Account</div>
                    <div className="grid grid-cols-[1fr_30px_1fr] justify-center items-center">
                    <hr className="border-[1px] border-black" />
                    <span>or</span>
                    <hr className="border-[1px] border-black" /> 
                    </div>
                    <button className="btnLink" >
                    <img className='inline-block mr-2 ' src={googleLogo} alt="" />
                    Continue with Google
                    </button>
                    <button className="btnLink" >
                    <img className='inline-block mr-2 ' src={fbLogo} alt="" />Continue with Facebook
                    </button>  */}
                
            </div>
    
        

    </>
  )
}
