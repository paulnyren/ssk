import {
	DB_INTERACTION_PATH
} from "./constants"
export default function getPlayers(orderBy, order) {
	const query = JSON.stringify({
		params: {
			table: "players",
			orderBy: orderBy ? orderBy : "last_name",
			order: order ? order : "ASC"
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