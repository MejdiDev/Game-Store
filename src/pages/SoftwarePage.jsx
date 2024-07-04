import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";


import Footer from "../components/Footer";

import ProductLocation from "../components/ProductLocation";
import ProductDetails from "../components/ProductDetails";
import ProductAbout from "../components/ProductAbout";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getGameById, getKinguinProduct } from "../data/api";

import GuideBody from "../components/GuideBody";
import SoftwareAbout from "../components/SoftwareAbout";

const checkOffset = () => {
    const socialFloat = document.querySelector('#product_details_section #buy_component');
    if (!socialFloat) return

    const footer = document.querySelector('footer');

    const getRectTop = el => {
        return el.getBoundingClientRect().top
    }

    if ((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10) {
        socialFloat.style.position = 'absolute'
        console.log("-" + String(window.scrollY + document.querySelector('footer').getBoundingClientRect().top) + "px")
        socialFloat.style.bottom = "-" + String(window.scrollY + document.querySelector('footer').getBoundingClientRect().top - 1000) + "px"
    }

    if (document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)) {
        socialFloat.style.position = 'fixed'
        socialFloat.style.bottom = "auto"
    }
}

document.addEventListener("scroll", () => {
    if (window.innerWidth > 1320) {
        checkOffset()
    }
});


const SoftwarePage = () => {
    const { name } = useParams();
    const [gameData, setGameData] = useState({});
    const getGameData = async () => {
        try {
            const id = name.split('-').reverse()[0];
            const response = await getGameById(id);
            setGameData(response);

        } catch (e) {
            console.log(`error while getting product data :: ${e}`)

        }
    }
    useEffect(() => {

        getGameData();

        window.scrollTo(0, 0);
        hideMobileNav();


    }, [name])
    useEffect(() => {
        document.title = gameData.name ? gameData.name : gameData.productName;
    }, [gameData])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />

            <GuideBody />

            <DropdownMenu platform={'PC'} />

            <ProductLocation />
            <ProductDetails platform={'PC'} game={gameData} />
            <SoftwareAbout game={gameData} />

            <Footer />
        </main>
    );
}

export default SoftwarePage;