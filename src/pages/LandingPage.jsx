import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";

import Slider from "../components/Slider";
import GamesBuySlider from "../utils/GamesBuySlider";
import BlogSwiper from "../components/BlogSwiper";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

import games from "../data/games.json";
import discounted_games from "../data/discounted_games.json"
import blog_data from "../data/blog_data.json";

import { shuffleArray } from "../utils/functions";

const LandingPage = () => {
    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav isHome={true} />

            <Nav />
            <DropdownMenu />
            
            <Slider games={ games } />

            <Categories />

            <div className="seperation"><span></span></div>

            <GamesBuySlider id="trending_games_section" title="Trending" games={ shuffleArray(games) } />
            <GamesBuySlider id="bestsell_games_section" title="Bestsellers" games={ shuffleArray(discounted_games) } />

            <BlogSwiper data={ shuffleArray(blog_data) } />
            <InfoSection />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default LandingPage;