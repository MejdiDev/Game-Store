import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import { useEffect } from "react";
import BlogList from "../components/BlogList";


const BlogListPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Key4GG";
        hideMobileNav()
    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform="" />
            
            <BlogList />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default BlogListPage;