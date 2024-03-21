import Nav from "../../components/Nav";
import { MobileNav, hideMobileNav } from '../../components/MobileNav';

import DropdownMenu from "../../components/DropdownMenu";
import Footer from "../../components/Footer";

import GamesList from "../../components/GamesList";


const GameListPage = ({ platform, pageTitle, games }) => {
    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform={platform} />
            
            <GamesList
                platform={platform}
                pageTitle={ pageTitle }
                games={ games }
            />

            {/* <div id="ending"></div> */}

            <Footer />
        </main>
    );
}

export default GameListPage;