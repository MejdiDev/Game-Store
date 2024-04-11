import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import AccountBody from "../components/AccountBody";

import Footer from "../components/Footer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const AccountPage = () => {
    const { tab } = useParams()

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
            
            <AccountBody param_tab={ tab } />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default AccountPage;