import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, FlatList, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

const Search = ({ navigation }) => {
	const [ users, setUsers ] = useState([]);
	const fetchUsers = async (search) => {
		console.log('search : ', search);
		try {
			const snapshot = await firebase.firestore().collection('users').where('name', '>=', search).get();
			console.log('users snapshot : ', snapshot);
			if (snapshot.docs.length) {
				const users = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data };
				});
				setUsers(users);
			} else {
				setUsers([]);
				throw new Error('No Results');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.search}>
				<TextInput
					placeholder="Search"
					style={styles.textInput}
					onChangeText={(search) => fetchUsers(search)}
				/>
			</View>
			<View style={styles.searchContainer}>
				<FlatList
					data={users}
					renderItem={({ item }) => (
						<View style={styles.user}>
							<Text style={styles.userName}>{item.name}</Text>
							<Button
								onPress={() => navigation.navigate('Profile', { uid: item.id })}
								title="View Profile"
							/>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

export default Search;
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	search: {
		display: 'flex',
		flexDirection: 'row',
		margin: 8,
		marginBottom: 16
	},
	textInput: {
		padding: 12,
		borderWidth: 2,
		borderColor: 'blue',
		borderRadius: 8,
		// borderBottomLeftRadius: 8,
		// borderTopLeftRadius: 8,
		flex: 1
	},
	user: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 16
	},
	userName: {
		fontSize: 20,
		fontWeight: '600',
		color: 'purple'
	}
});
