import GameListPage from "./utils/GameListPage";
import { useParams } from "react-router-dom";

import games from "../data/games.json";

const SearchResultsPage = () => {
    const { query } = useParams();

    return (
        <GameListPage 
            platform=""
            pageTitle={ "Search Results for " + decodeURIComponent(query) + " :" }
            games={
                games.filter(game => game.title.toUpperCase().includes(
                    decodeURIComponent(query).toUpperCase()
                ))
            }
        />
    );
}

export default SearchResultsPage;