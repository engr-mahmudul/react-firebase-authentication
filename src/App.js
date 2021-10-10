import logo from './logo.svg';
import './App.css';
import image1 from '../src/images/authentication.png'
import initializationFirebase from './Firebase/firebase.initialize';
initializationFirebase()

function App() {
  const formSubmitHandler =(e)=>{
    e.preventDefault()
    console.log('Form submit clicked')
  }
  const emailHandler = (event) =>{
    console.log(event.target.value)
  }
  const passwordHandler = (event) =>{
    console.log(event.target.value)
  }
  return (
    <div className="parent-div">
      <div className='left-div'>
        <img src={image1} alt="" style={{width:'80%'}} />
      </div>
      <div className="right-div">

        <h1 style={{ marginTop: '90px', fontWeight: '800' ,color:"#018B97"}}> User Authentication</h1>
        <div className='form-div'>
          <div>
            <form onSubmit={formSubmitHandler}>
              <input onBlur={emailHandler} type="text" placeholder="Email" />
              <input onBlur={passwordHandler}  type="password" placeholder="Password" />
              <input style={{marginTop:'10px',backgroundColor:'#018B97',color:'white'}} type="submit" value='Register'/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
