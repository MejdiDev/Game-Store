import "../styles/css/nav.css";

const Nav = () => {
    const showMobileNav = () => {
        document.getElementById('overlay').style.display = "block";
        document.getElementById('mobileNavbar').style.display = "flex";
        
        setTimeout(() => {
            document.getElementById('overlay').style.opacity = "0.7";
            document.getElementById('mobileNavbar').classList.add('active');
        }, 1);
        document.querySelector('body').classList.add('hidden');
    }

    return (
        <nav>
            <img className="logo" id="comp" src="./logo.png" alt="Logo" />

            <span id="comp" className="text_input_wrapper">
                <input type="text" placeholder="Search" />

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><g data-name="Layer 2" fill="#000000" className="color000 svgShape"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search" fill="#fff" className="color000 svgShape"></path></g></svg>
                </button>
            </span>

            <span id="inputs">
                <div className="select_wrapper">
                    <select>
                        <option value="">€ EUR</option>
                        <option value="">$ USD</option>
                        <option value="">د.ت TND</option>
                    </select>

                    <img src="./icons/dropdown.png" alt="Arrow" />
                </div>

                <button className="nav_btn" id="menu" onClick={showMobileNav}>
                    <img src="./icons/menu.png" alt="Menu" />
                </button>

                <button className="nav_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 32 32" width="256" height="256"><path d="M29.051 29.999 29 30H3a1 1 0 0 1-1-1v-2a9 9 0 0 1 9-9h10a9 9 0 0 1 9 9v2l-.001.051-.004.051-.007.05-.008.049-.012.049-.013.047-.016.047-.018.045-.02.044-.022.043-.024.042-.026.041-.028.039-.029.038-.032.036-.033.035-.035.033-.036.032-.038.029-.039.028-.041.026-.042.024-.043.022-.044.02-.045.018-.047.016-.047.013-.049.012-.049.008-.05.007-.051.004zM28 28v-1a7 7 0 0 0-7-7H11a7 7 0 0 0-7 7v1h24zM16 2c-3.863 0-7 3.137-7 7s3.137 7 7 7 7-3.137 7-7-3.137-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" fill="#fff" className="color000 svgShape"></path></svg>
                </button>

                <div className="logo mobl wrapper">
                    <img src="./logo.png" alt="Logo" />
                </div>

                <button className="nav_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" fill="#fff" className="color000 svgShape"></path></svg>
                </button>

                <button className="nav_btn badged active">
                    <div id="badge">
                        <p>2</p>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="256" height="256"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" fill="#fff" className="color000 svgShape"></path></svg>
                </button>
            </span>

            <span id="mobl" className="text_input_wrapper">
                <input type="text" placeholder="Search" />

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><g data-name="Layer 2" fill="#000000" className="color000 svgShape"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search" fill="#fff" className="color000 svgShape"></path></g></svg>
                </button>
            </span>
        </nav>
    );
}

export default Nav;