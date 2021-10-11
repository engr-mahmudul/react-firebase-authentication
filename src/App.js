import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  const SubmitHandler = (e) => {
    e.preventDefault()
   
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        const user = result.user;
        console.log(user)
      })

  }
  const emailHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
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
            <form onSubmit={SubmitHandler}>
              <input onBlur={emailHandler} type="text" placeholder="Email" required />
              <input onBlur={passwordHandler} type="password" placeholder="Password" required />
              <div className='error-div'>
                {
                  error.length > 0 && <div className='error-message'>
                    <p >{error}</p>
                  </div>
                }

              </div>
              <input style={{ marginTop: '10px', backgroundColor: '#018B97', color: 'white' }} type="submit" value='Register' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
