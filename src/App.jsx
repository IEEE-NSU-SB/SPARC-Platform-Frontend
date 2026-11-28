import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { IconSprite } from './Icons';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Timeline from './Timeline';
import Speakers from './Speakers';
import Ambassadors from './Ambassadors';
import Contact from './contact';
import Error404 from './Error404';
import ScrollToTop from './ScrollToTop';
import TopScroll from './TopScroll';
import Toast from './Toast';

const App = () => (
  <BrowserRouter>
    <IconSprite />
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/ambassadors" element={<Ambassadors />} />
      <Route path="/contact" element={<Contact />}/>
      <Route path="*" element={<Error404 />} />
    </Routes>
    <Footer />
    <TopScroll />
    <Toast />
  </BrowserRouter>
);

export default App;
