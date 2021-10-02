import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import 'firebase/auth';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import Save from './components/main/Save';
import Add from './components/main/Add';
import Comment from './components/main/Comment';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCWYoncB1SxCSR3GT6THAkoDMGeAM2DNJQ',
	authDomain: 'instagram-fullstacksk.firebaseapp.com',
	projectId: 'instagram-fullstacksk',
	storageBucket: 'instagram-fullstacksk.appspot.com',
	messagingSenderId: '971529165207',
	appId: '1:971529165207:web:503d131dfbf4cc462b0cd2'
};

// Initialize Firebase
if (firebase?.apps?.length === 0) firebase.initializeApp(firebaseConfig);
const Stack = createStackNavigator();

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {loaded:false, loggedIn:false}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			console.log('user :' , user )
			if (!user)
				this.setState({ loggedIn: false, loaded: true });
			else
				this.setState({loggedIn:true, loaded:true})
		})
	}
	render() {
		const { loggedIn, loaded } = this.state;
		console.log(this.state);
		if (!loaded) {
			return (
				<View style={styles.container}>
					<Text>Loading...</Text>
				</View>
			);
		}
		if (!loggedIn)
			return (
				<Provider store={store}>
					<NavigationContainer>
					<Stack.Navigator
						initialRouteName= "Login"
						screenOptions={{
							headerStyle: {
								backgroundColor: '#a00728',
							},
							headerTintColor: '#fff',
							headerTitleStyle: {
								fontWeight: 'bold',
							},
						}}
					>
							<Stack.Screen name="Register" component={Register}  />
							<Stack.Screen name="Login" component={Login}  />
						</Stack.Navigator>
					</NavigationContainer>
				</Provider>
	); 
		
		return (
				<Provider store={store}>
					<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Main"
						screenOptions={{
							headerStyle: {
								backgroundColor: '#a00728',
							},
							headerTintColor: '#fff',
							headerTitleStyle: {
								fontWeight: 'bold',
							},
						}}
					>
						<Stack.Screen
							name="Home"
							component={Main}
							options={{ headerShown: false }}

						/>
						<Stack.Screen
							name="Add"
							component={Add}
							options={{ headerShown: false }}
							navigation={this.props.navigation}
						/>
						<Stack.Screen
							name="Save"
							component={Save}
							options={{ headerShown: false }}
							navigation={this.props.navigation}
						/>
						<Stack.Screen
							name="Comment"
							component={Comment}
							// options={{ headerShown: false }}
							navigation={this.props.navigation}
						/>
						</Stack.Navigator>
					</NavigationContainer>
				</Provider>
	);
		
		
	}
}
export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
