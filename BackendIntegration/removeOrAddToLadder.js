import {
	REMOVE_OR_ADD_TO_LADDER_PATH
} from "./constants"
export default function removeOrAddToLadder(playerObject){
	return fetch(REMOVE_OR_ADD_TO_LADDER_PATH, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			params: {
				playerId:playerObject.player_id
			}
		}),
	}).then((data) => {
		return data
	})
		.then((responseJson) => {
			return responseJson
		})
}