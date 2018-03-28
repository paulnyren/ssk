import React from "react"
import MatchList from "./matchList"
export default class DoublesMatchesScreen extends React.Component {
	static navigationOptions = {
		title: "Recent Matches",
		tabBarLabel: "Singles"
	};
	render() {
		return (
			<MatchList navigation={this.props.navigation} />
		)
	}
}
