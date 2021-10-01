import firebase from 'firebase';
import {
	USERS_DATA_STATE_CHANGE,
	USERS_POSTS_STATE_CHANGE,
	USER_FOLLOWING_STATE_CHANGE,
	USER_POSTS_STATE_CHANGE,
	USER_STATE_CHANGE,
	CLEAR_DATA
} from '../constants';

//clear All Data

export const clearData = () => {
	return (dispatch) => {
		dispatch({ type: CLEAR_DATA });
	};
};

//Fetching User
export const fetchUser = () => {
	return async (dispatch) => {
		try {
			const snapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
			if (snapshot.exists) {
				dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
			} else {
				throw new Error('User not found');
			}
		} catch (error) {
			console.log(error);
		}
	};
};
//Fetching user posts
export const fetchUserPosts = () => {
	return async (dispatch) => {
		try {
			const snapshot = await firebase
				.firestore()
				.collection('posts')
				.doc(firebase.auth().currentUser.uid)
				.collection('userPosts')
				.orderBy('createdAt', 'desc')
				.get();
			if (snapshot.docs.length) {
				const posts = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data };
				});
				console.log('posts : ', posts);
				dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
			} else {
				throw new Error('Post not found');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//Fetching user following
export const fetchUserFollowing = () => {
	return (dispatch) => {
		try {
			firebase
				.firestore()
				.collection('following')
				.doc(firebase.auth().currentUser.uid)
				.collection('userFollowing')
				.onSnapshot((snapshot) => {
					const following = snapshot.docs.map((doc) => {
						return doc.id;
					});
					console.log('following : ', following);
					dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
					following.forEach((user) => dispatch(fetchUsersData(user, true)));
				});
		} catch (error) {
			console.log(error);
		}
	};
};

//fetching users data

export const fetchUsersData = (uid, getPosts) => {
	return async (dispatch, getState) => {
		const found = getState().usersState.users.some((el) => el.uid === uid);
		if (!found) {
			const snapshot = await firebase.firestore().collection('users').doc(uid).get();
			if (snapshot.exists) {
				let user = snapshot.data();
				user.uid = snapshot.id;
				await dispatch({ type: USERS_DATA_STATE_CHANGE, user });
				if (getPosts) {
					await dispatch(fetchUserFollowingPosts(uid));
				}
			} else {
				throw new Error('User not found');
			}
		}
	};
};

//Fetching user following posts
export const fetchUserFollowingPosts = (uid) => {
	return async (dispatch, getState) => {
		try {
			const snapshot = await firebase
				.firestore()
				.collection('posts')
				.doc(uid)
				.collection('userPosts')
				.orderBy('createdAt', 'desc')
				.get();
			if (snapshot.docs.length) {
				const uid = snapshot.docs[0].ref.path.split('/')[1];
				const user = getState().usersState.users.find((el) => el.uid === uid);
				const posts = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data, user };
				});

				console.log('fetchUserFollowingPosts : ', { user, posts });
				dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
			} else {
				throw new Error('Post not found');
			}

			console.log('getState : ', getState());
		} catch (error) {
			console.log(error);
		}
	};
};
