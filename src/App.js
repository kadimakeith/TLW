import Navbar from './components/navbar';
import Footer from './components/footer';
//import ChatWidget from './components/chatWidget';
import Home from './pages/home';
import AboutUs from './components/Aboutus';
import LandingPage from './components/LandingPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/timelock" element={<Home />} />
        </Routes>
        {/*<ChatWidget />  */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
