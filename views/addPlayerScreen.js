import React from "react"
import {
	ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput
} from "react-native"
import addPlayer from "../BackendIntegration/addPlayer"
const NONE = "NONE"
const SERVER_ERROR = "SERVER_ERROR"
const PENDING = "PENDING"
const CLIENT_ERROR = "CLIENT_ERROR"
const CLIENT_ERROR_TELEPHONENUMBER = "CLIENT_ERROR_TELEPHONENUMBER"
const CLIENT_ERROR_EMAIL = "CLIENT_ERROR_EMAIL"
const SUCCESS = "SUCCESS"

export default class addPlayerScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: NONE,
			dropDown: {
				fontSize: 20
			},
			firstName: "",
			lastName: "",
			gender: "",
			notes: "",
			telephoneNumber: "",
			personalNumber: "",
			address: "",
			email: "",
			profilePictureUrl: "",
		}
	}
	static navigationOptions = {
		title: "Add player",
	};
	validateEmail(email) {
		//eslint-disable-next-line no-useless-escape
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	}

	addPlayer() {
		if (!(this.state.firstName && this.state.lastName)) {
			this.setState({
				status: CLIENT_ERROR
			})
			return
		}
		for (let i = 1; i < this.state.telephoneNumber.split("").length; i++) {
			if (isNaN(this.state.telephoneNumber.split("")[i])) {
				this.setState({
					status: CLIENT_ERROR_TELEPHONENUMBER
				})
				return
			}
		}
		if (!this.validateEmail(this.state.email) && this.state.email.length > 0) {
			this.setState({
				status: CLIENT_ERROR_EMAIL
			})
			return
		}

		this.setState({
			status: PENDING
		})
		addPlayer(this.state).then(
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
			<ScrollView>
				<View style={styles.container}>
					<TextInput style={styles.TextInputStyleClass}
						placeholder="First name"
						value={this.state.firstName}
						onChangeText={(text) => this.setState({
							firstName: text
						})}
					/>
					<TextInput style={styles.TextInputStyleClass}
						placeholder="Last name"
						value={this.state.lastName}
						onChangeText={(text) => this.setState({
							lastName: text
						})}
					/>
					<TextInput style={styles.TextInputStyleClass}
						placeholder="Gender"
						value={this.state.gender}
						onChangeText={(text) => this.setState({
							gender: text
						})}
					/>
					<TextInput style={styles.TextInputStyleClass}
						placeholder="Notes"
						value={this.state.notes}
						onChangeText={(text) => this.setState({
							notes: text
						})}
						multiline={true}
					/>
					<TextInput keyboardType="phone-pad" style={styles.TextInputStyleClass}
						placeholder="Telephone number"
						value={this.state.telephoneNumber}
						onChangeText={(text) => this.setState({
							telephoneNumber: text
						})}
						multiline={true}
					/>
					<TextInput keyboardType="numbers-and-punctuation" style={styles.TextInputStyleClass}
						placeholder="Personal Number"
						value={this.state.personalNumber}
						onChangeText={(text) => this.setState({
							personalNumber: text
						})}
						multiline={true}
					/>
					<TextInput style={styles.TextInputStyleClass}
						placeholder="Address"
						value={this.state.address}
						onChangeText={(text) => this.setState({
							address: text
						})}
						multiline={true}
					/>
					<TextInput keyboardType="email-address" style={styles.TextInputStyleClass}
						placeholder="Email address"
						value={this.state.email}
						onChangeText={(text) => this.setState({
							email: text
						})}
						multiline={true}
					/>
					<TextInput style={styles.TextInputStyleClass}
						placeholder="url to profilePictureUrl"
						value={this.state.profilePictureUrl}
						onChangeText={(text) => this.setState({
							profilePictureUrl: text
						})}
						multiline={true}
					/>
					<TouchableOpacity style={styles.button}  onPress={() => this.addPlayer()} >
						<Text>Add player</Text>
					</TouchableOpacity>
					{this.state.status == CLIENT_ERROR &&
						<Text>
							First name or last name cannot be empty.
						</Text>
					}
					{this.state.status == CLIENT_ERROR_TELEPHONENUMBER &&
						<Text>
							Not a valid telephonenumber
						</Text>
					}
					{this.state.status == CLIENT_ERROR_EMAIL &&
						<Text>
							Not a valid email
						</Text>
					}
					{this.state.status == PENDING &&
						<ActivityIndicator />
					}
					{this.state.status == SERVER_ERROR &&
						<Text>
							Could not add to server. Please try again.
						</Text>
					}
					{this.state.status == SUCCESS &&
						<Text>
							Player succesfully added!
						</Text>
					}
					<View style={styles.buffer} />
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	buffer: {
		height: 300
	},
	TextInputStyleClass: {

		marginTop: "4%",
		textAlign: "center",
		height: 40,
		borderRadius: 4,
		backgroundColor: "white",
		width: "85%",
	},
	container: {
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
	}
})
