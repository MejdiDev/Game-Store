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

const ProductPage = () => {
    const { platform, product_id } = useParams();
    const [gameData, setGameData] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0);
        hideMobileNav();

        const res_game = games.filter(game => game.id == product_id)[0];

        document.title = res_game.title;
        setGameData( res_game );
    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
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