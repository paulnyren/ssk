import {
	ADD_PLAYER_PATH, INITIAL_ELO
} from "./constants"
export default function addPlayer(playerObject) {
	playerObject.eloRank = INITIAL_ELO
	return fetch(ADD_PLAYER_PATH, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			params: playerObject
		}),
	}).then((data) => {
		return data
	})
		.then((responseJson) => {
			return responseJson
		})
}
