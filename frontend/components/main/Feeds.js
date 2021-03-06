import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Post from './Post';
import firebase from 'firebase';
import 'firebase/firestore';

const Feeds = ({ feeds, usersLoaded, userFollowing, navigation, route }) => {
	const [ posts, setPosts ] = useState([]);

	useEffect(
		() => {
			// let posts = [];
			if (usersLoaded === userFollowing.length) {
				// userFollowing.forEach((uid) => {
				// 	const user = users.find((el) => el.uid === uid);
				// 	if (user !== undefined) {
				// 		posts = [ ...posts, ...user.posts ];
				// 	}
				// });
				// posts.sort((x, y) => {
				// 	return x.createdAt - y.createdAT;
				// });
				// setPosts(posts);
				feeds.sort((x, y) => {
					return x.createdAt - y.createdAT;
				});
				setPosts(feeds);
			}
			console.log('feeds', feeds);
		},
		[ usersLoaded, feeds ]
	);

	const onLike = (uid, postId) => {
		console.log('onLike : ', uid, postId);
		firebase
			.firestore()
			.collection('posts')
			.doc(uid)
			.collection('userPosts')
			.doc(postId)
			.collection('likes')
			.doc(firebase.auth().currentUser.uid)
			.set({});
	};
	const onDislike = (uid, postId) => {
		console.log('onDislike : ', uid, postId);
		firebase
			.firestore()
			.collection('posts')
			.doc(uid)
			.collection('userPosts')
			.doc(postId)
			.collection('likes')
			.doc(firebase.auth().currentUser.uid)
			.delete();
	};
	// if (user === null) return <View />;
	return (
		<View style={styles.container}>
			{!posts.length && <Text style={styles.textCenter}>Follow People for feeds</Text>}
			<View style={styles.container}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={posts}
					renderItem={({ item }) => (
						<Post navigation={navigation} post={item} onLike={onLike} onDislike={onDislike} />
					)}
				/>
			</View>
		</View>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	userFollowing: store.userState.following,
	feeds: store.usersState.feeds,
	usersLoaded: store.usersState.usersLoaded
});
export default connect(mapStateToProps)(Feeds);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	acountDetail: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24,
		padding: 16
	},
	text: {
		marginBottom: 8,
		fontWeight: '600'
	},
	textCenter: {
		marginBottom: 8,
		padding: 16,
		fontWeight: '600',
		textAlign: 'center'
	},
	avatar: {
		// flex:1/3,
		width: 100,
		height: 100,
		borderRadius: 100 / 2
	},
	detail: {
		flexGrow: 1,
		justifyContent: 'center'
	},
	imageGallery: {
		flex: 1
	},
	imageContainer: {
		flex: 1 / 3
	},
	image: {
		flex: 1,
		aspectRatio: 1 / 1,
		height: 100
	},
	logoutButton: {
		padding: 4,
		backgroundColor: 'purple'
	}
});
