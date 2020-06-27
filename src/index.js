import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCSCsBSFRv8HnoDFeRg7WtpCv7gBvjreW4',
	authDomain: 'cart-274e5.firebaseapp.com',
	databaseURL: 'https://cart-274e5.firebaseio.com',
	projectId: 'cart-274e5',
	storageBucket: 'cart-274e5.appspot.com',
	messagingSenderId: '246710121263',
	appId: '1:246710121263:web:a53e643f38535f9048e7da'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
