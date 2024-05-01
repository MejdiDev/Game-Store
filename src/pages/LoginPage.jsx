import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import LoginBody from "../components/LoginBody";

import { useEffect } from "react";
import { useParams } from "react-router-dom";


const LoginPage = () => {
    const { type } = useParams()

    useEffect(() => {
        document.title = "Key4GG";
        hideMobileNav()
    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <DropdownMenu platform="" />

            <LoginBody type={type} />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default LoginPage;