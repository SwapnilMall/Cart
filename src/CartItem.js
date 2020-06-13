import React from 'react';

class CartItem extends React.Component {
	constructor() {
		super();
		this.state = {
			price: 999,
			title: 'Phone',
			qty: 1,
			img: ''
		};
	}
	increaseQuantity = () => {
		this.setState((prevState) => {
			return {
				qty: prevState.qty + 1
			};
		});
	};
	decreaseQuantity = () => {
		// const { qty } = this.state;
		// if (qty === 0) return;
		if (this.state.qty === 0) return;
		this.setState((prevState) => {
			return {
				qty: prevState.qty - 1
			};
		});
	};
	render() {
		const { price, title, qty } = this.state; //object destructering
		return (
			<div className="cart-item">
				<div className="left-block">
					<img style={styles.image} alt="" />
				</div>
				<div className="right-block">
					<div style={{ fontSize: 25 }}>{title}</div>
					<div style={{ color: '#777' }}>Rs {price}</div>
					<div style={{ color: '#777' }}>Qty: {qty}</div>
					<div className="cart-item-actions">
						{/* Buttons */}
						<img
							alt="increase"
							className="action-icons"
							src="https://image.flaticon.com/icons/svg/992/992651.svg"
							onClick={this.increaseQuantity}
						/>
						<img
							alt="decrease"
							className="action-icons"
							src="https://image.flaticon.com/icons/svg/659/659892.svg"
							onClick={this.decreaseQuantity}
						/>
						<img
							alt="delete"
							className="action-icons"
							src="https://image.flaticon.com/icons/svg/1214/1214428.svg"
						/>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	image: {
		height: 110,
		width: 110,
		borderRadius: 4,
		background: '#ccc'
	}
};

export default CartItem;
