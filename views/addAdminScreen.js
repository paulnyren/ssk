import React from "react"
import {
	StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput
} from "react-native"
import addAdmin from "../BackendIntegration/addAdmin"
const NONE = "NONE"
const SERVER_ERROR = "SERVER_ERROR"
const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const NON_EMPTY = "NON_EMPTY"

export default class AddAdminScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: NONE,
			username: "",
			password: ""
		}
	}
	static navigationOptions = {
		title: "Add administrator",
	};

	submitAdmin() {
		if (!(this.state.username && this.state.password)) {
			this.setState({
				status: NON_EMPTY
			})
			return
		}

		this.setState({
			status: PENDING
		})
		addAdmin(this.state).then(
			() => {
				this.setState({
					status: SUCCESS
				})
			}
		)
			.catch(() => {
				this.setState({
					status: SERVER_ERROR
				})
			})
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput underlineColorAndroid='transparent' style={styles.TextInputStyleClass}
					placeholder="Username"
					value={this.state.username}
					onChangeText={(text) => this.setState({
						username: text
					})}
				/>
				<TextInput underlineColorAndroid='transparent' secureTextEntry style={styles.TextInputStyleClass}
					placeholder="Password"
					value={this.state.password}
					onChangeText={(text) => this.setState({
						password: text
					})}
				/>
				{this.state.status == NON_EMPTY &&
					<Text style={styles.errormsg}>
						Username and password have to be non-empty
					</Text>
				}
				{this.state.status == SUCCESS &&
					<Text style={styles.successmsg}>
						En ny administratör har kommit till världen
					</Text>
				}
				{this.state.status == PENDING &&
					<ActivityIndicator />
				}
				{this.state.status == SERVER_ERROR &&
					<Text style={styles.errormsg}>
						Something went wrong with the database, please try again.
					</Text>
				}
				<TouchableOpacity style={styles.button} onPress={() => this.submitAdmin()} ><Text>Create admin-account</Text></TouchableOpacity>
				<View style={styles.buffer} />
			</View>
		)
	}
}

const styles = StyleSheet.create({

	buffer: {
		height: 300
	},
	TextInputStyleClass: {
		marginTop: "5%",
		textAlign: "center",
		height: 40,
		borderRadius: 4,
		backgroundColor: "white",
		width: "85%",
		// textDecorationLine: 'underline',
	},
	container: {
		marginTop: "20%",
		alignItems: "center"
	},
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
	errormsg: {
		marginTop: "5%",
		color: "red"
	},
	successmsg: {
		marginTop: "5%",
		color: "green"
	}
})
