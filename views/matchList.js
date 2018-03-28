
import React from "react"
import {
	StyleSheet, Text, ListView, View, ActivityIndicator, TextInput
} from "react-native"
import getSinglesMatches from "../BackendIntegration/getSinglesMatches"
import getSinglesMatchesByPlayerId from "../BackendIntegration/getSinglesMatchesByPlayerId"
import getDoublesMatches from "../BackendIntegration/getDoublesMatches"
import getDoublesMatchesByPlayerId from "../BackendIntegration/getDoublesMatchesByPlayerId"

export default class PlayerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			text: "",
			error: false
		}
		this.arrayHolder = []
	}

	componentDidMount() {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		var getMatches = this.props.doubles ?
			(this.props.playerId ? getDoublesMatchesByPlayerId : getDoublesMatches)
			:
			(this.props.playerId ? getSinglesMatchesByPlayerId : getSinglesMatches)
		getMatches(this.props.playerId).then((matches) => {
			this.setState({
				isLoading: false,
				dataSource: ds.cloneWithRows(matches)
			})
			this.arrayHolder = matches
		})
			.catch((error) => {this.setState({
				error: true 
			})
			console.log(error._bodyInit)})
	}

	SearchFilterFunction(text) {
		let self = this
		const newData = this.arrayHolder.filter(function (match) {
			const name = self.props.doubles ?
				match.winner1_first_name.toUpperCase() + " " +
				match.winner1_last_name.toUpperCase() + " " +
				match.winner2_first_name.toUpperCase() + " " +
				match.winner2_last_name.toUpperCase() + " " +
				match.loser1_first_name.toUpperCase() + " " +
				match.loser1_last_name.toUpperCase() + " " +
				match.loser2_first_name.toUpperCase() + " " +
				match.loser2_last_name.toUpperCase() + " " +
				match.referee_first_name.toUpperCase() + " " +
				match.referee_last_name.toUpperCase()
				: match.winner_first_name.toUpperCase() + " " +
				match.winner_last_name.toUpperCase() + " " +
				match.loser_first_name.toUpperCase() + " " +
				match.loser_last_name.toUpperCase() + " " +
				match.referee_first_name.toUpperCase() + " " +
				match.referee_last_name.toUpperCase()
			const textData = text.toUpperCase()
			return name.indexOf(textData) > -1
		})
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
			text: text
		})
	}

	viewPlayer = (id) => {
		this.props.navigation.navigate("player", {
			player_id: id
		})
	}

	render() {
		if (this.state.error) {
			return (
				<View style={styles.loadingContainer}>
					<Text>
						Something went wrong with the database, please try again.
					</Text>
				</View>
			)
		}
		if (this.state.isLoading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
			)
		}
		return (
			<View style={styles.mainContainer}>
				{!this.props.ladder &&
					<TextInput
						style={styles.TextInputStyleClass}
						onChangeText={(text) => this.SearchFilterFunction(text)}
						value={this.state.text}
						underlineColorAndroid='transparent'
						placeholder="Search Here"
					/>}
				<ListView enableEmptySections={true}
					style={styles.container}
					dataSource={this.state.dataSource}
					renderRow={(data) => {
						data.viewPlayer = this.viewPlayer
						data.doubles = this.props.doubles
						return <PlayerRow {...data} />
					}
					}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		paddingTop: 20
	},
	mainContainer: {
		justifyContent: "center",
		flex: 1,
		margin: 7,

	},
	container: {
		flex: 1,
	},
	separator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: "#8E8E8E",
	},
	TextInputStyleClass: {

		textAlign: "center",
		height: 40,
		borderWidth: 1,
		borderColor: "#009688",
		borderRadius: 7,
		backgroundColor: "#FFFFFF"

	}
})

function renderReferee(props) {
	if (props.referee) {
		return (
			<Text style={rowStyles.name} onPress={() => {
				props.viewPlayer(props.referee)
			}}>
				Referee: {`${props.referee_first_name} ${props.referee_last_name}`}
			</Text>
		)
	} else {
		return
	}
}

const PlayerRow = (props) => (
	<View style={rowStyles.container}>
		{!props.doubles &&
			<View>
				<Text style={rowStyles.name} onPress={() => {
					props.viewPlayer(props.winner)
				}}>
					Winner: {`${props.winner_first_name} ${props.winner_last_name}`}
				</Text>
				<Text style={rowStyles.name} onPress={() => {
					props.viewPlayer(props.loser)
				}}>
					Loser: {`${props.loser_first_name} ${props.loser_last_name}`}
				</Text>
			</View>
		}
		{props.doubles &&
			<View>
				<Text style={rowStyles.name} onPress={() => {
					props.viewPlayer(props.winner1_player_id)
				}}>
					Winners: {`${props.winner1_first_name} ${props.winner1_last_name}`}
				</Text>
				<Text>&</Text>
				<Text style={rowStyles.name} onPress={() => {
					props.viewPlayer(props.winner2_player_id)
				}}>
					{`${props.winner2_first_name} ${props.winner2_last_name}`}
				</Text>
				<Text style={rowStyles.name} onPress={() => {
					props.viewPlayer(props.loser1_player_id)
				}}>
					Losers: {`${props.loser1_first_name} ${props.loser1_last_name}`}
				</Text>
				<Text>&</Text>
				<Text style={rowStyles.name} onPress={() => {
					props.viewPlayer(props.loser2_player_id)
				}}>
					{`${props.loser2_first_name} ${props.loser2_last_name}`}
				</Text>

			</View>
		}
		<Text>
			{props.winner_score} - {props.loser_score}
		</Text>
		<Text>
			{props.match_date}
		</Text>

		{renderReferee(props)}


		<Text>
			Played on court {props.court}
		</Text>
		<Text style={rowStyles.text} >
			Anteckningar: {props.notes}
		</Text>
	</View>
)


const rowStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		flexDirection: "column",
		alignItems: "center",
	},
	name: {
		margin: 10,
		fontSize: 18,
		fontWeight: "bold"
	},
	text: {
		marginLeft: 12,
		fontSize: 16,
	}
})
