import "../styles/css/blogSwiper.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import { useRef, useCallback } from "react";

import 'swiper/css';
import { Link, useLocation, useNavigate } from "react-router-dom";

const BlogCard = ({ blog_data }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const RedirectOnClick = (e, id) => {
        if(!(location.pathname.includes('/blog/'))) return

        e.preventDefault()

        document.querySelector("main").style.display = "none"
        navigate('/blog/' + id)
        navigate(0)
    }

    return (
        <Link
            to={'/blog/' + blog_data.id}
            onClick={e => 
                RedirectOnClick(e, blog_data.id)
            }
        >
            <div className="benefit_card">
                <div id="background" style={{backgroundImage: `url(${blog_data.img})`}}></div>
                
                <h1>{ blog_data.title }</h1>
                <p>{ blog_data.description }</p>
            </div>
        </Link>
    );
}

const BlogSwiper = ({ data, title }) => {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <section id="benefits_section">
            <h1>{ !title ? "Blog" : title }</h1>

            <div id="blog_swiper_wrapper">
                <Swiper
                    ref={sliderRef}
                    speed={500}
                    loop={true}
                    grabCursor={true}
                    modules={[Autoplay]}
                    spaceBetween={40}

                    autoplay={{
                        delay: 4000
                    }}

                    breakpoints= {{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },

                        530: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },

                        820: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }}
                >
                    {
                        data.map((data, idx) =>
                            <SwiperSlide key={`blog-slide-${idx}`}>
                                <BlogCard blog_data={data} />
                            </SwiperSlide>
                        )
                    }
                </Swiper>

                <div className="nav_wrapper">
                    <div className="arrow" id="prev-arrow" onClick={handlePrev}>
                        <img src="./arrow_prev.png" alt="Prev" />
                    </div>

                    <div className="arrow" id="next-arrow" onClick={handleNext}>
                        <img src="./arrow_prev.png" alt="Next" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogSwiper;