import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';
import Feeds from './main/Feeds';
import Search from './main/Search';
import Add from './main/Add';
import Activity from './main/Activity';
import Profile from './main/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Main = ({ fetchUser, currentUser }) => {
	useEffect(() => {
		fetchUser();
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
