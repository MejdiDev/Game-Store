import "../styles/css/blogPostBody.css";
import parse from 'html-react-parser'

const BlogPostBody = ({ blogPost }) => {
    return (
        <section id="blog_post">
            <div id="top">
                <h1>{ blogPost.title }</h1>
                <img src={blogPost.img} alt="Cover Image" />
            </div>

            { parse("<p id='content'>" + blogPost.content + "</p>") }
        </section>
    );
}

export default BlogPostBody;