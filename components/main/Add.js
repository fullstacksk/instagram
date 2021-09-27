import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Add = () => {
	const [ hasPermission, setHasPermission ] = useState(null);
	const [ hasGalleryPermission, setHasGalleryPermission ] = useState(null);
	const [ type, setType ] = useState(Camera.Constants.Type.back);
	const [ camera, setCamera ] = useState(null);
	const [ image, setImage ] = useState(null);
	const [ selectedimage, setSelectedimage ] = useState(null);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestPermissionsAsync();
			setHasPermission(cameraStatus.status === 'granted');
			const galeryStatus = await ImagePicker.requestCameraPermissionsAsync();
			setHasGalleryPermission(galeryStatus.status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			setImage(data.uri);
		}
	};
	const pickImage = async () => {
		const pickedImage = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowEditing: true,
			aspect: [ 1, 1 ],
			quality: 1
		});
		if (!pickedImage.cancelled) {
			setImage(pickedImage.uri);
		}
	};

	if (hasPermission === null || hasGalleryPermission === null) {
		return <View />;
	}
	if (hasPermission === false || hasGalleryPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={styles.container}>
			{/* <View style={styles.cameraContainer}> */}
			<Camera ref={(ref) => setCamera(ref)} style={styles.camera} type={type} ratio={'1:1'} />
			{/* </View> */}
			<View style={styles.buttonContainer}>
				<Button
					onPress={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
					}}
					title="Flip Camera"
				/>
				<Button onPress={() => takePicture()} title="Take Picture" />
				<Button onPress={() => pickImage()} title="Pick Image" />
			</View>
			<View style={styles.container}>{image && <Image source={{ uri: image }} style={{ flex: 1 }} />}</View>
		</View>
	);
};

export default Add;
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	cameraCotainer: {
		flex: 1
	},
	camera: {
		flex: 1
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 8
	},
	button: {
		flexDirection: 'row',
		backgroundColor: 'teal',
		padding: 8,
		marginBottom: 24
	}
});
