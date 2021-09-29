import firebase from 'firebase';
import { USER_FOLLOWING_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from '../constants';

//Fetching User
export const fetchUser = () => {
	return async (dispatch) => {
		try {
			const snapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
			if (snapshot.exists) {
				console.log('userSnapshot', snapshot.data());
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
				});
		} catch (error) {
			console.log(error);
		}
	};
};
