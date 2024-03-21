import '../styles/css/mobileNav.css';

const hideMobileNav = () => {
    const filterMenu = document.querySelector('.filter_wrapper');

    document.getElementById('mobileNavbar').classList.remove('active');
    document.getElementById('overlay').style.opacity = "0";
    if(filterMenu) filterMenu.classList.remove("slid_into_view");

    setTimeout(() => {
        document.getElementById('mobileNavbar').style.display = "none";

        if(filterMenu) filterMenu.classList.add("mobl_hidden");
        document.getElementById('overlay').style.display = "none";
    }, 400);
    document.querySelector('body').classList.remove('hidden');
}

const MobileNav = () => {
    return (
        <div id="mobileNavbar">
            <div id="top">
                <div className="select_wrapper">
                    <select>
                        <option value="">€ EUR</option>
                        <option value="">$ USD</option>
                        <option value="">د.ت TND</option>
                    </select>

                    <img src="./icons/dropdown.png" alt="Arrow" />
                </div>

                <div onClick={hideMobileNav} id="cross">
                    <img src="./icons/cross.png" alt="Close" />
                </div>
            </div>

            <ul>
                <li>
                    <img src="./icons/PC.png" alt="PC" />
                    <p>PC</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li className="active">
                    <img src="./icons/playstation.png" alt="Playstation" />
                    <p>PLAYSTATION</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/xbox.png" alt="Xbox" />
                    <p>XBOX</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/switch.png" alt="Nintendo" />
                    <p>NINTENDO</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/gift_card.png" alt="Gift Cards" />
                    <p>GIFT CARDS</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/software.png" alt="Software" />
                    <p>SOFTWARE</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/support.png" alt="Support" />
                    <p>SUPPORT</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>
            </ul>

            <div id="nav_link">
                <div className="links">
                    <p>About us</p>
                    <p>Blog</p>
                    <p>Create ticket</p>
                    <p>Delivery payment</p>
                    <p>Sitemap</p>
                    <p>Contact us</p>
                </div>
            </div>
            
        </div>
    );
}

export { MobileNav, hideMobileNav };