import React from "react"
import PlayerList from "./playerList"

export default class LadderScreenSingles extends React.Component {
	static navigationOptions = {
		title: "Ladder",
		tabBarLabel: "singles ladder"
	};
	render() {
		return (
			<PlayerList ladder={true} doubles={false} navigation={this.props.navigation} />
		)
	}
}
