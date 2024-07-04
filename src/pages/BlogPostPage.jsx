import Nav from "../components/Nav";
import { MobileNav, hideMobileNav } from '../components/MobileNav';

import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import BlogPostBody from "../components/BlogPostBody";

import { useNavigate, useParams } from "react-router-dom";

import blog_posts from "../data/blog_data.json";
import BlogSwiper from "../components/BlogSwiper";
import { shuffleArray } from "../utils/functions";

const BlogPostPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [blogPost, setBlogPost] = useState(null)

    const getBlogPost = () => {
        setTimeout(() => {
            const blogRes = blog_posts.filter(el => el.id == id)
            if(blogRes.length > 0) setBlogPost(blogRes[0])
            else navigate('/blog')
        }, 700)
    }

    useEffect(() => {
        hideMobileNav()

        getBlogPost()
    }, []);

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform="" />

            {
                !blogPost ?

                <div id="loader_wrapper"><div className="loader"></div></div>

                :

                <div>
                        <BlogPostBody blogPost={ blogPost } />

                        <BlogSwiper title="Read Also :" data={ shuffleArray(blog_posts.filter(el => el.id !== blogPost.id)) } />

                        <Footer />
                </div>
            }
        </main>
    );
}

export default BlogPostPage;