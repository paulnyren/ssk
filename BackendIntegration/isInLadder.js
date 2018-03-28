import {
	DB_INTERACTION_PATH
} from "./constants"

export default function isInLadder(playerObject) {
	const query = JSON.stringify({
		params: {
			table: "singles_ladder",
			where: [
				{
					key: "player_id",
					value: playerObject.player_id
				}
			]
		}
	})
	return fetch(DB_INTERACTION_PATH+"?query="+query, {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
	}).then((data) => {
		return data.json()
	})
		.then((responseJson) => {
			if (responseJson[0]) {
				if (responseJson[0]["player_id"]) {
					return true
				}
			} else {
				return false
			}
		})
}