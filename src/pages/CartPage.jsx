import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import { useEffect } from "react";
import CartBody from "../components/CartBody";


const CartPage = () => {

    useEffect(() => {
        hideMobileNav()
    }, []);


    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform="" />

            <CartBody />

            <Footer />
        </main>
    );
}

export default CartPage;