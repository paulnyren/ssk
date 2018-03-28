import {
	ADD_TEAM_PATH, INITIAL_ELO
} from "./constants"
export default function addTeam(player1Object, player2Object) {
	return fetch(ADD_TEAM_PATH, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			params: {
				player_1: player1Object.player_id,
				player_2: player2Object.player_id,
				elo_rank: INITIAL_ELO
			}
		})
	}).then((data) => {
		return data
	})
		.then((responseJson) => {
			return responseJson
		})
}