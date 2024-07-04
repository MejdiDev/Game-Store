import { Link } from "react-router-dom";
import "../styles/css/sgtGame.css";

const SgtGame = ({ game, hideSep }) => {

    return (
        <article className="sgt_game">
            <Link to='/my-cart'>
                <div id="content">
                    <div id="img" style={{backgroundImage: `url('${game.cover}')`}}></div>

                    <div id="text">
                        <p>{ game.title }</p>
                        
                        <div className="game_price_wrapper">
                            {game?.is_discounted && <h3 id="discount_price">€ {game?.new_price}</h3>}
                            <h3 id="original_price">€ {game?.price}</h3>
                        </div>
                    </div>
                </div>

                { !hideSep && <div className="seperation"><span></span></div> }
            </Link>
        </article>
    );
}

export default SgtGame;