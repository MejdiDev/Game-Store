import "../styles/css/dropdownMenu.css";

const DropdownMenu = () => {
    const showTab = () => {
        document.getElementById('overlay_dropdown').style.display = "block";
        document.getElementById('overlay_dropdown').style.opacity = "0.8";
    }

    const hideTab = () => {
        document.getElementById('overlay_dropdown').style.opacity = "0";
        document.getElementById('overlay_dropdown').style.display = "none";
    }

    return (
        <div id="drop_menu_wrapper">
            <div id="drop_menu">
                <ul className="main">
                    <li onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
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
                                    <li>PC Games</li>
                                </ul>
                            </div>

                            <div id="promoted">
                                <h1>Promoted</h1>
                                <div className="sprt"></div>
                            </div>
                        </div>
                    </li>

                    <li className="active" onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
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
                                    <li>Playstation Games</li>
                                </ul>
                            </div>

                            <div id="promoted">
                                <h1>Promoted</h1>
                                <div className="sprt"></div>
                            </div>
                        </div>
                    </li>

                    <li onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
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
                                    <li>Xbox Games</li>
                                </ul>
                            </div>

                            <div id="promoted">
                                <h1>Promoted</h1>
                                <div className="sprt"></div>
                            </div>
                        </div>
                    </li>

                    <li onMouseOver={() => showTab()} onMouseLeave={() => hideTab()}>
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
                                    <li>Nintendo Games</li>
                                </ul>
                            </div>

                            <div id="promoted">
                                <h1>Promoted</h1>
                                <div className="sprt"></div>
                            </div>
                        </div>
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