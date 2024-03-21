import "../styles/css/dropdownMenu.css";
import { Link } from "react-router-dom";

const DropdownMenu = ({ platform }) => {
    const showTab = () => {
        document.querySelector("body").style.overflowX = "hidden";
        document.getElementById('overlay_dropdown').style.display = "block";
        document.getElementById('overlay_dropdown').style.opacity = "0.8";
    }

    const hideTab = () => {
        document.querySelector("body").style.overflowX = "visible";
        document.getElementById('overlay_dropdown').style.opacity = "0";
        document.getElementById('overlay_dropdown').style.display = "none";
    }

    return (
        <div id="drop_menu_wrapper">
            <div id="drop_menu">
                <ul className="main">
                    <li className={(platform.toUpperCase() == "PC") ? "active" : undefined} onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
                        <Link to='/PC'>
                            <img src="./icons/PC.png" alt="PC" />
                            <p>PC</p>

                            <div id="menu">
                                <div style={{backgroundImage: 'url(./gift_cards/pc.jpg)'}} id="card"></div>

                                <div id="tabs">
                                    <h1>PC</h1>
                                    <div className="sprt"></div>

                                    <ul>
                                        <li className="active">Promoted</li>
                                        <li>Bestsellers</li>
                                        <li>PC Subscriptions</li>
                                        
                                        <Link to='/game-list/PC'>
                                            <li>PC Games</li>
                                        </Link>
                                    </ul>
                                </div>

                                <div id="promoted">
                                    <h1>Promoted</h1>
                                    <div className="sprt"></div>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className={(platform.toUpperCase() == "PLAYSTATION") ? "active" : undefined} onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
                        <Link to='/Playstation'>
                            <img src="./icons/playstation.png" alt="Playstation" />
                            <p>PLAYSTATION</p>

                            <div id="menu">
                                <div style={{backgroundImage: 'url(./gift_cards/ps.jpg)'}} id="card"></div>

                                <div id="tabs">
                                    <h1>Playstation</h1>
                                    <div className="sprt"></div>

                                    <ul>
                                        <li className="active">Promoted</li>
                                        <li>Bestsellers</li>
                                        <li>Playstation Subscriptions</li>
                                        
                                        <Link to='/game-list/Playstation'>
                                            <li>Playstation Games</li>
                                        </Link>
                                    </ul>
                                </div>

                                <div id="promoted">
                                    <h1>Promoted</h1>
                                    <div className="sprt"></div>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className={(platform.toUpperCase() == "XBOX") ? "active" : undefined} onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
                        <Link to='/Xbox'>
                            <img src="./icons/xbox.png" alt="Xbox" />
                            <p>XBOX</p>

                            <div id="menu">
                                <div style={{backgroundImage: 'url(./gift_cards/xbox.jpg)'}} id="card"></div>

                                <div id="tabs">
                                    <h1>Xbox</h1>
                                    <div className="sprt"></div>

                                    <ul>
                                        <li className="active">Promoted</li>
                                        <li>Bestsellers</li>
                                        <li>Xbox Subscriptions</li>
                                        
                                        <Link to='/game-list/Xbox'>
                                            <li>Xbox Games</li>
                                        </Link>
                                    </ul>
                                </div>

                                <div id="promoted">
                                    <h1>Promoted</h1>
                                    <div className="sprt"></div>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className={(platform.toUpperCase() == "NINTENDO") ? "active" : undefined} onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
                        <Link to='/Nintendo'>
                            <img src="./icons/switch.png" alt="Nintendo" />
                            <p>NINTENDO</p>

                            <div id="menu">
                                <div style={{backgroundImage: 'url(./gift_cards/nintendo.jpg)'}} id="card"></div>

                                <div id="tabs">
                                    <h1>Nintendo</h1>
                                    <div className="sprt"></div>

                                    <ul>
                                        <li className="active">Promoted</li>
                                        <li>Bestsellers</li>
                                        <li>Nintendo Subscriptions</li>
                                        
                                        <Link to='/game-list/Nintendo'>
                                            <li>Nintendo Games</li>
                                        </Link>
                                    </ul>
                                </div>

                                <div id="promoted">
                                    <h1>Promoted</h1>
                                    <div className="sprt"></div>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <img src="./icons/gift_card.png" alt="Gift Cards" />
                        <p>GIFT CARDS</p>
                    </li>

                    <li>
                        <img src="./icons/software.png" alt="Software" />
                        <p>SOFTWARE</p>
                    </li>

                    <li>
                        <img src="./icons/support.png" alt="Support" />
                        <p>SUPPORT</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownMenu;