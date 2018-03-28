import React from "react"
import {
	TouchableOpacity, StyleSheet, Text, View
} from "react-native"

export default class AdminLogout extends React.Component {
	static navigationOptions = {
		title: "Logout",
	};
	adminLogout() {
		this.props.navigation.navigate("guest")
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={() => this.adminLogout()} ><Text>Logga ut</Text></TouchableOpacity>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	button: {
		marginTop: "10%",
		padding:10,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 10,
		shadowColor: "#000",
		borderRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2 
		},
		shadowOpacity: 0.2,
		marginBottom: 10,
		elevation: 2,
		position: "relative",
		shadowRadius: 4,
	},
	container: {
		marginTop: "20%",
		alignItems: "center"
	}
})
