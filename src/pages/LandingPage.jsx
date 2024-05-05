import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";

import Slider from "../components/Slider";
import GamesBuySlider from "../utils/GamesBuySlider";
import BlogSwiper from "../components/BlogSwiper";
import InfoSection from "../utils/InfoSection";
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
            <DropdownMenu platform={platform} />
            
            <Slider platform={platform} games={ games } />

            <Categories />

            <div className="seperation"><span></span></div>

            <GamesBuySlider
                id="trending_games_section"
                title="Trending"
                platform={platform}
                games={ shuffleArray(games) }
                delay={2000}
            />

            <GamesBuySlider
                id="bestsell_games_section"
                title="Bestsellers"
                platform={platform}
                games={ shuffleArray(games.filter(game => game.is_discounted)) }
                delay={2700}
            />

            <GamesBuySlider
                className="gift_card"
                id="gift_cards_section"
                title="Gift Cards"
                platform={ platform }
                games={ shuffleArray(games) }
                delay={3000}
            />

            <BlogSwiper data={ shuffleArray(blog_data) } />
            <InfoSection
                title="Online game shop Key4gg"
                body={
                    <p>
                        Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages.
                        <br /><br />
                        Why us?
                        <br /><br />
                        A huge selection of games. We have the best games on the market for PC and consoles. Whether you're a fan of action, adventure, strategy or sports simulation, we offer a wide selection to satisfy your thirst for gaming entertainment.
                        <br /><br />
                        Bargain prices. We pride ourselves on offering our customers competitive prices. We have regular promotions and discounts, making your gaming fun even more affordable.
                    </p>
                }
            />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default LandingPage;