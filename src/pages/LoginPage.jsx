import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import LoginBody from "../components/LoginBody";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { googleLogin } from "../data/api";
import { signup } from "../data/api";

const LoginPage = () => {
    const { type } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if(!["login", "signup", "forgot"].includes(type)) {
            navigate("/");
            return;
        }

        if(document.title !== "SOFTKey24 Store") document.title = "SOFTKey24 Store";
        hideMobileNav()
    }, []);

    const loginwithgoogle = ()=>{
        console.log('pl');
        window.open("http://localhost:4000/auth/google/callback","_self")
    }


    const loginwithFacebook = ()=>{
        console.log('pl');
        window.open("http://localhost:4000/auth/facebook/callback","_self")
    }

    const loginwithSteam = ()=>{
        console.log('pl');
        window.open("http://localhost:4000/user/steam","_self")
    }

    return (
        ["login", "signup", "forgot"].includes(type) &&

        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <DropdownMenu platform="" />

            <LoginBody type={type} navigate={navigate} loginwithgoogle={loginwithgoogle} loginwithFacebook={loginwithFacebook} loginwithSteam={loginwithSteam}/>

            <Footer />
        </main>
    );
}

export default LoginPage;