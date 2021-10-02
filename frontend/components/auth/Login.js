import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Button, TextInput, StyleSheet, Text, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.onLogin = this.onLogin.bind(this);
	}
	async onLogin() {
		const { email, password } = this.state;
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			await this.props.navigation.navigate('Main');
		} catch (error) {
			console.log('Error', error);
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.titleText}>Instagram</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Email"
					onChangeText={(email) => this.setState({ email })}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					secureTextEntry={true}
					onChangeText={(password) => this.setState({ password })}
				/>
				<View style={{ width: '80%' }}>
					<Button onPress={() => this.onLogin()} title="Sign In" />
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
					<Text>Don't have an account? </Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
						<Text>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;
const styles = StyleSheet.create({
	textInput: {
		padding: 12,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: 'blue',
		borderRadius: 8,
		width: '80%'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	titleText: {
		fontSize: 24,
		fontWeight: '800',
		marginBottom: 24,
		color: 'purple'
	}
});
