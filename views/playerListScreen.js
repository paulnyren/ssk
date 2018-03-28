import React from "react"
import PlayerList from "./playerList"

export default class PlayerListScreen extends React.Component {
	static navigationOptions = {
		title: "Players",
	};
	render() {
		return (<PlayerList ladder={false} navigation={this.props.navigation} />)
	}
}
