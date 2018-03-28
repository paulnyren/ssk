import {
	Platform
} from "react-native"
export const INITIAL_ELO = 1200
export const DB_INTERACTION_PATH = Platform.os == "ios"?"https://wproj.csc.kth.se/~oscaris/dbInteraction.php":"http://wproj.csc.kth.se/~oscaris/dbInteraction.php"
export const CREATE_ADMIN_PATH = Platform.os == "ios"?"https://wproj.csc.kth.se/~oscaris/createAdmin.php":"http://wproj.csc.kth.se/~oscaris/createAdmin.php"
export const ADD_TEAM_PATH = Platform.os == "ios"?"https://wproj.csc.kth.se/~oscaris/addTeam.php":"http://wproj.csc.kth.se/~oscaris/addTeam.php"
export const LOGIN_PATH = Platform.os == "ios"?"https://wproj.csc.kth.se/~oscaris/login.php":"http://wproj.csc.kth.se/~oscaris/login.php"
export const ADD_SINGLES_MATCH_PATH = Platform.os == "ios"?"https://wproj.csc.kth.se/~oscaris/addSinglesMatch.php":"http://wproj.csc.kth.se/~oscaris/addSinglesMatch.php"
export const ADD_DOUBLES_MATCH_PATH = Platform.os == "ios"?"https://wproj.csc.kth.se/~oscaris/addDoublesMatch.php":"http://wproj.csc.kth.se/~oscaris/addDoublesMatch.php"
export const ADD_PLAYER_PATH = Platform.os=="ios"?"https://wproj.csc.kth.se/~oscaris/addPlayer.php":"http://wproj.csc.kth.se/~oscaris/addPlayer.php"
export const REMOVE_OR_ADD_TO_LADDER_PATH = Platform.os =="ios"? "https://wproj.csc.kth.se/~oscaris/removeOrAddToLadder.php" : "http://wproj.csc.kth.se/~oscaris/removeOrAddToLadder.php"