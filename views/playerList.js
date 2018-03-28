import React from "react"
import {
	StyleSheet, Text, ListView, View, TouchableOpacity, Image, ActivityIndicator, TextInput
} from "react-native"
import getPlayers from "../BackendIntegration/getPlayers"
import getTeams from "../BackendIntegration/getTeams"
import getSinglesLadder from "../BackendIntegration/getSinglesLadder"

export default class PlayerList extends React.Component {
	constructor(props) {
		super(props)
		
		if(!props.ladder || !props.doubles){
		this.socket = new WebSocket('ws://130.237.223.192:8080')
		this.socket.onmessage = this.updateList
		}
		this.state = {
			isLoading: true,
			text: "",
			error: false
		}
		this.arrayHolder = []
	}

	componentDidMount() {
		if (!this.props.doubles) {
			let orderBy = this.props.ladder ? "rank" : "last_name"
			let order = "ASC"
			if(this.props.ladder){
				getSinglesLadder(orderBy, order).then((data) => this.dataLoaded(data))
					.catch(()=>this.setState({
						error:true
					}))
			} else {
				getPlayers(orderBy, order).then((data) => this.dataLoaded(data))
					.catch(()=>this.setState({
						error:true
					}))
			}
		} else {
			getTeams().then((data) => this.dataLoaded(data))
				.catch(()=>this.setState({
					error:true
				}))
		}
	}
	componentWillUnmount(){
		this.socket.close()
	}
	dataLoaded(data) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		this.setState({
			isLoading: false,
			dataSource: ds.cloneWithRows(data)
		})
		this.arrayHolder = data

	}

	updateList=(event)=>{
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		playerObject = JSON.parse(event.data)
		this.arrayHolder.push(playerObject)
		this.setState({dataSource: ds.cloneWithRows(this.arrayHolder)})
	}

	SearchFilterFunction(text) {
		const newData = this.arrayHolder.filter(function (player) {
			const name = player.first_name.toUpperCase() + " " + player.last_name.toUpperCase()
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
						data.ladder = this.props.ladder
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

const displaySkill = (props) => {
	if (props.ladder){
		return (
			<Text style={rowStyles.elo}>
				Rank: {props.rank}
			</Text>
		)
	} else {
		return (
			<Text style={rowStyles.elo}>
				Elo: {props.elo_rank}
			</Text>
		)
	}
}

const PlayerRow = (props) => {
	if (!props.doubles) {
		return (
			<TouchableOpacity onPress={() => {
				props.viewPlayer(props.player_id)
			}} style={rowStyles.singlesContainer}>
				<Image source={{
					source: props.profile_picture_url
				}} style={rowStyles.photo} />
				<Text style={rowStyles.name} >
					{`${props.first_name} ${props.last_name}`}
				</Text>
				<Text style={rowStyles.text} >
					Anteckningar: {props.notes}
				</Text>
				<Text style={rowStyles.text}>
					Kön: {props.gender}
				</Text>
				{displaySkill(props)}
			</TouchableOpacity>
		)
	}
	if (props.doubles) {
		return (
			<View>
				<View style={rowStyles.doublesContainer}>
					<View style={rowStyles.leftTextBox}>
						<TouchableOpacity onPress={ () => {
							props.viewPlayer(props.player1_id)
						}}>
							<Text style={rowStyles.name}>
								{`${props.player1_first_name} ${props.player1_last_name}`}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={rowStyles.centerTextBox}>
						<Text style={rowStyles.name}>
							&
						</Text>
					</View>
					<View style={rowStyles.rightTextBox}>
						<TouchableOpacity onPress={() => {
							props.viewPlayer(props.player2_id)
						}}>
							<Text style={rowStyles.name} >
								{`${props.player2_first_name} ${props.player2_last_name}`}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={rowStyles.elo}>
					Rank: {props.rank}
				</Text>
			</View>
		)
	}
}


const rowStyles = StyleSheet.create({
	doublesContainer:{
		flex: 1,
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	singlesContainer: {
		flex: 1,
		padding: 12,
		flexDirection: "column",
		alignItems: "center",
	},
	centerTextBox: {
		flex:1,
	},
	rightTextBox: {
		flex:4,
	},
	leftTextBox: {
		flex:4,
	},
	name: {
		flex:1,
		margin: 10,
		fontSize: 18,
		fontWeight: "bold",
		// textAlign: 'center'
	},
	text: {
		marginLeft: 12,
		fontSize: 16,
	},
	elo: {
		margin: 10,
		fontSize: 16,
		textAlign: "center"
	},
	photo: {
		height: 40,
		width: 40,
		borderRadius: 20,
	},
})
