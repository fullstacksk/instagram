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
				<View style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
					<Text>Already have an account? </Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
						<Text>Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Register;
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
