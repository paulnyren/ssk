import {
	DB_INTERACTION_PATH
} from "./constants"
const query = JSON.stringify({
	params: {
		table: "players",
		select:[
			{
				name: "first_name",
				as: "first_name"
			},
			{
				name:"last_name",
				as:"last_name"
			},
			{
				name:"player_id",
				as:"referee_id"
			}
		]
	}
})
export default function getReferees() {
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