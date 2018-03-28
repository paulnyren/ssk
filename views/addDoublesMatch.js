import React from "react"
import {
	Text, ScrollView, StyleSheet, TextInput, ListView, View, Picker, TouchableOpacity, ActivityIndicator
} from "react-native"
import getPlayers from "../BackendIntegration/getPlayers"
import getTeams from "../BackendIntegration/getTeams"
import addDoublesMatch from "../BackendIntegration/addDoublesMatch"
import DatePicker from "react-native-datepicker"

const LOSER = "LOSER"
const WINNER = "WINNER"
const REFEREE = "REFEREE"
const NOTES = "NOTES"
const EMPTY_ERROR = "EMPTY_ERROR"
const SAME_ERROR = "SAME_ERROR"
const SERVER_ERROR = "SERVER_ERROR"
const today = new Date()

export default class AddMatch extends React.Component {
	static navigationOptions = {
		title: "Add doublesmatch",
		tabBarLabel: "Doubles"
	};
	constructor(props) {
		super(props)
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		this.state = {
			winners: [],
			losers: [],
			referees: [],
			winnerText: "",
			loserText: "",
			refereeText: "",
			winnerScore: "3",
			loserScore: "2",
			pick: "3-2",
			notes: "",
			court: "1",
			date: new Date().toJSON()
				.slice(0, 10),
			pickedWinner: undefined,
			pickedLoser: undefined,
			pickedReferee: "",
			isLoading: true,
			showError: false,
			success: false
		}
	}
	componentDidMount() {
		getPlayers().then((data) => {
			this.setState({
				players: data
			})
		})
			.then(getTeams().then((data) => {
				this.setState({
					isLoading: false,
					teams: data
				})
			}))


	}

	listPlayers(searchedText, textField) {
		if (textField == REFEREE) {
			var players = (searchedText.length > 1 && !this.state.isLoading) ? this.state.players.filter(function (player) {
				const searchAble = player.first_name + " " + player.last_name
				return searchAble.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
			})
				:
				[]
		} else {
			players = (searchedText.length > 1 && !this.state.isLoading) ? this.state.teams.filter(function (team) {
				const searchAble = team.player1_first_name + " " + team.player1_last_name + " " +
					team.player2_first_name + " " + team.player2_last_name
				return searchAble.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
			})
				:
				[]
		}
		if (textField == LOSER) this.setState({
			losers: players,
			loserText: searchedText
		})
		if (textField == WINNER) this.setState({
			winners: players,
			winnerText: searchedText
		})
		if (textField == REFEREE) this.setState({
			referees: players,
			refereeText: searchedText
		})
	}
	updateText(text, textField) {
		if (textField == NOTES) this.setState({
			notes: text
		})
	}

	renderRow = (playerObject, textField) => {
		if (this.state.isLoading) return <ActivityIndicator />
		const text = textField == REFEREE ?
			playerObject.last_name + ", " + playerObject.first_name
			:
			playerObject.player1_last_name + ", " + playerObject.player1_first_name + " & " +
			playerObject.player2_last_name + ", " + playerObject.player2_first_name
		return (
			<View >
				<TouchableOpacity style={styles.listItem} onPress={() => this.pickOption(playerObject, textField)} >
					<Text >
						{text}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	pickOption(playerObject, textField) {
		const text = textField == REFEREE ?
			playerObject.first_name + " " + playerObject.last_name
			:
			playerObject.player1_first_name + " " + playerObject.player1_last_name + " & " +
			playerObject.player2_first_name + " " + playerObject.player2_last_name
		if (textField == LOSER) this.setState({
			loserText: text,
			pickedLoser: playerObject,
			losers: []
		})
		if (textField == WINNER) this.setState({
			winnerText: text,
			pickedWinner: playerObject,
			winners: []
		})
		if (textField == REFEREE) this.setState({
			refereeText: text,
			pickedReferee: playerObject,
			referees: []
		})
	}

	submitMatch() {

		if (!this.state.pickedWinner || !this.state.pickedLoser ) {
			this.setState({
				showError: EMPTY_ERROR
			})
		} else if ((this.state.pickedReferee.player_id in [
			this.state.pickedWinner.player1,
			this.state.pickedWinner.player2,
			this.state.pickedLoser.player1,
			this.state.pickedLoser.player2
		]) || this.state.pickedWinner.team_id == this.state.pickedLoser.team_id) {
			this.setState({
				showError: SAME_ERROR
			})
		} else {
			this.setState({
				showError: false
			})
			addDoublesMatch(this.state.pickedWinner, this.state.pickedLoser, this.state.pickedReferee, this.state.winnerScore,
				this.state.loserScore, this.state.date, this.state.court, this.state.notes, ).then(() => {
				this.setState({
					success: true
				})
			})
				.catch(()=>this.setState({
					showError: SERVER_ERROR
				}))
		}
	}

	render() {
		return (
			<ScrollView>
				<View>
					<View>
						<View style={styles.container}>
							<TextInput
								style={styles.textinput}
								onChangeText={(text) => {
									this.listPlayers(text, WINNER)
								}}
								value={this.state.winnerText}
								placeholder="Ange vinnarlag" />
							<ListView enableEmptySections={true}
								dataSource={this.ds.cloneWithRows(this.state.winners)}
								renderRow={(data) => this.renderRow(data, WINNER)}
							/>
							<TextInput
								style={styles.textinput}
								onChangeText={(text) => {
									this.listPlayers(text, LOSER)
								}}
								value={this.state.loserText}
								placeholder="Ange förlorarlag" />
							<ListView enableEmptySections={true}
								dataSource={this.ds.cloneWithRows(this.state.losers)}
								renderRow={(data) => this.renderRow(data, LOSER)}
							/>
							<TextInput
								style={styles.textinput}
								onChangeText={(text) => {
									this.listPlayers(text, REFEREE)
								}}
								value={this.state.refereeText}
								placeholder="Ange domare" />
							<ListView enableEmptySections={true}
								dataSource={this.ds.cloneWithRows(this.state.referees)}
								renderRow={(data) => this.renderRow(data, REFEREE)}
							/>
							<TextInput
								style={styles.textinput}
								onChangeText={(text) => {
									this.updateText(text, NOTES)
								}}
								value={this.state.notes}
								placeholder="Anteckning"
							/>

						</View>
						<View style={styles.container}>
							<View style={styles.pickers}>
								<View style={styles.picker}>
									<Text>Court:</Text>
									<Picker selectedValue={this.state.court}
										onValueChange={(value) => this.setState({
											court: value
										})}
									>
										<Picker.Item label="1" value="1" />
										<Picker.Item label="2" value="2" />
										<Picker.Item label="3" value="3" />
									</Picker>
								</View>
								<View style={styles.picker}>
									<Text>Score:</Text>
									<Picker
										selectedValue={this.state.pick}
										onValueChange={(value) => this.setState({
											winnerScore: value.substring(0, 1),
											loserScore: value.substring(2, 3),
											pick: value
										})}
									>
										<Picker.Item label="3-2" value="3-2" />
										<Picker.Item label="3-1" value="3-1" />
										<Picker.Item label="3-0" value="3-0" />
										<Picker.Item label="2-1" value="2-1" />
										<Picker.Item label="2-0" value="2-0" />
										<Picker.Item label="1-0" value="1-0" />
									</Picker>
								</View>
								<View style={styles.DatePicker}>
									<Text>{this.state.date}</Text>
									<DatePicker
										date={this.state.date}
										mode="date"
										format="YYYY-MM-DD"
										hideText='true'
										maxDate={today}
										confirmBtnText="Confirm"
										cancelBtnText="Cancel"
										onDateChange={(date) => {
											this.setState({
												date: date
											})
										}}
									/>
								</View>
							</View>
							{this.state.showError == EMPTY_ERROR &&
								<Text style={styles.errorText}>You have to pick a winner, loser and referee by clicking at the list</Text>}
							{this.state.showError == SAME_ERROR &&
								<Text style={styles.errorText}>Winner, loser and referee can not be same person</Text>}
							{this.state.success &&
								<Text style={styles.successText}>Match successfully added!</Text>}
							{this.state.showError == SERVER_ERROR &&
								<Text style={styles.errorText}>Something went wrong with the database, please try again.</Text>}
							<TouchableOpacity style={styles.button} onPress={() => this.submitMatch()} >
								<Text>Confirm</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}

var styles = StyleSheet.create({
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
	DatePicker:{
		alignItems: "center",
		width: "30%",
		backgroundColor: "white",
		borderRadius: 4,
	},
	container: {
		alignItems: "center"
	},
	successText: {
		color: "green",
		fontSize: 30
	},
	pickers: {
		flexDirection: "row",
		marginTop: "10%",
		justifyContent: "space-between",
		flex: 1,
		width: "85%",

	},
	picker: {
		width: "30%",
		backgroundColor: "white",
		borderRadius: 4
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
	listItem:{
		padding:10,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "lightgrey",
		shadowRadius: 4,


	}
})
