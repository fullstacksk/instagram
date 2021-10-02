import React, { useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import { TextInput } from 'react-native-paper';

const Save = (props) => {
	const uri = props.route.params.image;
	const [ caption, setCaption ] = useState(null);
	const uploadImage = async () => {
		const childPath = `posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
		const res = await fetch(uri);
		const blob = await res.blob();
		const task = firebase.storage().ref().child(childPath).put(blob);
		const taskProgess = (snapshot) => {
			console.log(`transferred : ${snapshot.bytesTransferred} `);
		};
		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				console.log(snapshot);
				savePostData(snapshot);
			});
		};
		const taskError = (snapshot) => {
			console.log(snapshot);
		};
		task.on('state_changed', taskProgess, taskError, taskCompleted);
	};
	const savePostData = (downlaodURL) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(firebase.auth().currentUser.uid)
			.collection('userPosts')
			.add({
				downlaodURL,
				likesCount: 0,
				commentCount: 0,
				caption,
				createdAt: firebase.firestore.FieldValue.serverTimestamp()
			})
			.then(() => {
				props.navigation.popToTop();
			});
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri }} style={{ flex: 1 }} />
			<TextInput style={styles.textInput} placeholder="Caption" onChangeText={(caption) => setCaption(caption)} />
			<Button title="Save" onPress={() => uploadImage()} />
		</View>
	);
};

export default Save;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
		padding: 12,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: 'blue',
		borderRadius: 8,
		width: '80%'
	}
});
