import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import ProductPage from './pages/ProductPage';

import SearchResultPage from './pages/SearchResultsPage';
import CriGameList from './pages/CriGameList';

import AboutUsPage from './pages/AboutUsPage';
import BlogListPage from './pages/BlogListPage';

import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

import NotFoundPage from "./pages/NotFoundPage";
import GuideBody from './components/GuideBody';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/PC" />} />

        <Route exact path="/:platform" element={<LandingPage />} />
        <Route exact path="/product/:platform/:product_id" element={<ProductPage />} />

        <Route exact path="/search/:query" element={<SearchResultPage />} />
        <Route exact path="/game-list/:platform" element={<CriGameList />} />
        
        <Route exact path="/about" element={<AboutUsPage />} />
        <Route exact path="/blog" element={<BlogListPage />} />

        <Route exact path="/account/:tab" element={<AccountPage />} />
        <Route exact path="/my-cart" element={<CartPage />} />
        
        <Route exact path="/auth/:type" element={<LoginPage />} />

        <Route exact path="/guide" element={<GuideBody />} />
        
      </Routes>
    </Router>
  );
}

export default App;