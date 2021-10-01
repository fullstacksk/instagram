import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions';
const Comment = ({ route, users, fetchUsersData }) => {
	const [ comments, setComments ] = useState([]);
	const [ postId, setPostId ] = useState('');
	const [ text, setText ] = useState('');

	useEffect(
		() => {
			function matchUserToComment(comments) {
				comments.forEach((comment) => {
					if (comment.hasOwnProperty('user')) {
						return;
					}
					const user = users.find((user) => user.uid === comment.creater);
					if (user == undefined) {
						fetchUsersData(comment.creater, false);
					} else {
						comment.user = user;
					}
				});
				setComments(comments);
			}
			if (route.params.postId !== postId) {
				firebase
					.firestore()
					.collection('posts')
					.doc(route.params.uid)
					.collection('userPosts')
					.doc(route.params.postId)
					.collection('comments')
					.get()
					.then((snapshot) => {
						let comments = snapshot.docs.map((doc) => {
							const data = doc.data();
							const id = doc.id;
							return { id, ...data };
						});
						matchUserToComment(comments);
					});
				setPostId(route.params.postId);
			} else {
				matchUserToComment(comments);
			}
			console.log('comments : ', comments);
		},
		[ route.params.postId, users ]
	);
	const onComment = () => {
		firebase
			.firestore()
			.collection('posts')
			.doc(route.params.uid)
			.collection('userPosts')
			.doc(route.params.postId)
			.collection('comments')
			.add({
				creater: firebase.auth().currentUser.uid,
				text
			});
	};
	return (
		<View style={styles.container}>
			<View style={styles.commentContainer}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={comments}
					renderItem={({ item }) => {
						console.log(item);
						return (
							<View>
								<Text style={styles.userName}>{item?.user?.name}</Text>
								<Text style={styles.comment}>{item.text}</Text>
							</View>
						);
					}}
				/>
				{comments.length === 0 && <Text style={styles.textCenter}>No comments Yet</Text>}
			</View>
			<View style={styles.doComment}>
				<TextInput style={styles.textInput} placeholder="comment..." onChangeText={(text) => setText(text)} />

				<TouchableOpacity style={styles.commentButton} onPress={onComment}>
					Comment
				</TouchableOpacity>
			</View>
		</View>
	);
};

const mapStateToProps = (store) => ({
	users: store.usersState.users
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	commentContainer: {
		flex: 1
	},
	textCenter: {
		padding: 16,
		fontWeight: '600',
		textAlign: 'center'
	},
	userName: {
		padding: 8,
		fontWeight: '600'
	},
	comment: {
		padding: 16,
		backgroundColor: '#d3a1a1',
		marginBottom: 16
	},
	textInput: {
		padding: 12,
		borderWidth: 2,
		borderColor: 'blue',
		borderBottomLeftRadius: 8,
		borderTopLeftRadius: 8,
		width: '80%'
	},
	doComment: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	commentButton: {
		padding: 13,
		backgroundColor: 'purple',
		color: '#fff',
		fontWeight: '600',
		borderWidth: 2,
		borderColor: 'blue'
	}
});
