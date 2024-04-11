import "../styles/css/blogList.css";

import blog_data from "../data/blog_data.json";

const GridBlogCard = ({ blog, className }) => {
    return (
        <div className={`blog_card ${className}`}>
            <div id="cover" style={{backgroundImage: `url('${blog.img}')`}}></div>
            
            <div id="text">
                { className == "" && <p>Date</p> }
                <h1>{ blog.title }</h1>

                <p id="description">{ blog.description }</p>
                { className == "main" &&
                    <div id="date_wrapper">
                        <p>Date</p>
                    </div>
                }
            </div>
        </div>
    );
}

const BlogList = () => {
    return (
        <section id="blog_list">
            <h1>Blog</h1>

            <GridBlogCard className="main" blog={blog_data[0]} />

            <div id="blog_grid">
                {
                    blog_data.map((blog, idx) =>
                        <GridBlogCard key={`grid-blog-card-${idx}`} className="" blog={blog} />
                    )
                }
            </div>
        </section>
    );
}

export default BlogList;