import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import AccountBody from "../components/AccountBody";

import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import { useLocation } from 'react-router-dom';


const AccountPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const { tab } = useParams()
    


    useEffect(() => {
        if(document.title !== "SOFTKey24 Store") document.title = "SOFTKey24 Store";

        

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

            <Footer />
        </main>
    );
}

export default AccountPage;