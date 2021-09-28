import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import Post from './Post';

const Feeds = ({ posts }) => {
	console.log('All Posts : ', posts);
	return (
		<View style={styles.container}>
			<FlatList numColumns={1} horizontal={false} data={posts} renderItem={({ item }) => <Post post={item} />} />
		</View>
	);
};

const mapStateToProps = (store) => ({
	posts: store.userState.posts
});
export default connect(mapStateToProps)(Feeds);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
