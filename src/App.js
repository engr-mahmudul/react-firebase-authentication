import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import './App.css';
import image1 from '../src/images/authentication.png'
import initializationFirebase from './Firebase/firebase.initialize';
import { useState } from 'react'
initializationFirebase()
const auth = getAuth();

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogIn, setIsLogIn] = useState(false)
  const SubmitHandler = (e) => {
    e.preventDefault()

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Email Formation is not Correct')
      return
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/.test(password)) {
      setError('Password must have 8 characters including Uppercase, Lowercase,Number and Special Character[@$!%*?&,.]')
      return
    }
    else {
      setError('')
    }
    isLogIn ? logInUser(email, password) : createNewUser(email, password)

  }
  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        const user = result.user;
        console.log("Registered", user)
        setError('')
        varificationMail()
      }).catch((error) => {
        setError(error.message);
      })
  }
  const logInUser = (emai, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in 
        const user = result.user;
        console.log("Logged in", user)
        setError('')
        // ...
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }
  const checkBoxHandler = (event) => {
    setIsLogIn(event.target.checked)
  }
  const varificationMail = () => {
    
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result);
      });
  }
  const passwordResetMail= () =>{
    if(!email){
      setError('Put an email Adress First')
      return
    }
    else{
      setError('')
    }

    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  }


  return (
    <div className="parent-div">
      <div className='left-div'>
        <img src={image1} alt="" style={{ width: '80%' }} />
      </div>
      <div className="right-div">

        <h1 style={{ marginTop: '90px', fontWeight: '800', color: "#018B97" }}> User Authentication</h1>
        <div className='form-div'>
          <div>
            {/* Here Toggle is working For Log in or Register  */}
            <h4 style={{ color: "#018B97", fontWeight: "700" }}>Please {isLogIn ? "Log In" : "Register"}</h4>
            {/* Toggle completed  */}
            <form onSubmit={SubmitHandler}>
              <input onBlur={emailHandler} type="text" placeholder="Email"  />
              <input onBlur={passwordHandler} type="password" placeholder="Password"  />
              <div className='error-div'>
                {
                  error.length > 0 && <div className='error-message'>
                    <p >{error}</p>
                  </div>
                }

              </div>
              <input style={{ marginTop: '10px', backgroundColor: '#018B97', color: 'white' }} type="submit" value={isLogIn ? 'Log In' : 'Register'} />
              <div className='mt-4 text-info fw-bold'>
              <div className="form-check">
                <input onChange={checkBoxHandler} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Click Here For Log In
                </label>
                
              </div>
            </div>
             
            </form>
            
            <button className='btn' onClick={passwordResetMail}>Forgot password?</button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
