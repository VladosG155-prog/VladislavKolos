import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../components/CartItem';

class Cart extends React.Component {
	getTotalPrice(cart, selectedCurrency) {
		const totalPrice = cart.reduce((acc, curr) => {
			const price = curr.prices.find((i) => i.currency.symbol === selectedCurrency);
			acc += curr.count * price.amount;
			return acc;
		}, 0);
		return Math.round(totalPrice * 100) / 100;
	}
	render() {
		return (
			<div className="container">
				<div className="cart__wrap">
					<h1>Cart</h1>
					{this.props.items.map((item, index) => (
						<CartItem key={item.id} {...item} />
					))}
					<div className="cart__info--block" style={{ marginTop: '30px' }}>
						<h2>Tax 21%:</h2>
						<b>
							{this.props.currency.symbol}{' '}
							{this.getTotalPrice(this.props.items, this.props.currency.symbol) * 0.21}
						</b>
					</div>
					<div className="cart__info--block">
						<h2>Total:</h2>
						<b>
							{this.props.currency.symbol}{' '}
							{this.getTotalPrice(this.props.items, this.props.currency.symbol)}
						</b>
					</div>
					<div className="cart__info--block">
						<h2>Quantity:</h2>
						<b>{this.props.cartCount}</b>
					</div>
					<button className="add-to-cart btn-order">ORDER</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.cart.items,
		cartCount: state.cart.cartCount,
		currency: state.header.currency,
	};
};

export default connect(mapStateToProps)(Cart);
