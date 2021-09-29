import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/actions';
import Feeds from './main/Feeds';
import Search from './main/Search';
import Add from './main/Add';
import Activity from './main/Activity';
import Profile from './main/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();
const Main = ({ fetchUser, fetchUserPosts, fetchUserFollowing }) => {
	useEffect(() => {
		fetchUser();
		fetchUserPosts();
		fetchUserFollowing();
	}, []);
	return (
		<Tab.Navigator
			labeled={false}
			initialRouteName="Feed"
			activeColor="#fff"
			barStyle={{ backgroundColor: '#a00728' }}
		>
			<Tab.Screen
				name="Feeds"
				component={Feeds}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={26} />
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={26} />
				}}
			/>
			<Tab.Screen
				name="Add"
				component={Add}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="camera-plus-outline" color={color} size={26} />
					)
				}}
			/>
			<Tab.Screen
				name="Activity"
				component={Activity}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="heart-outline" color={color} size={26} />
					)
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				listeners={({ navigation }) => ({
					tabPress: (e) => {
						e.preventDefault();
						navigation.navigate('Profile', { uid: firebase.auth().currentUser.uid });
					}
				})}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={26} />
				}}
			/>
		</Tab.Navigator>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
