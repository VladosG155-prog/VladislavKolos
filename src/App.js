import React from 'react';
import './styles/style.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</div>
		);
	}
}

export default App;
