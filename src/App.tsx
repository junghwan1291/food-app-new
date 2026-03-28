import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Category from './pages/Category';
import Market from './pages/Market';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full bg-[#F1E8D9]">
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/market" element={<Market />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
