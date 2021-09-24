import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Reels = () => {
	return (
		<View style={styles.container}>
			<Text>Reels</Text>
		</View>
	);
};

export default Reels;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
