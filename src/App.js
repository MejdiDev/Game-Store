import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import ProductPage from './pages/ProductPage';

import SearchResultPage from './pages/SearchResultsPage';
import CriGameList from './pages/CriGameList';

import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import BlogListPage from './pages/BlogListPage';

import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

import NotFoundPage from "./pages/NotFoundPage";
import GuideBody from './components/GuideBody';

import SoftwaresList from './pages/SoftwaresList';
import SoftwarePage from './pages/SoftwarePage';
import BlogPostPage from './pages/BlogPostPage';

import { useEffect, useMemo, useState } from 'react';
import { myIpAdress, blockeds, blockedsCountries } from './data/api';
import SuccesPage from './pages/SuccesPage';
import { checkIsLoggedIn } from './utils/cookie';
import ResetPage from './pages/ResetPage';


import SuccessPage from './pages/SuccessPage';

const App = () => {
  console.log('okkkkkkkkk');
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [blockedCountries, setBlockedCountries] = useState([]);
  const auth = checkIsLoggedIn();
  const [userIP, setUserIP] = useState({});

  const getIp = async () => {
    const response = await myIpAdress();
    console.log(response);
    setUserIP(response);
  }
  const getBlocked = async () => {
    const response = await blockeds();
    console.log(response);
    setBlockedIPs(response);
  }

  const getBlockedCountries = async () => {
    const response = await blockedsCountries();
    console.log(response);
    setBlockedCountries(response);
  }

  useEffect(() => {
    getBlocked();
    getBlockedCountries();
    getIp();

  }, []);

  const isBlockedIP = useMemo(() => {
    //blockedIPs?.includes(userIP.ip)
    return false;
  }, [blockedIPs, userIP]);

  const isBlockedCountry = useMemo(() => {
    //blockedCountries?.includes(userIP.cc)
    return false;
  }, [blockedCountries, userIP]);
  return (
    <Router>
      <Routes>


        {blockedIPs?.length === 0 && blockedCountries?.length === 0 && (

          isBlockedCountry ? (
            <Route path='*' element={<NotFoundPage message={'500 Country not allowed'} />} />
          ) : (
            isBlockedIP ? (
              <Route path='*' element={<NotFoundPage message={'500 IP not allowed'} />} />
            ) :
              (
                <><>
                  <Route exact path="/" element={<Navigate to="/home" />} />
                  <Route exact path="/softwares" element={<SoftwaresList />} />
                  <Route exact path="/home" element={<LandingPage />} />

                  <Route exact path="/product/:name" element={<ProductPage />} />
                  <Route exact path="/software/:name" element={<SoftwarePage />} />

                  <Route exact path="/search/:query" element={<SearchResultPage />} />
                  <Route exact path="/game-list/:platform" element={<CriGameList />} />
                  <Route exact path="/about" element={<AboutUsPage />} />
                  <Route exact path="/contact" element={<ContactUsPage />} />


                  <Route exact path="/about" element={<AboutUsPage />} />

                  <Route exact path="/blog" element={<BlogListPage />} />
                  <Route exact path="/blog/:id" element={<BlogPostPage />} />

                  <Route exact path="/account/:tab" element={<AccountPage />} />

                  <Route exact path="/my-cart" element={<CartPage />} />

                  <Route exact path="/auth/:type" element={<LoginPage />} />
                  <Route exact path="/auth/reset/:otp" element={<ResetPage />} />

                  <Route exact path="/auth/verify/:token" element={<SuccesPage />} />
                  <Route exact path="/404" element={<NotFoundPage />} />
                  <Route exact path="/guide" element={<GuideBody />} /></>
                  <Route exact path="/success" element={<SuccessPage />} /></>
              )
          )


        )

        }


      </Routes>
    </Router>
  );
}

export default App;