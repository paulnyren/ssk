import React from "react"
import {
	StyleSheet, Text, TouchableOpacity, View, TextInput
} from "react-native"
import login from "../BackendIntegration/login"
const NONE = "NONE"
const SERVER_ERROR = "SERVER_ERROR"
const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const NON_EMPTY = "NON_EMPTY"
const FAILED_LOGIN = "FAILED_LOGIN"

export default class AdminLoginScreen extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			status: NONE,
			username: "",
			password: ""
		}
	}
	static navigationOptions = {
		title: "Admin login",
	};

	login() {
		if (!(this.state.username && this.state.password)) {
			this.setState({
				status: NON_EMPTY
			})
			return
		}

		this.setState({
			status: PENDING
		})
		login(this.state).then(
			(data) => {
				if (data.status == 0) {
					this.setState({
						status: FAILED_LOGIN
					})
				} else {
					this.setState({
						status: SUCCESS
					})
					this.props.navigation.navigate("admin")
				}
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
					Användarnamn och lösenord måste vara ifyllt
					</Text>
				}


				{this.state.status == FAILED_LOGIN &&
					<Text style={styles.errormsg}>
						Fel lösenord och/eller användarnamn
					</Text>
				}
				{this.state.status == SUCCESS &&
					<Text style={styles.errormsg}>
						Inloggad!
					</Text>
				}
				{this.state.status == SERVER_ERROR &&
						<Text>
							Could not connect to server. Please try again
						</Text>
				}
				<TouchableOpacity elevation={5} style={styles.button} onPress={() => this.login()} ><Text >Logga in</Text></TouchableOpacity>
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
		textDecorationLine: "underline",


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
	container: {
		marginTop: "20%",
		alignItems: "center"
	},
	errormsg: {
		marginTop: "5%",
		color: "red"
	}
})
