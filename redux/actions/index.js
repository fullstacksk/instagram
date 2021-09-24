import firebase from 'firebase';
import { USER_STATE_CHANGE } from '../constants';

export const fetchUser = () => {
	return async (dispatch) => {
		// console.log('currentUser : ', firebase.auth().currentUser.uid);
		try {
			const snapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
			if (snapshot.exists) {
				dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
			} else {
				throw new Error('user not found');
			}
		} catch (error) {
			console.log(error);
		}
	};
};
