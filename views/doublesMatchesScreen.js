import React from "react"
import MatchList from "./matchList"
export default class DoublesMatchesScreen extends React.Component {
	static navigationOptions = {
		title: "Recent Matches",
		tabBarLabel: "Doubles"
	};
	render() {
		return (
			<MatchList navigation={this.props.navigation} doubles={true} />
		)
	}
}
