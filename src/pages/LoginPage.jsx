import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import LoginBody from "../components/LoginBody";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const LoginPage = () => {
    const { type } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(!["login", "signup"].includes(type)) {
            navigate("/");
            return;
        }

        document.title = "Key4GG";
        hideMobileNav()
    }, [])

    return (
        ["login", "signup"].includes(type) &&

        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <DropdownMenu platform="" />

            <LoginBody type={type} navigate={navigate} />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default LoginPage;