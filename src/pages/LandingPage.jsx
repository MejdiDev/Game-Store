import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";

import Slider from "../components/Slider";
import GamesBuySlider from "../utils/GamesBuySlider";
import BlogSwiper from "../components/BlogSwiper";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

import games from "../data/games.json"
import blog_data from "../data/blog_data.json"

import { shuffleArray } from "../utils/functions";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const LandingPage = () => {
    const { platform } = useParams();
    const [data, setData] = useState([])

    const getGameData = () => {
        axios.get(`https://www.giantbomb.com/api/games/?format=json&limit=20&api_key=${process.env.REACT_APP_GIANT_BOMB_API_KEY}`)
        .then(res => res.data.results)
        .then(res => {
            setData(res)
            console.log(res[0])
        })
    }

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform={platform} />
            
            <Slider platform={platform} games={ games } />

            <Categories />

            <div className="seperation"><span></span></div>

            <GamesBuySlider id="trending_games_section" title="Trending" platform={platform} games={ shuffleArray(games) } />
            <GamesBuySlider id="bestsell_games_section" title="Bestsellers" platform={platform} games={ shuffleArray(games.filter(game => game.is_discounted)) } />

            <BlogSwiper data={ shuffleArray(blog_data) } />
            <InfoSection />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default LandingPage;