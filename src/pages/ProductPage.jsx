import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";


import Footer from "../components/Footer";

import ProductLocation from "../components/ProductLocation";
import ProductDetails from "../components/ProductDetails";
import ProductAbout from "../components/ProductAbout";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getKinguinProduct } from "../data/api";

import GuideBody from "../components/GuideBody";

import VisualsCarousel from "../components/VisualsCarousel";

const checkOffset = () => {
    const socialFloat = document.querySelector('#product_details_section #buy_component');
    if (!socialFloat) return

    const footer = document.querySelector('footer');

    const getRectTop = el => {
        return el.getBoundingClientRect().top
    }

    if ((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight + 100 >= (getRectTop(footer) + document.body.scrollTop)) {
        socialFloat.style.position = 'absolute'
        socialFloat.style.top = "auto"
        socialFloat.style.bottom = "-" + String(window.scrollY + document.querySelector('footer').getBoundingClientRect().top - 1000) + "px"
    }

    if (document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop + 200)) {
        socialFloat.style.position = 'fixed'
        socialFloat.style.bottom = "auto"
        socialFloat.style.top = "230px"
    }
}

document.addEventListener("scroll", () => {
    if (window.innerWidth > 1320) {
        checkOffset()
    }
});

const ProductPage = () => {
    const { name } = useParams();
    const [gameData, setGameData] = useState(null);

    const getGameData = async () => {
        try {
            const kinguinId = name.split('-').reverse()[0];
            const response = await getKinguinProduct(kinguinId);
            setGameData(response.game);

            document.title = response.game.name;

        } catch (e) {
            console.log(`error while getting product data :: ${e}`)

        }
    }
    useEffect(() => {

        getGameData();

        window.scrollTo(0, 0);
        hideMobileNav();

    }, [name])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />
            <Nav />
            <DropdownMenu platform={''} />


            {!gameData ?


                <div id="loader_wrapper"><div className="loader"></div></div>

                :
                <div>
                    <GuideBody />

                    <VisualsCarousel />


                    <ProductLocation />
                    <ProductDetails platform={gameData.platform} game={gameData} />
                    <ProductAbout game={gameData} />

                    <Footer />
                </div>
            }
        </main>
    );
}

export default ProductPage;