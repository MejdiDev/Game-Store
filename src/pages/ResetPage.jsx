import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import LoginBody from "../components/LoginBody";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { forgotPassword, googleLogin, resetPassword, verifyOtp } from "../data/api";
import { signup } from "../data/api";

const ResetPage = () => {
    const { otp } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        async function fetchData() {
            const response = await verifyOtp(otp);
            setEmail(response.email);
          }
          fetchData()
        document.title = "SOFTKey24";
        hideMobileNav()
    }, []);

    const handleReset = async (e) => {
        e.preventDefault();
        const response = await resetPassword(email,otp,password);
       // alert(response.message)
        if(response.succes){
        //  setShowCode(true);
        navigate('/auth/login')
        }
      };
    return (

        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <DropdownMenu platform="" />

            <section id="login_body" style={{backgroundImage: "url('./wave.svg')"}}>
            <div id="form_wrapper">
                <div id="hot_games_slider_wrapper" style={{backgroundImage: "url('./doom_eternal.jpg')"}}></div>

                    <form id="login" onSubmit={handleReset}>
                        <h1>Set new password</h1>
                        <p></p>

                        <label htmlFor="">Email</label>
                        <input type="email" value={email}  disabled/>

                        <label>New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type='submit'>Continue</button>
                        
                    </form>

            </div>
        </section>
            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default ResetPage;