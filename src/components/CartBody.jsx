import "../styles/css/cartBody.css";
import faved_games from "../data/faved_games.json";

const CartBody = () => {
    return (
        <section id="cart_body">
            <div id="row_wrapper">
                <div id="games_list">
                    <h3>Your cart</h3>

                    {
                        faved_games.map((game, idx) =>
                            <div className="cart_game" key={`cart-game-${idx}`}>
                                <div id="cover" style={{backgroundImage: `url('./game_covers/${game.cover}')`}}></div>
                                
                                <div id="content_wrapper">
                                    <button id="cross">
                                        <img src="./icons/cross.png" alt="Close" />
                                    </button>

                                    <div id="top">
                                        <p>{game.title}</p>

                                        <div className="game_price_wrapper">
                                            {
                                                game.is_discounted ?
                                                    <h3 id="discount_price">€ { game.new_price }</h3>
                                                :
                                                    <h3 id="original_price">€ { game.price }</h3>
                                            }
                                        </div>
                                    </div>

                                    <div id="bottom">
                                        <div id="qte_control_wrapper">
                                            <button>-</button>
                                            <p>2</p>
                                            <button>+</button>
                                        </div>

                                        <div id="total_price_wrapper">
                                            <p>Total: </p>
                                            <p>523$</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div id="checkout_component">
                    <h3>Your order</h3>
                    <button>Checkout</button>

                    <div id="checkout_total_wrapper">
                        <h3>Total: </h3>
                        <h3>486$</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CartBody;