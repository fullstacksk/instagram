import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from '../constants';

const initialState = {
	users: [],
	usersLoaded: 0
};

export const users = (state = initialState, action) => {
	switch (action.type) {
		case USERS_DATA_STATE_CHANGE: {
			console.log('USERS_DATA_STATE_CHANGE : ', state, action.user);
			return {
				...state,
				users: [ ...state.users, action.user ]
			};
		}
		case USERS_POSTS_STATE_CHANGE: {
			console.log('USERS_POSTS_STATE_CHANGE : ', state, action.posts);
			return {
				...state,
				usersLoaded: state.usersLoaded + 1,
				users: state.users.map(
					(user) => (user.uid === action.uid ? { ...user, posts: action.posts } : { ...user })
				)
			};
		}
		default:
			return state;
	}
};
