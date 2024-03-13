import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";

import Slider from "../components/Slider";
import GamesBuySlider from "../utils/GamesBuySlider";
import Benefits from "../components/Benefits";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

const games = [
    {
        cover: "COD_modern_warfare.jpg",
        title: "Call Of Duty: Modern Warfare 3",
        price: 59,
        platforms: [ "PC", "Playstation", "Xbox" ]
    },

    {
        cover: "realms_of_ruin.jpg",
        title: "Realms Of Ruin",
        price: 59,
        platforms: [ "PC", "Playstation" ]
    },

    {
        cover: "dead_space.jpg",
        title: "Dead Space",
        price: 59,
        platforms: [ "PC", "Xbox" ]
    },

    {
        cover: "horizon.jpg",
        title: "Horizon",
        price: 59,
        platforms: [ "PC", "Playstation", "Xbox" ]
    },

    {
        cover: "COD_cold_war.jpg",
        title: "Call Of Duty: Cold War",
        price: 59,
        platforms: [ "PC", "Playstation" ]
    },

    {
        cover: "atomic_heart.jpg",
        title: "Atomic Heart",
        price: 59,
        platforms: [ "PC", "Playstation", "Xbox" ]
    },

    {
        cover: "hogwarts_legacy.jpg",
        title: "Hogwarts Legacy",
        price: 59,
        platforms: [ "PC", "Playstation" ]
    }
]

const discounted_games = [
    {
        cover: "COD_modern_warfare.jpg",
        title: "Call Of Duty: Modern Warfare 3",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Playstation", "Xbox" ]
    },

    {
        cover: "realms_of_ruin.jpg",
        title: "Realms Of Ruin",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Playstation" ]
    },

    {
        cover: "dead_space.jpg",
        title: "Dead Space",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Xbox" ]
    },

    {
        cover: "horizon.jpg",
        title: "Horizon",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Playstation", "Xbox" ]
    },

    {
        cover: "COD_cold_war.jpg",
        title: "Call Of Duty: Cold War",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Playstation" ]
    },

    {
        cover: "atomic_heart.jpg",
        title: "Atomic Heart",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Playstation", "Xbox" ]
    },

    {
        cover: "hogwarts_legacy.jpg",
        title: "Hogwarts Legacy",
        price: 59,
        new_price: 36,
        is_discounted: true,
        discount_perc: 39,
        platforms: [ "PC", "Playstation" ]
    }
]

const LandingPage = () => {
    return (
        <main>
            {/* <img id="bg_blur" src="./bg.svg" alt="Blurry Background" /> */}

            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav isHome={true} />

            <Nav />
            <DropdownMenu />
            
            <Slider games={ games } />

            <Categories />

            <div className="seperation"><span></span></div>

            <GamesBuySlider id="trending_games_section" title="Trending" games={ games } />
            <GamesBuySlider id="bestsell_games_section" title="Bestsellers" games={ discounted_games } />

            <Benefits />
            <InfoSection />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default LandingPage;