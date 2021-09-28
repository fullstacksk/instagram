import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Post = ({ post: { caption, downlaodURL, createdAt } }) => {
	return (
		<View style={styles.postContainer}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: downlaodURL }} style={styles.image} />
			</View>
			<Text>{caption}</Text>
			{/* <Text>{createdAt}</Text> */}
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
