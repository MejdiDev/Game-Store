import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import LoginBody from "../components/LoginBody";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { googleLogin } from "../data/api";
import { verifyMail } from "../data/api";
import { setToken } from "../utils/cookie";

const SuccesPage = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [message,setMessage] = useState('')

    useEffect(() => {
        console.log(token);

        const handleverify = async (token) => {
            const response =await verifyMail(token);
            console.log(response);
            if(response.status){
                console.log('okkkk');
                setToken(token)
            }
            setMessage(response.message);


        }
        handleverify(token);
        document.title = "SOFTKey24";
        hideMobileNav()
    }, []);

    const loginwithgoogle = ()=>{
        console.log('pl');
        window.open("http://localhost:4000/auth/google/callback","_self")
    }




    return (
       

        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <DropdownMenu platform="" />
            <section id="login_body" >
           
             

            <h1 style={{textAlign:"center",color:"white"}}>{message}</h1>

                     
        </section>
            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default SuccesPage;