import GameListPage from "./utils/GameListPage";
import { useParams } from "react-router-dom";

import games from "../data/games.json";

const CriGameList = () => {
    const { platform } = useParams();
    
    return (
        <GameListPage
            platform={ platform }
            pageTitle={ "Best Games for " + platform + " :" }
            games={
                games.filter(game => 
                    game.platforms.includes( platform )
                )
            }
        />
    );
}

export default CriGameList;