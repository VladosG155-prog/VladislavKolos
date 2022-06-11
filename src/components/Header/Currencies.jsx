import React from 'react';
import { client } from '../../apolloClient/client';
import { getCurrencies } from '../../apolloClient/queryies';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/slices/headerSlice';
class Currencies extends React.Component {
	constructor() {
		super();
		this.state = {
			currencieValues: [],
			isOpen: false,
		};
		this.myRef = React.createRef();
		this.onToggleSelect = this.onToggleSelect.bind(this);
		this.onSelectItem = this.onSelectItem.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', (event) => {
			if (!event.composedPath().includes(this.myRef.current)) {
				this.setState({ isOpen: false });
			}
		});
		this.getCurrencies();
	}

	async getCurrencies() {
		const res = await client.query({
			query: getCurrencies,
		});
		this.setState({
			currencieValues: res.data.currencies,
		});
	}

	onToggleSelect() {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	}

	onSelectItem(item) {
		this.props.changeCurrency(item);
		this.setState({ isOpen: false });
	}

	render() {
		return (
			<div className="header__currencies" ref={this.myRef}>
				<div className="header__currencies--visible" onClick={this.onToggleSelect}>
					<span>{this.props.currency.symbol}</span>
					<svg
						width="8"
						height="4"
						viewBox="0 0 8 4"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1 0.5L4 3.5L7 0.5"
							stroke="black"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				{this.state.isOpen && (
					<div className="header__currencies--open">
						{this.state.currencieValues.map((item) => (
							<span
								className={item.label === this.props.currency.label ? 'active' : ''}
								onClick={() => this.onSelectItem(item)}
								key={item.symbol}>
								{item.symbol} {item.label}
							</span>
						))}
					</div>
				)}
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
		changeCurrency: (payload) => dispatch(changeCurrency(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
