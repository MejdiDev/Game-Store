import { useNavigate } from 'react-router-dom';
import '../styles/css/loginBody.css';
import { useRef, useState } from 'react';
import { signup, login, forgotPassword } from '../data/api';
import { setToken } from '../utils/cookie';
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';


const LoginBody = ({ type, navigate, loginwithgoogle, data, loginwithFacebook, loginwithSteam}) => {
    const recaptcha = useRef()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [lastname, setLastName] = useState('');
    const [code, setCode] = useState('');
    const [showCode, setShowCode] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await signup(username, lastname, email, password);
        console.log(response);
        alert(response.message)
      }; 

      const handleSignin = async (e) => {
        console.log('ok');
        e.preventDefault();
        const captchaValue = recaptcha.current.getValue()
        if (!captchaValue) {
            alert('Please verify the reCAPTCHA!')
          }else{
            const res = await fetch('http://localhost:4000/user/verifyCaptcha', {
              method: 'POST',
              body: JSON.stringify({ captchaValue }),
              headers: {
                'content-type': 'application/json',
              },
            })
            const data = await res.json();
            console.log(data);
            if (data.success) {
              // make form submission
                const response = await login(email, password);
                console.log(response);
                if(response.succes){
                    setToken(response.tk);
                    navigate('/home')
                }else{
                    alert(response.message)

                }
            } else {
              alert('reCAPTCHA validation failed!')
            }
          }
        
       /* const response = await login(email, password);
        if(response.succes){
            setToken(response.tk);
            navigate("/home");
            return
        }
        alert(response.message);
        */
      }; 

      const handleForgotPassword = async (e) => {
        e.preventDefault();
        const response = await forgotPassword(email);
        console.log(response);
        alert(response.message)
        if(response.succes){
          setShowCode(true);
        }
      };

    return (
        <section id="login_body" style={{backgroundImage: "url('./wave_2.svg')"}}>
            <div id="form_wrapper">
                <div id="hot_games_slider_wrapper" style={{backgroundImage: "url('./sonic.jpg')"}}></div>

                {type === 'login' ? (
        <form id="login" onSubmit={handleSignin}>
          <h1>Sign In</h1>
          <p>Access your account now!</p>
          
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <p onClick={() => navigate('/auth/forgot')}>Forgot Password</p>
          <button type="submit">Sign In</button>

          <div id="captcha_wrapper">
            <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />
          </div>
          
          <div id="qa_wrapper">
            <span onClick={loginwithgoogle}>
              <img src="./icons/google.png" alt="Google" />
              <p>Google</p>
            </span>
            <span onClick={loginwithFacebook}>
              <img src="./icons/fb.png" alt="Facebook" />
              <p>Facebook</p>
            </span>
            <span onClick={loginwithSteam}>
              <img src="./icons/steam.svg" alt="Steam" />
              <p>Steam</p>
            </span>
          </div>

          <p onClick={() => {
            navigate('/auth/signup');
            setTimeout(() => {
              document.getElementById("signup").style.animation = "fadeIn 300ms ease 200ms forwards";
            }, 1);
          }}>Don't have an account?</p>
        </form>
      ) : type === 'signup' ? (
        <form id="signup" onSubmit={handleSignup}>
          <h1>Sign Up</h1>
          <p>Make a new account!</p>
          
          <div>
            <div>
              <label>First Name</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
          
          <p onClick={() => {
            navigate('/auth/login');
          }}>Already have an account?</p>
        </form>
      ) : (
        <form id="forgot" onSubmit={handleForgotPassword}>
          <h1>Forgot your password?</h1>
          <p>Enter the email address associated with your Games-Cheap account.
          </p>
          
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
 
          

          <button type="submit">Reset Password</button>
          
          <p onClick={() => {
            navigate('/auth/login');
          }}>Remember your password? Sign In</p>
        </form>
      )}
            </div>
        </section>
    );
}

export default LoginBody;