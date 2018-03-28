import {
	DB_INTERACTION_PATH
} from "./constants"

export default function getSinglesLadder(orderBy, order) {
	const query = JSON.stringify({
		params: {
			table: "singles_ladder",
			select: [
				{
					name: "players.player_id",
					as: "player_id"
				},
				{
					name: "players.first_name",
					as: "first_name"
				},
				{
					name:"players.last_name",
					as:"last_name"
				},
				{
					name:"players.gender",
					as:"gender"
				},
				{
					name:"players.profile_picture_url",
					as:"profile_picture_url"
				},
				{
					name:"players.notes",
					as:"notes"
				},
				{
					name:"players.email",
					as:"email"
				},
				{
					name:"players.address",
					as:"address"
				},
				{
					name:"players.personal_number",
					as:"personal_number"
				},
				{
					name:"players.phone_number",
					as:"phone_number"
				},
				{
					name:"players.elo_rank",
					as:"elo_rank"
				},
				{
					name:"singles_ladder.rank",
					as:"rank"
				}
			],
			join: [
				{
					joinTable: "players",
					as: "players",
					joinOn: {
						firstJoin: "players.player_id",
						secondJoin: "singles_ladder.player_id"
					}
				}
			],
			order:order,
			orderBy:orderBy
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