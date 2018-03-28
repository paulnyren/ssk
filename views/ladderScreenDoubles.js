import React from "react"
import PlayerList from "./playerList"

export default class LadderScreenDoubles extends React.Component {
	static navigationOptions = {
		title: "Ladder",
		tabBarLabel: "Doubles ladder"
	};
	render() {
		return (
			<PlayerList ladder={true} doubles={true} navigation={this.props.navigation} />
		)
	}
}
