import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MenuCard from './components/MenuCard';
import Order from './pages/Order';
import Register from './components/Register';
import Login from './components/login';
import ItemsByCategory from './pages/ItemsByCategory';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import { CartContextProvider } from './components/CartContext';

function App() {
  return (
    <BrowserRouter>
 
      <AuthProvider> 
           <CartContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/MenuCard" element={<MenuCard />} />
          <Route path="/itemsbycategory/:categoryId" element={<ItemsByCategory />} />
          <Route path="/order" element={<Order />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </CartContextProvider> 
      </AuthProvider>
     
    </BrowserRouter>
  );
}

export default App;
