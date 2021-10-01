import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Post = ({ post: { caption, downlaodURL, createdAt, id, user }, navigation }) => {
	return (
		<View style={styles.postContainer}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: downlaodURL }} style={styles.image} />
			</View>
			<Text>{caption}</Text>
			{/* <Text>{createdAt}</Text> */}
			<Text onPress={() => navigation.navigate('Comment', { postId: id, uid: user.uid })}>View Comments...</Text>
		</View>
	);
};

export default Post;

const styles = StyleSheet.create({
	postContainer: {
		flex: 1,
		marginTop: 24
	},
	imageContainer: {
		flex: 1
	},
	image: {
		flex: 1,
		height: 100 / 1
	}
});
