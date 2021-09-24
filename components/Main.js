import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';
import Feeds from './main/Feeds';
import Search from './main/Search';
import Reels from './main/Reels';
import Activity from './main/Activity';
import Profile from './main/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Main = ({ fetchUser, currentUser }) => {
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		// <NavigationContainer>
		<Tab.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#b90e0e'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
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
				name="Reels"
				component={Reels}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="video-outline" color={color} size={26} />
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
		// </NavigationContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
