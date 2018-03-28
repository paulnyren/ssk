import React from "react"
import {
	StyleSheet, Text, View, Button, Image 
} from "react-native"
export default class LandingPage extends React.Component {
	static navigationOptions = {
		title: "Välkommen",
	};
	render() {
		return (
			<View style={styles.container}>
				<Text>Välkommen till Stockholms Squashklubb</Text>
				<Text>Sveriges äldsta squashklubb</Text>

				<View style={styles.subContainer}>
					<View style={styles.loginContainer}>
						<Button
							title="Logga in"
							onPress={() => this.props.navigation.navigate("DrawerOpen")} />
					</View>
					<View style={styles.createAccountContainer}>
						<Button
							title="Skapa konto"
							onPress={() => this.props.navigation.navigate("DrawerOpen")} />
					</View>
				</View>
				<View >
					<View >
						<Text style={styles.bottomText}>...scrolla ned för att läsa mer</Text>
						<Image style={styles.arrowStyle} source={require("../scroll_down_arrow.png")} />
					</View>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	bottomText:{
		textAlign: "center" 
	},
	arrowStyle:{
		alignItems: "center",
		marginTop: 100,
		width: 20,
		height: 20 
	},
	createAccountContainer:{
		marginLeft: 10 
	},
	loginContainer:{
		marginRight: 10 
	},
	subContainer:{
		marginTop: 20,
		justifyContent: "space-around",
		flexDirection: "row" 
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		// justifyContent: 'center',
	},
})
