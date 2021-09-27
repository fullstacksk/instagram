import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import icon from '../../assets/icon.png';
import firebase from 'firebase';

const Profile = ({ currentUser, navigation }) => {
    const logout = async () => {
        try {
            await firebase.auth().signOut();
            await navigation.navigate('Login');
        } catch (error) {
            console.log("Log out error : ", error);
        }
    }
	return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={icon} />
			<Text>Name : {currentUser?.name}</Text>
            <Text>Email : {currentUser?.email}</Text>
            <View style={styles.logoutButton}>
                <Button
                    title="Log Out"
                    onPress={logout}
                />
            </View>
		</View>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});

export default connect(mapStateToProps)(Profile);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius:100/2
    },
    logoutButton: {
        margin:24
    }
});
