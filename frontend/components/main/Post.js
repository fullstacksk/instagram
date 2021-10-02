import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Post = ({
	post: { caption, downlaodURL, currentUserLike, likesCount, commentCount, id, user },
	navigation,
	onLike,
	onDislike
}) => {
	const [ countLike, setCountLike ] = useState(likesCount);
	console.log('post in Post : ', currentUserLike);
	return (
		<View style={styles.postContainer}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: downlaodURL }} style={styles.image} />
			</View>
			<View style={styles.likeCommentContainer}>
				<View style={styles.likeIcon}>
					{currentUserLike ? (
						<TouchableOpacity
							style={styles.flexRow}
							onPress={() => {
								onDislike(user.uid, id);
								setCountLike(countLike - 1);
							}}
						>
							<MaterialCommunityIcons name="heart" color="purple" size={26} />
							<Text>{countLike}</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.flexRow}
							onPress={() => {
								onLike(user.uid, id);
								setCountLike(countLike + 1);
							}}
						>
							<MaterialCommunityIcons name="heart-outline" color="purple" size={26} />
							<Text>{countLike}</Text>
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.commentIcon}>
					{!!commentCount ? (
						<TouchableOpacity
							style={styles.flexRow}
							onPress={() => navigation.navigate('Comment', { postId: id, uid: user.uid })}
						>
							<MaterialCommunityIcons name="chat" color="purple" size={26} />
							<Text>{commentCount}</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.flexRow}
							onPress={() => navigation.navigate('Comment', { postId: id, uid: user.uid })}
						>
							<MaterialCommunityIcons name="chat-outline" color="purple" size={26} />
							<Text>{commentCount}</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			<Text style={styles.caption}>{caption}</Text>
			{/* <Text>{createdAt}</Text> */}
			{/* <Text onPress={() => navigation.navigate('Comment', { postId: id, uid: user.uid })}>View Comments...</Text> */}
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
	},
	likeCommentContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 8
	},
	likeIcon: {
		padding: 4,
		flex: 1 / 3,
		textAlign: 'center',
		borderWidth: 2,
		borderColor: 'purple',
		borderRadius: 8
	},
	commentIcon: {
		padding: 4,
		flex: 1 / 3,
		textAlign: 'center',
		borderWidth: 2,
		borderColor: 'purple',
		borderRadius: 8
	},
	caption: {
		padding: 8,
		fontWeight: '600'
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
