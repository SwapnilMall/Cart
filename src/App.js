import React from 'react';
import './index.css';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
			loading: true
		};
	}

	componentDidMount() {
		// firebase.firestore().collection('products').get().then((snapshot) => {
		// 	const products = snapshot.docs.map((doc) => {
		// 		const data = doc.data();
		// 		data['id'] = doc.id;
		// 		return data;
		// 	});
		// 	this.setState({ products: products, loading: false });
		// });
		firebase
			.firestore()
			.collection('products') // .where('price', '>=', 99)
			.orderBy('price', 'asc')
			.onSnapshot((snapshot) => {
				const products = snapshot.docs.map((doc) => {
					const data = doc.data();
					data['id'] = doc.id;
					return data;
				});
				this.setState({ products: products, loading: false });
			});
	}

	handleIncreaseQuantity = (product) => {
		const { products } = this.state;
		const index = products.indexOf(product);

		const docRef = firebase.firestore().collection('products').doc(products[index].id);

		docRef
			.update({
				qty: products[index].qty + 1
			})
			.then(() => {
				console.log('updated');
			})
			.catch((err) => {
				console.log('Error in updating');
			});
	};

	handleDecreaseQuantity = (product) => {
		const { products } = this.state;
		const index = products.indexOf(product);

		const docRef = firebase.firestore().collection('products').doc(products[index].id);

		if (products[index].qty === 0) return;

		docRef
			.update({
				qty: products[index].qty - 1
			})
			.then(() => {
				console.log('removed product');
			})
			.catch((err) => {
				console.log('error in removing a product');
			});
	};

	handleDeleteProduct = (id) => {
		const { products } = this.state;

		const docRef = firebase.firestore().collection('products').doc(id);

		docRef
			.delete()
			.then(() => {
				console.log('successfully deleted');
			})
			.catch((err) => {
				console.log('error in deleting');
			});
	};

	getcountOfCartItems = () => {
		const { products } = this.state;
		let count = 0;

		products.forEach((product) => {
			count += product.qty;
		});

		return count;
	};

	getcartTotal = () => {
		const { products } = this.state;
		let cartTotal = 0;

		products.map((product) => {
			if (product.qty > 0) {
				cartTotal = cartTotal + product.qty * product.price;
			}
			return '';
		});

		return cartTotal;
	};

	addProduct = () => {
		firebase
			.firestore()
			.collection('products')
			.add({
				img: '',
				price: 1200,
				qty: 1,
				title: 'washing Machine'
			})
			.then((docRef) => {
				console.log('Product has been added ', docRef);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { products, loading } = this.state;
		return (
			<div className="App">
				<Navbar count={this.getcountOfCartItems()} />
				<Cart
					onIncreaseQuantity={this.handleIncreaseQuantity}
					onDecreaseQuantity={this.handleDecreaseQuantity}
					onDeleteProduct={this.handleDeleteProduct}
					products={products}
				/>
				{loading && <h1>Loading Products...</h1>}
				<div style={{ padding: 10, fontSize: 20 }}>TOTAL : {this.getcartTotal()}</div>
			</div>
		);
	}
}

export default App;
