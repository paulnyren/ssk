import React from "react"
import {
	Text, ScrollView, StyleSheet, TextInput, ListView, View, TouchableOpacity, ActivityIndicator
} from "react-native"
import getPlayers from "../BackendIntegration/getPlayers"
import addTeam from "../BackendIntegration/addTeam"

const PLAYER1 = "PLAYER1"
const PLAYER2 = "PLAYER2"
const EMPTY_ERROR = "EMPTY_ERROR"
const SAME_ERROR = "SAME_ERROR"
const SERVER_ERROR = "SERVER_ERROR"

export default class AddTeamsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		this.state = {
			player1: [],
			player2: [],
			player1Text: "",
			player2Text: "",
			pickedPlayer1: undefined,
			pickedPlayer2: undefined,
			isLoading: true,
			showError: false,
			success: false
		}
	}
	static navigationOptions = {
		title: "Add Team",
	};

	componentDidMount() {
		getPlayers().then((data) => {
			this.setState({
				isLoading: false,
				players: data
			})
		})


	}

	listPlayers(searchedText, textField) {
		var players = (searchedText.length > 1 && !this.state.isLoading) ? this.state.players.filter(function (player) {
			const searchAble = player.first_name + " " + player.last_name
			return searchAble.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
		})
			:
			[]
		if (textField == PLAYER1) this.setState({
			player1: players,
			player1Text: searchedText
		})
		if (textField == PLAYER2) this.setState({
			player2: players,
			player2Text: searchedText
		})
	}

	renderRow = (playerObject, textField) => {
		if (this.state.isLoading) return <ActivityIndicator />
		return (
			<View >
				<TouchableOpacity style={styles.listItem} onPress={() => this.pickOption(playerObject, textField)}>
					<Text >{playerObject.last_name}, {playerObject.first_name}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	pickOption(playerObject, textField) {
		const text = playerObject.first_name + " " + playerObject.last_name
		if (textField == PLAYER1) this.setState({
			player1Text: text,
			pickedPlayer1: playerObject,
			player1: []
		})
		if (textField == PLAYER2) this.setState({
			player2Text: text,
			pickedPlayer2: playerObject,
			player2: []
		})
	}

	submitTeam() {
		if (!this.state.pickedPlayer1 || !this.state.pickedPlayer2) {
			this.setState({
				showError: EMPTY_ERROR
			})
		} else if (this.state.pickedPlayer1.player_id == this.state.pickedPlayer2.player_id) {
			this.setState({
				showError: SAME_ERROR
			})
		} else {
			this.setState({
				showError: false
			})
			addTeam(this.state.pickedPlayer1, this.state.pickedPlayer2).then(() => {
				this.setState({
					success: true
				}).catch(()=>this.setState({
					showError: SERVER_ERROR
				}))
			})
		}
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<TextInput
						style={styles.textinput}
						onChangeText={(text) => {
							this.listPlayers(text, PLAYER1)
						}}
						value={this.state.player1Text}
						placeholder="Ange spelare 1" />
					<ListView enableEmptySections={true}
						dataSource={this.ds.cloneWithRows(this.state.player1)}
						renderRow={(data) => this.renderRow(data, PLAYER1)}
					/>
					<TextInput
						style={styles.textinput}
						onChangeText={(text) => {
							this.listPlayers(text, PLAYER2)
						}}
						value={this.state.player2Text}
						placeholder="Ange spelare 2" />
					<ListView enableEmptySections={true}
						dataSource={this.ds.cloneWithRows(this.state.player2)}
						renderRow={(data) => this.renderRow(data, PLAYER2)}
					/>
					{this.state.showError == EMPTY_ERROR &&
						<Text style={styles.errorText}>You have to pick the players by clicking at the list</Text>}
					{this.state.showError == SAME_ERROR &&
						<Text style={styles.errorText}>Player 1 and player 2 can not be the same person</Text>}
					{this.state.success &&
						<Text style={styles.successText}>Match successfully added!</Text>}
					{this.state.status == SERVER_ERROR &&
						<Text>
							Could not add to server. Please try again.
						</Text>
					}
					<TouchableOpacity style={styles.button} onPress={() => this.submitTeam()} >
						<Text>Add team</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		marginTop: "20%",
		alignItems: "center"

	},
	successText: {
		color: "green",
		fontSize: 30
	},
	errorText: {
		color: "red"
	},
	textinput: {
		marginTop: "5%",
		textAlign: "center",
		height: 40,
		borderRadius: 4,
		backgroundColor: "white",
		width: "85%",
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
	listItem:{
		padding:10,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "lightgrey",
		shadowRadius: 4


	}
})
