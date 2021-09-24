import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Feeds = () => {
	return (
		<View style={styles.container}>
			<Text>Feeds</Text>
		</View>
	);
};

export default Feeds;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
