import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";

import BlogSwiper from "../components/BlogSwiper";
import Footer from "../components/Footer";

import blog_data from "../data/blog_data.json"

import { shuffleArray } from "../utils/functions";
import { useEffect } from "react";
import AboutUsSection from "../components/AboutUsSection";


const AboutUsPage = () => {
    useEffect(() => {
        hideMobileNav()
    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform="" />

            <AboutUsSection />
            
            <BlogSwiper data={ shuffleArray(blog_data) } />

            <Footer />
        </main>
    );
}

export default AboutUsPage;