import React from "react"
import {
	StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity
} from "react-native"
import getPlayerById from "../BackendIntegration/getPlayerById"
import removeOrAddToLadder from "../BackendIntegration/removeOrAddToLadder"
import isInLadder from "../BackendIntegration/isInLadder"
import getPlayersOfSimilarSkill from "../BackendIntegration/getPlayersOfSimilarSkill"
import MatchList from "./matchList"

export default class PlayerScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			potentialOpponents:[],
			error: false,
			addError: false
		}
	}


	static navigationOptions = ({
		navigation
	}) => {
		const {
			params
		} = navigation.state

		return {
			headerLeft: <TouchableOpacity onPress={() => navigation.goBack()} >
				<Image style={styles.backbutton}
					source={require("../backarrow.png")} />
			</TouchableOpacity>,
			title: params ? "Player" : "404",
		}
	};

	componentDidMount() {
		getPlayerById(this.props.navigation.state.params.player_id).then((data) => {
			this.setState({
				isLoading: false,
				playerObject: data[0]
			})
			return data[0]
		})
			.then((playerObject)=>{
				isInLadder(playerObject).then((isInLadder) => {
					this.setState({
						isInLadder: isInLadder
					})
				})
				getPlayersOfSimilarSkill(playerObject.player_id, playerObject.elo_rank).then((opponents) => this.setState({
					potentialOpponents: opponents
				})
				)
			})
			.catch(()=>{
				this.setState({
					error: true
				})
			})
	}

	similarSkill(){
		return (
			<View>
				<Text>Opponents of similar skill:</Text>
				{this.state.potentialOpponents.map(function(opponent, index){
					return <Text key={index}>{`${opponent.first_name} ${opponent.last_name}`}</Text>
				})}
			</View>
		)
	}

	addOrRemove(){
		if(this.state.isInLadder){
			return (
				<TouchableOpacity onPress={ () => {
					
					removeOrAddToLadder(this.state.playerObject).then(()=>this.setState({
						isInLadder: !this.state.isInLadder
					}))
						.catch(()=>this.setState({
							addError: true
						}))
				}} style={styles.button}>
					<Text>Remove from ladder</Text>
				</TouchableOpacity>
			)
		}else{
			return(
				<TouchableOpacity onPress={ () => {
					removeOrAddToLadder(this.state.playerObject).then(()=>this.setState({
						isInLadder: !this.state.isInLadder
					}))
						.catch(()=>this.setState({
							addError: true
						}))
				}}
				style={styles.button}
				>
					<Text>Add to ladder</Text>
				</TouchableOpacity>
			)
		}
	}

	renderImage(){
		return this.state.playerObject.profile_picture_url? 
			<Image style={styles.image} source={{
				uri: this.state.playerObject.profile_picture_url
			}} />
			: undefined
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
		const playerObject = this.state.playerObject
		return (
			<ScrollView>
				
				<Text style={styles.title}>
					{playerObject.first_name} {playerObject.last_name}
				</Text>
				<Text style={styles.text}>
					{playerObject.notes}
				</Text>
				{this.renderImage()}
				<View style={styles.container}>
					{this.similarSkill()}
					<Text>
					They an elo ranking of: {playerObject.elo_rank}
					</Text>
					<Text>
					Telephone number: {playerObject.phone_number}
					</Text>
					<Text>
					Email address: {playerObject.email}
					</Text>
					<Text>
					Personal number: {playerObject.personal_number}
					</Text>
					<Text>
					Street address: {playerObject.address}
					</Text>
					<Text style={styles.title}>
					Singles matches:
					</Text>
					<View style={styles.matchesView}>
						<ScrollView>
							<MatchList playerId={this.props.navigation.state.params.player_id} navigation={this.props.navigation} />
						</ScrollView>
					</View>
					<Text style={styles.title}>
					Doubles matches:
					</Text>
					<View style={styles.matchesView}>
						<ScrollView>
							<MatchList playerId={this.props.navigation.state.params.player_id} doubles navigation={this.props.navigation} />
						</ScrollView>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.buttonContainer}>
						{this.addOrRemove()}
					</View>
					{this.state.addError&&
					<Text>
						Could not add player, please try again.
					</Text>
					}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center"
	},
	loadingContainer: {
		flex: 1,
		paddingTop: 20
	},
	title: {
		fontSize: 20,
		textAlign: "center"
	},
	matchesView: {

		width: "85%",
		borderStyle: "solid",
		borderWidth: 1
	},
	image: {
		marginTop: 10,
		height: 100,
		width: "auto",
		resizeMode: "contain"
	},

	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "85%",
		alignItems: "center"
	},
	button: {
		width: "45%",
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
	backbutton:{
		flex: 1,
		width: 50,
		height: 50,
		resizeMode: "contain"
	}
})
