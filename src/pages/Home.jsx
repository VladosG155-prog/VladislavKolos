import React from 'react';
import { connect } from 'react-redux';
import { client } from '../apolloClient/client';
import { getItemsByCategory } from '../apolloClient/queryies';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';
class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			items: [],
		};
	}
	componentDidMount() {
		this.getItems();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.activeCategory !== this.props.activeCategory) {
			this.getItems();
		}
	}
	async getItems() {
		const res = await client.query({
			query: getItemsByCategory,
			variables: {
				title: this.props.activeCategory,
			},
		});
		this.setState({ items: res.data.category.products });
	}

	render() {
		return (
			<div className="home">
				<div className="container">
					<h1>{this.props.activeCategory}</h1>
					<div className="categories__items--wrap">
						{this.state.items.map((item) => (
							<Link key={item.id} className="product-link" to={`/product/${item.id}`}>
								<ProductItem {...item} />
							</Link>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeCategory: state.header.category,
	};
};

export default connect(mapStateToProps)(Home);
