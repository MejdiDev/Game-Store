import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import ProductPage from './pages/ProductPage';
import NotFoundPage from "./pages/NotFoundPage";
import SearchResultPage from './pages/SearchResultsPage';
import CriGameList from './pages/CriGameList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/PC" />} />

        <Route exact path="/:platform" element={<LandingPage />} />
        <Route exact path="/product/:platform/:product_id" element={<ProductPage />} />

        <Route exact path="/search/:query" element={<SearchResultPage />} />
        <Route exact path="/game-list/:platform" element={<CriGameList />} />

        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default App;