import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";


import Footer from "../components/Footer";

import ProductLocation from "../components/ProductLocation";
import ProductDetails from "../components/ProductDetails";
import ProductAbout from "../components/ProductAbout";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import games from "../data/games.json";
import GuideBody from "../components/GuideBody";

const checkOffset = () => {
    const socialFloat = document.querySelector('#product_details_section #buy_component');
    if(!socialFloat) return

    const footer = document.querySelector('footer');

    const getRectTop = el => {
        return el.getBoundingClientRect().top
    }

    if((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10) {
        socialFloat.style.position = 'absolute'
        console.log("-" + String(window.scrollY + document.querySelector('footer').getBoundingClientRect().top) + "px")
        socialFloat.style.bottom = "-" + String(window.scrollY + document.querySelector('footer').getBoundingClientRect().top - 1000) + "px"
    }

    if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)) {
        socialFloat.style.position = 'fixed'
        socialFloat.style.bottom = "auto"
    }
}

document.addEventListener("scroll", () => {
    if(window.innerWidth > 1320) {
        checkOffset()
    }
});

const ProductPage = () => {
    const { platform, product_id } = useParams();
    const [gameData, setGameData] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0);
        hideMobileNav();

        const res_game = games.filter(game => game.id == product_id)[0];
        console.log(res_game)

        document.title = res_game.title;
        setGameData( res_game );
    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <GuideBody />

            <DropdownMenu platform={platform} />
            
            <ProductLocation />
            <ProductDetails platform={platform} game={ gameData } />
            <ProductAbout game={ gameData } />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default ProductPage;