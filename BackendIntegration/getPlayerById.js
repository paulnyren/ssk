import {
	DB_INTERACTION_PATH
} from "./constants"
export default function getPlayerById(id) {
	const query = JSON.stringify({
		params: {
			table: "players",
			where: [
				{
					key: "player_id",
					value: id
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
			return responseJson
		})
}