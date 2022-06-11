import React from 'react';
import { client } from '../../apolloClient/client';
import { getCategories } from '../../apolloClient/queryies';
import { connect } from 'react-redux';
import { changeCategory } from '../../redux/slices/headerSlice';
class Categories extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: [],
		};
	}
	componentDidMount() {
		this.getCategories();
	}
	async getCategories() {
		const res = await client.query({
			query: getCategories,
		});
		this.setState({ categories: res.data.categories });
	}
	changeCategory(category) {
		this.props.changeCategoryFunc(category);
	}

	render() {
		return (
			<div className="categories">
				{this.state.categories.map((item, index) => (
					<span
						onClick={() => this.changeCategory(item.name)}
						className={item.name === this.props.activeCategory ? 'active' : ''}
						key={item.name}>
						{item.name}
					</span>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeCategory: state.header.category,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		changeCategoryFunc: (payload) => dispatch(changeCategory(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
