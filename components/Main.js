import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';
const Main = ({ fetchUser, currentUser }) => {
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<View>
			<Text style={{ margin: '2rem', textAlign:"center" }}>Welcome, {currentUser?.name}</Text>
		</View>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
