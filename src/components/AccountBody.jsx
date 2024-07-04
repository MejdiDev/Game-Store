import { useEffect, useState } from "react";
import "../styles/css/accountBody.css";

import { useLocation, useNavigate } from "react-router-dom";
import { myOrders } from "../data/api";
import { getWishlist } from "../data/handle_wishList";

import GameCard from "../utils/GameCard";
import { Link } from "react-router-dom";
import { myWishList, myProfile } from "../data/api";
import { checkIsLoggedIn, getToken } from "../utils/cookie";
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;


    return `${formattedDay}/${formattedMonth}/${year}`;
};
const OrderCard = ({ order, order_idx }) => {

    const navigate = useNavigate()

    return (
        <div className="order_card">
            <div id="top">
                <div>
                    <p>Date</p>
                    <p>{formatDate(order.createdAt)}</p>
                </div>

                <div>
                    <p>Order Num</p>
                    <p>{order._id}</p>
                </div>

                <div>
                    <p>Status</p>
                    <p>Completed</p>
                </div>

                <div>
                    <p>Total Cost</p>
                    <p>{order.total}</p>
                </div>
            </div>

            <div id="body">
                {

                    order.products.map((product, i) =>
                        <div onClick={() => navigate(`/product/PC/${product.id}`)} className="order_product_card">
                            <div key={i} id="cover" style={{ backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/${product.product.mainImage.replace('\\', '/')}` }}></div>
                            <p>{product.product.productName}</p>


                            <p>{product.qte}</p>

                            <div key={i} className="game_price_wrapper">
                                {product.product.is_discounted && <h3 id="discount_price">€ {product.product.new_price}</h3>}
                                <h3 id="original_price">€ {product.product.price}</h3>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

const InfoTab = () => {
    const [profile, setProfile] = useState({});
    const getMyProfile = async () => {
        const data = await myProfile();
        console.log(data);
        setProfile(data);

    }

    useEffect(() => {
        getMyProfile();
        console.log(checkIsLoggedIn());
    }, []);
    return (
        <div className="tab_wrapper" id="info_tab">
            <h1>Personal Information</h1>
            <div className="seperation"><span></span></div>

            <div id="avatar" style={{ backgroundImage: `url('./avatar.jpg')` }}></div>

            <div id="body">
                <div className="input_grp">
                    <div>
                        <label>Username</label>
                        <input type="text" value={profile?.username} />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input type="text" value={profile?.lastname} />
                    </div>

                    <div>
                        <label>E-mail</label>
                        <input type="email" value={profile?.email} />
                    </div>
                </div>

                <h1>Change Password</h1>

                <div className="input_grp">
                    <div>
                        <label>Old Password</label>
                        <input type="password" placeholder="Password" />
                    </div>

                    <div>
                        <label>New Password</label>
                        <input type="password" placeholder="Password" />
                    </div>

                    <div>
                        <label>Repeat New Password</label>
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const OrdersTab = () => {
    const [orders, setOrders] = useState(null);
    const getMyOrders = async () => {
        const data = await myOrders();
        setOrders(data)
    }
    useEffect(() => {
        getMyOrders();
    }, []);
    return (
        <div className="tab_wrapper" id="orders_tab">
            <h1>Orders</h1>
            <div className="seperation"><span></span></div>

            <div id="orders_wrapper">

                {orders && orders.length > 0 ? (
                    orders.map(order => <OrderCard key={order.id} order={order} />)
                ) : (
                    <p>no orders yet</p>
                )}

            </div>
        </div>
    );
}

const FavsTab = () => {
    const [wishlist, setWishList] = useState(getWishlist());

    useEffect(() => {
        wishlist.forEach(el => console.log(el))
    }, [])

    return (
        <div className="tab_wrapper" id="favs_tab">
            <h1>Wish List</h1>
            <div className="seperation"><span></span></div>

            <div id="game_grid">
                {wishlist && wishlist.length > 0 ? (
                    wishlist.map((game, idx) => (

                        <GameCard isWishList={ true } game={game} idx={`gameCard-${idx}`} key={idx} plateform={game.platform} />
                    ))
                ) : (
                    <p>No WishList items</p>
                )}
            </div>

        </div>
    );
}

const AccountBody = ({ param_tab }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [tab, setTab] = useState(param_tab);

    const handleTabChange = p_tab => {
        setTab(p_tab)
        if (!(location.pathname.includes('/account/' + p_tab))) navigate('/account/' + p_tab)

        let x = 0;
        switch (p_tab) {
            case "orders":
                x = 1
                break;

            case "favs":
                x = 2
                break;
        }

        document.querySelector("#navigator #bg").style.top = String(15 + x * 50) + "px"
    }

    const dispTab = () => {
        switch (tab) {
            case "info":
                return <InfoTab />

            case "orders":
                return <OrdersTab />

            case "favs":
                return <FavsTab />
        }
    }

    useEffect(() => {
        handleTabChange(param_tab)
    }, [param_tab])

    const deleteTokenCookie = () => {
        document.querySelector("#navigator #bg").style.top = "165px"
        // Set the expiry date of the cookie to the past
        document.cookie = 'tk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/home');
        window.location.reload();

    }


    return (
        <section id="account_body">
            <h1>My Account</h1>

            <div id="row_wrapper">
                <div id="navigator">
                    <div id="bg"></div>

                    <div onClick={() => handleTabChange("info")} className="tab_wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 32 32" width="256" height="256"><path d="M29.051 29.999 29 30H3a1 1 0 0 1-1-1v-2a9 9 0 0 1 9-9h10a9 9 0 0 1 9 9v2l-.001.051-.004.051-.007.05-.008.049-.012.049-.013.047-.016.047-.018.045-.02.044-.022.043-.024.042-.026.041-.028.039-.029.038-.032.036-.033.035-.035.033-.036.032-.038.029-.039.028-.041.026-.042.024-.043.022-.044.02-.045.018-.047.016-.047.013-.049.012-.049.008-.05.007-.051.004zM28 28v-1a7 7 0 0 0-7-7H11a7 7 0 0 0-7 7v1h24zM16 2c-3.863 0-7 3.137-7 7s3.137 7 7 7 7-3.137 7-7-3.137-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" fill="#fff" className="color000 svgShape"></path></svg>
                        <p>My Profile</p>
                    </div>

                    <div onClick={() => handleTabChange("orders")} className="tab_wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="256" height="256"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" fill="#fff" className="color000 svgShape"></path></svg>
                        <p>Orders</p>
                    </div>

                    <div onClick={() => handleTabChange("favs")} className="tab_wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" fill="#fff" className="color000 svgShape"></path></svg>
                        <p>Wishlist</p>
                    </div>

                    <div onClick={deleteTokenCookie} className="tab_wrapper">
                        <img src="./icons/logout.png" alt="Logout" />
                        <p>Logout</p>
                    </div>
                </div>

                <div id="content_wrapper">
                    {dispTab()}
                </div>
            </div>
        </section>
    );
}

export default AccountBody;