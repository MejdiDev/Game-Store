import "../styles/css/contactUsBody.css";

const ContactUsBody = () => {
    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <section id="contact_us_section">
            <h1>Contact Us</h1>

            <div id="content_wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="c_input_wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 32 32" width="256" height="256"><path d="M29.051 29.999 29 30H3a1 1 0 0 1-1-1v-2a9 9 0 0 1 9-9h10a9 9 0 0 1 9 9v2l-.001.051-.004.051-.007.05-.008.049-.012.049-.013.047-.016.047-.018.045-.02.044-.022.043-.024.042-.026.041-.028.039-.029.038-.032.036-.033.035-.035.033-.036.032-.038.029-.039.028-.041.026-.042.024-.043.022-.044.02-.045.018-.047.016-.047.013-.049.012-.049.008-.05.007-.051.004zM28 28v-1a7 7 0 0 0-7-7H11a7 7 0 0 0-7 7v1h24zM16 2c-3.863 0-7 3.137-7 7s3.137 7 7 7 7-3.137 7-7-3.137-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" fill="#fff" className="color000 svgShape"></path></svg>
                        <input type="text" placeholder="Full Name" />
                    </div>

                    <div className="c_input_wrapper">
                        <img src="./icons/mail.png" alt="E-mail" />
                        <input type="email" placeholder="E-mail" />
                    </div>

                    <textarea placeholder="Message" rows="6"></textarea>

                    <label htmlFor="fileUpload">
                        <div>
                            <img src="./icons/upload.svg" alt="Upload File" />
                            <h3>Click to upload</h3>
                        </div>
                    </label>
                    <input type="file" id="fileUpload" />

                    <button>Submit</button>
                </form>

                <div id="info">
                    <h2>Our Address</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                    <h2>Our Socials</h2>
                    <div>
                        <a href=""><img src="./socials/fb.svg" alt="Facebook" /></a>
                        <a href=""><img src="./socials/ig.svg" alt="Instagram" /></a>
                        <a href=""><img src="./socials/x.svg" alt="X" /></a>
                        <a href=""><img src="./socials/ytb.svg" alt="Youtube" /></a>
                        <a href=""><img src="./socials/tiktok.svg" alt="Tiktok" /></a>
                    </div>

                    <h2>Our E-mail</h2>
                    <p>SOFTKey24@gmail.com</p>
                </div>
            </div>
        </section>
    );
}

export default ContactUsBody;