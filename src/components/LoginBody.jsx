import { useNavigate } from 'react-router-dom';
import '../styles/css/loginBody.css';

const LoginBody = ({ type, navigate }) => {
    return (
        <section id="login_body" style={{backgroundImage: "url('./wave.svg')"}}>
            <div id="form_wrapper">
                <div id="hot_games_slider_wrapper" style={{backgroundImage: "url('./doom_eternal.jpg')"}}></div>

                {
                    type == "login" ?

                    <form id="login">
                        <h1>Sign In</h1>
                        <p>Access your account now !</p>

                        <label htmlFor="">Email</label>
                        <input type="text" />

                        <label htmlFor="">Password</label>
                        <input type="password" />

                        <p>Forgot Password</p>
                        <button>Sign In</button>

                        <div id="qa_wrapper">
                        <span>
                                <img src="./icons/google.png" alt="Google" />
                                <p>Google</p>
                            </span>

                            <span>
                                <img src="./icons/fb.png" alt="Facebook" />
                                <p>Facebook</p>
                            </span>
                        </div>

                        <p onClick={() => {
                            navigate('/auth/signup');
                            
                            setTimeout(() => {
                                document.getElementById("signup").style.animation = "fadeIn 300ms ease 200ms forwards";
                            }, 1)
                        }}>Don't have an account ?</p>
                    </form>

                    :

                    <form key="gfd" id="signup">
                        <h1>Sign Up</h1>
                        <p>Make a new account !</p>

                        <div>
                            <div>
                                <label htmlFor="">First Name</label>
                                <input type="text" />
                            </div>

                            <div>
                                <label htmlFor="">Last Name</label>
                                <input type="text" />
                            </div>
                        </div>

                        <label htmlFor="">Email</label>
                        <input type="text" />

                        <label htmlFor="">Password</label>
                        <input type="password" />

                        <label htmlFor="">Repeat Password</label>
                        <input type="password" />

                        <button>Sign Up</button>

                        <p onClick={() => navigate('/auth/login')}>Already have an account ?</p>
                    </form>

                }
            </div>
        </section>
    );
}

export default LoginBody;