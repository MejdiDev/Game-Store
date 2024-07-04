import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";

import blog_data from "../data/blog_data.json";

const BlogListPage = () => {
    const [blogList, setBlogList] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0);
        if(document.title !== "SOFTKey24 Store") document.title = "SOFTKey24 Store";
        hideMobileNav()

        setTimeout(() => {
            setBlogList(blog_data)
        }, 1000)
    }, [])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform="" />
            
            {   !blogList ? 

                <div id="loader_wrapper"><div className="loader"></div></div>

                :

                <div>
                    <BlogList blogList={
                        blogList.sort((a, b) => { 
                            const aDte = new Date(a.date);
                            const bDte = new Date(b.date);

                            return bDte - aDte;
                        })
                    } />

                    <Footer />
                </div>
            }
        </main>
    );
}

export default BlogListPage;