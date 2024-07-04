import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";

import Slider from "../components/Slider";
import GamesBuySlider from "../utils/GamesBuySlider";
import BlogSwiper from "../components/BlogSwiper";
import InfoSection from "../utils/InfoSection";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

import blog_data from "../data/blog_data.json"

import { shuffleArray } from "../utils/functions";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getHomeData } from "../data/api";
import { useLocation } from 'react-router-dom';
import { setToken } from "../utils/cookie";

import { getAllKinguinGames } from "../data/api";


const LandingPage = () => {
    const navigate = useNavigate();
    const { platform } = useParams();
    const [data, setData] = useState([]);
    const [sliders, setSliders] = useState(null);
    const [trending, setTrending] = useState(null);
    const [bestSellers, setBestSellers] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('token');
    const getHomeContent = async () => {
        const response = await getHomeData();
        console.log(response)
        setSliders(response.sliders);
        setBestSellers(response.bestSellers);
        setTrending(response.trendings);
    }

    const setTokenQuery = async () => {
        if (name) {
            setToken(name);
            searchParams.delete('token');
            navigate({ search: searchParams.toString() }, { replace: true });
        }
    }
    const getHomeContentTemp = async () => {     //TODO: REMOVE THIS FUNCTION.
        let res = []

        const respSteam = await getAllKinguinGames("Steam", []);
        const respPS = await getAllKinguinGames("Xbox", []);
        const respXbox = await getAllKinguinGames("Playstation", []);

        res = shuffleArray(res.concat(respSteam.products, respPS.products, respXbox.products))

        setSliders(res.slice(0, 6));
        setBestSellers(res.slice(6, 12));
        setTrending(res.slice(12, 18));
    }

    useEffect(() => {
        document.title = "SOFTKey24"

        getHomeContentTemp()        //TODO: REPLACE WITH ORIGINAL FUNCTION.
        hideMobileNav()
        setTokenQuery();

    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform={platform} />

            {!(sliders && trending && bestSellers) ?

                <div id="loader_wrapper"><div className="loader"></div></div>

                :
                <div>
                    {sliders && (<Slider platform={platform} games={sliders} />)}

                    <Categories />

                    <div className="seperation"><span></span></div>


                    {trending && (<GamesBuySlider id="trending_games_section" title="Trending" platform={platform} games={trending} />)}
                    {bestSellers && (<GamesBuySlider id="bestsell_games_section" title="Bestsellers" platform={platform} games={bestSellers} />)}

                    <BlogSwiper data={shuffleArray(blog_data)} />




                    <InfoSection
                        title="Online game shop SOFTKey24"
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

                    <Footer />
                </div>
            }
        </main>
    );
}

export default LandingPage;