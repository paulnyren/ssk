import {
	DB_INTERACTION_PATH
} from "./constants"

export default function getPlayersOfSimilarSkill(id, elo){
	const query = JSON.stringify({
		params: {
			table:"players",
			select:[
				{
					name:"first_name"
				},
				{
					name:"last_name"
				},
				{
					name:"elo_rank"
				}
			],
			where:[
				{
					key:"player_id",
					value:id,
					comparator:"<>"
				}
			],
			orderBy: "ABS(elo_rank-" + elo + ")",
			order: "ASC",
			limit:3
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
