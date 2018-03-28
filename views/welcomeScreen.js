import React from "react"
import {
	View
} from "react-native"
import {
	StyleSheet, Text, Image
} from "react-native"
export default class WelcomeScreen extends React.Component {
	static navigationOptions = {
		title: "Stockholms squashklubb",
	};
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.image} source={require("../skk_logga.png")} />
				<Text style={styles.text}>{`
Sveriges äldsta squashhall
Du bokar tid - vi fixar spelpartner
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
