import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import icon from '../../assets/icon.png';
import firebase from 'firebase';
import 'firebase/firestore';

const Profile = ({ currentUser, posts, navigation, route }) => {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    useEffect( () => {
        
        if (route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser);
            setUserPosts(posts);
        } else {
            (async () =>{
             try {
                const userSnapshot = await firebase.firestore().collection('users').doc(route.params.uid).get();
                if (userSnapshot.exists) {
                    setUser(userSnapshot.data());
                } else {
                    throw new Error('User not found');
                }
                //fetching other user's posts
                const snapshot = await firebase
				.firestore()
				.collection('posts')
				.doc(route.params.uid)
				.collection('userPosts')
				.orderBy('createdAt', 'desc')
				.get();
			if (snapshot.docs.length) {
				const posts = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data };
				});
                setUserPosts(posts);
            } else {
                setUserPosts([]);
				throw new Error('Post not found');
			}
            } catch (error) {
                console.log('Profile Comp : ', error)
                }
            })();
        }
    },[route.params.uid])
    const logout = async () => {
        try {
            await firebase.auth().signOut();
            await navigation.navigate('Login');
        } catch (error) {
            console.log("Log out error : ", error);
        }
    }
    if (user === null)
        return <View />
	return (
        <View style={styles.container}>
            <View style={styles.acountDetail}>
                <View>
                    <Image
                style={styles.avatar}
                source={icon} />
                </View>
                <View style={ {width:36}}/>
                
            <View style={styles.detail}>
			<Text style={styles.text}>Name : {user?.name}</Text>
            <Text style={styles.text}>Email : {user?.email}</Text>
               {route.params.uid === firebase.auth().currentUser.uid && <Button
                    title="Log Out"
                    onPress={logout}
                        color="purple"
                />}
            </View>
            </View>
            {!userPosts.length && <Text style={styles.textCenter}>No Posts</Text>}
            <View style={styles.imageGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.downlaodURL }} style={styles.image} />
                        </View>
                    )}
                 />

            </View>
		</View>
	);
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts:store.userState.posts
});
export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
	container: {
		flex: 1
    },
    acountDetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:"space-between",
        marginBottom: 24,
        padding: 16
    },
    text: {
        marginBottom: 8,
        fontWeight:'600'
    },
    textCenter: {
        marginBottom: 8,
        fontWeight: '600',
        textAlign:'center'
    },
    avatar: {
        // flex:1/3,
        width: 100,
        height: 100,
        borderRadius:100/2
    },
    detail: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    imageGallery:{
        flex:1
    },
    imageContainer: {
        flex:1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        height: 100
    },
    logoutButton: {
        padding: 4,
        backgroundColor:'purple'
    }
});
