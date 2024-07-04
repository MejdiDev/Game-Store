import { Link } from "react-router-dom";
import "../styles/css/blogList.css";

const GridBlogCard = ({ blog, className }) => {
    return (
        <Link to={ '/blog/' + blog.id }>
            <div className={`blog_card ${className}`}>
                <div id="cover" style={{backgroundImage: `url('${blog.img}')`}}></div>
                
                <div id="text">
                    { className == "" && <p>{ blog.date }</p> }
                    <h1>{ blog.title } </h1>

                    <p id="description">{ blog.description }</p>
                    { className == "main" &&
                        <p id="date_wrapper">{ blog.date }</p>
                    }
                </div>
            </div>
        </Link>
    );
}

const BlogList = ({ blogList }) => {
    return (
        <section id="blog_list">
            <h1>Blog</h1>

            <GridBlogCard className="main" blog={blogList[0]} />

            <div id="blog_grid">
                {
                    blogList.map((blog, idx) =>
                        (idx != 0) && <GridBlogCard key={`grid-blog-card-${idx}`} className="" blog={blog} />
                    )
                }
            </div>
        </section>
    );
}

export default BlogList;