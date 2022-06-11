import React from 'react';
import { connect } from 'react-redux';
import { ItemCartAttributes } from '../ItemAttributes';
import { addItemCount, removeItemCount } from '../../redux/slices/cartSlice';
import CartItemSlider from './CartItemSlider';
class CartItem extends React.Component {
	render() {
		const obj = this.props;
		const { prices } = obj;
		const { symbol } = this.props.currency;
		const [{ amount }] = prices ? prices.filter((item) => item.currency.symbol === symbol) : '';
		return (
			<div className="cartItem">
				<div className="product-info cartProduct-info">
					<h2>{obj.brand}</h2>
					<h4>{obj.name}</h4>
					<p className="paragraph-bold">PRICE:</p>
					<h5>
						{symbol} {amount}
					</h5>

					<ItemCartAttributes attr={obj.attributes} params={obj.params} />
				</div>
				<div className="cartItem-other">
					<div className="counter-menu">
						<svg
							onClick={() => this.props.addItemCount({ id: obj.id })}
							width="45"
							height="45"
							viewBox="0 0 45 45"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M22.5 15V30" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M15 23H30" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round" />
							<rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
						</svg>

						{obj.count}
						<svg
							onClick={() => this.props.removeItemCount({ id: obj.id })}
							width="45"
							height="45"
							viewBox="0 0 45 45"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M15 22.5H30" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round" />
							<rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
						</svg>
					</div>
					<CartItemSlider gallery={obj.gallery} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currency: state.header.currency,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addItemCount: (payload) => dispatch(addItemCount(payload)),
		removeItemCount: (payload) => dispatch(removeItemCount(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
