import React from 'react';
import { connect } from 'react-redux';
import { client } from '../apolloClient/client';
import { getProductById } from '../apolloClient/queryies';
import { ItemAttributes } from '../components/ItemAttributes';
import { addToCart } from '../redux/slices/cartSlice';
class ProductPage extends React.Component {
	constructor() {
		super();
		this.state = {
			item: {},
			amount: '',
			params: {},
		};
		this.getAttributes = this.getAttributes.bind(this);
		this.addItemToCart = this.addItemToCart.bind(this);
	}
	componentDidMount() {
		this.getItem();
	}

	async getItem() {
		const url = window.location.pathname.replace('/product/', '');
		const res = await client.query({
			query: getProductById,
			variables: {
				id: url,
			},
		});
		this.setState({
			item: res.data.product,
		});
	}

	getAttributes(name, value) {
		this.setState({ params: { ...this.state.params, [name]: value } });
	}

	addItemToCart() {
		let newId = this.state.item.id;
		if (Object.keys(this.state.params).length === this.state.item.attributes.length) {
			newId += '-' + Object.entries(this.state.params).flat().sort().join('-').replace(/\s+/g, '');
			const obj = { ...this.state.item, id: newId, params: this.state.params, count: 1 };
			this.props.addToCart(obj);
		} else {
			alert('Please select attributes');
		}
	}

	render() {
		const obj = this.state.item;
		const { gallery, prices } = obj;
		const { symbol } = this.props.currency;
		const [price] = prices ? prices.filter((item) => item.currency.symbol === symbol) : '';
		console.log(obj);
		return (
			<div className="container">
				<div className="productPage__wrap">
					<div className="productPage__slider">
						<div className="productPage__slider--other">
							{gallery && gallery.length > 1
								? gallery.map((item, index) => <img src={item} key={index} alt="images" />)
								: null}
						</div>
						<div className="productPage__slider--main">
							<img src={gallery ? gallery[0] : ''} alt="images" />
						</div>
					</div>
					<div className="product-info">
						<h2>{obj.brand}</h2>
						<h4>{obj.name}</h4>
						<p className="paragraph-bold">PRICE:</p>
						<h5>
							{symbol} {price ? price.amount : null}
						</h5>
						<ItemAttributes
							getAttributes={(name, value) => this.getAttributes(name, value)}
							attr={this.state.item.attributes}
							params={this.state.params}
						/>
						<button className="add-to-cart" onClick={this.addItemToCart}>
							ADD TO CART
						</button>
						<p dangerouslySetInnerHTML={{ __html: obj.description }}></p>
					</div>
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
		addToCart: (payload) => dispatch(addToCart(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
