import React from "react"
import {
	StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator
} from "react-native"
import getPlayerById from "../BackendIntegration/getPlayerById"
import MatchList from "./matchList"

export default class PlayerScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			error: false
		}
	}


	static navigationOptions = ({
		navigation
	}) => {
		const {
			params
		} = navigation.state

		return {
			headerLeft:
				<TouchableOpacity onPress={() => navigation.goBack()} >
					<Image style={styles.button}
						source={require("../backarrow.png")} />
				</TouchableOpacity>,
			title: params ? "Player" : "404",
		}
	};

	componentDidMount() {
		getPlayerById(this.props.navigation.state.params.player_id).then((data) => this.setState({
			isLoading: false,
			playerObject: data[0]
		}))
			.catch(()=>{
				this.setState({
					error: true
				})
			})
		


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
				<View style={styles.container}>
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
				{this.renderImage()}
				<View style={styles.container}>
					<Text style={styles.text}>
						{playerObject.notes}
					</Text>
					<Text>
					They have an elo ranking of: {playerObject.elo_rank}
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
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		alignItems: "center"
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
	text: {
		padding: 20
	},
	button: {
		flex: 1,
		width: 50,
		height: 50,
		resizeMode: "contain"
	}
})