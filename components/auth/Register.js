import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		};
		this.onSignUp = this.onSignUp.bind(this);
	}
	async onSignUp() {
		const { email, password, name } = this.state;
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, password);
			await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
				name,
				email
			});
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
					placeholder="Name"
					onChangeText={(name) => this.setState({ name })}
				/>
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
					<Button onPress={() => this.onSignUp()} title="Sign Up" />
				</View>
				<View style={{ flex: 1, flexDirection: 'row', marginTop: '2rem' }}>
					<Text>Already have an account? </Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>Sign In</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Register;
const styles = StyleSheet.create({
	textInput: {
		padding: '12px',
		marginBottom: '16px',
		border: '2px solid blue',
		borderRadius: '8px',
		width: '80%'
	},
	container: {
		display: 'flex',
		height: '100vh',
		width: '100vw',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	titleText: {
		fontSize: 24,
		fontWeight: 800,
		marginBottom: '24px',
		color: 'purple'
	}
});