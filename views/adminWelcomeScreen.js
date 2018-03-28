import React from "react"
import {
	View
} from "react-native"

import {
	StyleSheet, Text, Image
} from "react-native"
export default class AdminWelcomeScreen extends React.Component {
	static navigationOptions = {
		title: "Admin Welcome",
	};
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.image} source={require("../skk_logga.png")} />
				<Text style={styles.text}>{`
Inloggad som administratör!
				`}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		height: 115,
		width: "auto",
		resizeMode: "contain"
	},
	text: {
		padding: 20,
		textAlign: "center"
	},
	container: {
		marginTop: "20%"
	}
})
