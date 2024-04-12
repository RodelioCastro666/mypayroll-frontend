import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";

// const USER_VALIDATION = /^[A-z][A-z0-9-_]{3,23}$/;
// const PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const REGISTER_URL = '/auth/login';

export const Register = () => {

  const userRef = useRef();
  //   const errorRef = useState();

  const [user, setUser] = useState('');
  //   const [validName, setValidName] =useState(false);
  //   const[userFocus, setUseFocus] = useState(false);

  const [password, setPassword] = useState('');
  //   const[validPassword,setValidPassword] = useState(false);
  //   const[passwordFocus,setPasswordFocus] = useState(false);

  //   const[matchPassword, setMatchPassword] = useState('');
  //   const[validMatch,setValidMatch] =useState(false);
  //   const[matchFocus,setMatchFocus] = useState(false);

  //   const[errorMessage,setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    // const result = USER_VALIDATION.test(user);
    // console.log(result);
    console.log(user);
    // setValidName(result);
  }, [user])

  useEffect(() => {
    // const result = PASSWORD_VALIDATION.test(password);
    // console.log(result);
    console.log(password);
    // setValidPassword(result);
    // const match = password === matchPassword;
    // setValidMatch(match);
  }, [password])


  //   useEffect(() =>{
  //     // setErrorMessage('');
  //   },[user,password,matchPassword] )

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({
          username: user,
          password: password
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response.data);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      console.log(user, password);
      setSuccess(true);
    } catch (error) {
      console.log("HAPPY BIRTHDAY")
    }


  }
  return (
    <>
      {success ? (
        <section>
          <h1>SUCCESS</h1>
        </section>
      ) : (<div className="h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <label htmlFor="confirm_password">
                Confirm Password:
            </label>
            <input 
            type="confirm_password" 
            id="confirm_password"
            required
            onChange={(e) => setMatchPassword(e.target.value)}
            /> */}

          <button>Register</button>
        </form>
      </div>)}

    </>
  )
}