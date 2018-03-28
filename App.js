import React from "react"
import {
	StyleSheet, Image, TouchableOpacity
} from "react-native"
import {
	StackNavigator, DrawerNavigator, TabNavigator, SwitchNavigator
} from "react-navigation"
import WelcomeScreen from "./views/welcomeScreen"
import LadderScreenSingles from "./views/ladderScreenSingles"
import LadderScreenDoubles from "./views/ladderScreenDoubles"
import PlayerScreen from "./views/playerScreen"
import PlayerListScreen from "./views/playerListScreen"
import DoublesMatchesScreen from "./views/doublesMatchesScreen"
import AddSinglesMatch from "./views/addSinglesMatch.js"
import AddDoublesMatch from "./views/addDoublesMatch.js"
import SinglesMatchesScreen from "./views/singlesMatchesScreen"
import AddPlayerScreen from "./views/addPlayerScreen"
import AddTeamScreen from "./views/addTeamsScreen"
import AdminLoginScreen from "./views/adminLoginScreen"
import AddAdminScreen from "./views/addAdminScreen"
import AdminWelcomeScreen from "./views/adminWelcomeScreen"
import AdminLogout from "./views/adminLogout"
import PlayerAdminScreen from "./views/playerAdminScreen"

const matchesNavigator = TabNavigator({
	Singles: {
		screen: SinglesMatchesScreen
	},
	Doubles: {
		screen: DoublesMatchesScreen
	}
},
{
	navigationOptions: {
		title: "Recent Matches",
		headerTitle: "Recent Matches"
	}
})

const matchesScreenNavigator = StackNavigator({
	matches: {
		screen: matchesNavigator
	},
	player: {
		screen: PlayerScreen
	}
},
{
	initialRouteName: "matches",
	headerMode: "none",
	title: "Matches"
}
)

const adminMatchesScreenNavigator = StackNavigator({
	matches: {
		screen: matchesNavigator
	},
	player: {
		screen: PlayerAdminScreen
	}
},
{
	initialRouteName: "matches",
	headerMode: "none",
	title: "Matches"
}
)

const ladderNavigator = TabNavigator({
	Singles: {
		screen: LadderScreenSingles
	},
	Doubles: {
		screen: LadderScreenDoubles
	}
}, {
	navigationOptions: {
		title: "Ladder",
		headerTitle: "Ladder"
	}
})

const ladderScreenNavigator = StackNavigator({
	ladder: {
		screen: ladderNavigator
	},
	player: {
		screen: PlayerScreen
	}
},
{
	initialRouteName: "ladder",
	headerMode: "none",
	title: "Ladder"
}
)

const adminLadderScreenNavigator = StackNavigator({
	ladder: {
		screen: ladderNavigator
	},
	player: {
		screen: PlayerAdminScreen
	}
},
{
	initialRouteName: "ladder",
	headerMode: "none",
	title: "Ladder"
}
)

const playerListScreenNavigator = StackNavigator({
	playerList: {
		screen: PlayerListScreen
	},
	player: {
		screen: PlayerScreen
	}
},
{
	initialRouteName: "playerList",
	headerMode: "none"
}
)
const adminPlayerListScreenNavigator = StackNavigator({
	playerList: {
		screen: PlayerListScreen
	},
	player: {
		screen: PlayerAdminScreen
	}
},
{
	initialRouteName: "playerList",
	headerMode: "none"
}
)

const addMatchNavigator = TabNavigator({
	Singles: {
		screen: AddSinglesMatch
	},
	Doubles: {
		screen: AddDoublesMatch
	}
}, {
	navigationOptions: {
		title: "Add match",
		headerTitle: "Add match",
	}
})


// drawer stack
const adminDrawerStack = DrawerNavigator({

	screen3: {
		screen: WelcomeScreen
	},
	ladder: {
		screen: adminLadderScreenNavigator,
	},
	players: {
		screen: adminPlayerListScreenNavigator
	},
	Matches: {
		screen: adminMatchesScreenNavigator
	},
	AddPlayer: {
		screen: AddPlayerScreen
	},
	addMatch: {
		screen: addMatchNavigator
	},
	addTeam: {
		screen: AddTeamScreen
	},
	AddAdmin: {
		screen: AddAdminScreen
	},
	adminwelcome: {
		screen: AdminWelcomeScreen
	},
	adminlogout: {
		screen: AdminLogout
	}
}, {
	initialRouteName: "adminwelcome"
}
)

const guestDrawerStack = DrawerNavigator({
	screen3: {
		screen: WelcomeScreen
	},
	ladder: {
		screen: ladderScreenNavigator,
	},
	players: {
		screen: playerListScreenNavigator
	},
	Matches: {
		screen: matchesScreenNavigator
	},
	AdminLogin: {
		screen: AdminLoginScreen
	}
}
)


const guestDrawer = StackNavigator({
	DrawerStack: {
		screen: guestDrawerStack
	}
}, {
	headerMode: "float",

	navigationOptions: ({
		navigation
	}) => ({
		headerRight:
			<TouchableOpacity onPress={() => navigation.navigate("DrawerToggle")} >
				<Image style={styles.drawerButton}
					source={require("./skk_logga.png")} />
			</TouchableOpacity>,

		headerTintColor: "black",
	})

})
// login stack
const guestNavigator = StackNavigator({
	drawerStack: {
		screen: guestDrawer
	},
},
{
	// Default config for all screens
	headerMode: "none",
	title: "Main",
	initialRouteName: "drawerStack"
})


const adminDrawer = StackNavigator({
	DrawerStack: {
		screen: adminDrawerStack
	}
}, {
	headerMode: "float",

	navigationOptions: ({
		navigation
	}) => ({
		headerRight:
			<TouchableOpacity onPress={() => navigation.navigate("DrawerToggle")} >
				<Image style={styles.drawerButton}
					source={require("./skk_logga.png")} />
			</TouchableOpacity>,

		headerTintColor: "black",
	})

})

const adminNavigator = StackNavigator({
	drawerStack: {
		screen: adminDrawer
	}
},
{
	// Default config for all screens
	headerMode: "none",
	title: "Main",
	initialRouteName: "drawerStack"
})

const PrimaryNav = SwitchNavigator({
	guest: {
		screen: guestNavigator
	},
	admin: {
		screen: adminNavigator
	}
}, {
	initialRouteName: "guest"
})
export default class App extends React.Component {
	render() {
		return <PrimaryNav />
	}
}

const styles = StyleSheet.create({
	drawerButton: {
		flex: 1,
		width: 50,
		height: 50,
		resizeMode: "contain"
	}
})
