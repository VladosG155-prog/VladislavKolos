import React from 'react';

class CartItemSlider extends React.Component {
	constructor() {
		super();
		this.state = {
			activeGallery: 0,
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.prevSlide = this.prevSlide.bind(this);
	}

	nextSlide() {
		const lenGallery = this.props.gallery.length - 1;
		this.state.activeGallery === lenGallery
			? this.setState({ activeGallery: 0 })
			: this.setState((prevState) => ({
					activeGallery: (prevState.activeGallery += 1),
			  }));
	}
	prevSlide() {
		this.state.activeGallery <= 0
			? this.setState({ activeGallery: this.props.gallery.length - 1 })
			: this.setState((prevState) => ({
					activeGallery: (prevState.activeGallery -= 1),
			  }));
	}

	render() {
		return (
			<div className="slider">
				<img src={this.props.gallery[this.state.activeGallery]} alt="images" />
				{this.props.gallery.length > 1 && (
					<div className="slider-menu">
						<svg
							onClick={this.prevSlide}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<rect
								width="24"
								height="24"
								transform="matrix(-1 0 0 1 24 0)"
								fill="black"
								fillOpacity="0.73"
							/>
							<path
								d="M9.75 6.06808L15.375 11.6871L9.75 17.3062"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<svg
							onClick={this.nextSlide}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<rect
								width="24"
								height="24"
								transform="matrix(-1 0 0 1 24 0)"
								fill="black"
								fillOpacity="0.73"
							/>
							<path
								d="M9.75 6.06808L15.375 11.6871L9.75 17.3062"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				)}
			</div>
		);
	}
}

export default CartItemSlider;
