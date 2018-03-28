import {
	DB_INTERACTION_PATH
} from "./constants"
const query = JSON.stringify({
	params: {
		table: "teams",
		select: [
			{
				name: "teams.team_id",
				as: "team_id"
			},
			{
				name: "teams.elo_rank",
				as: "elo_rank"
			},
			{
				name: "player1.player_id",
				as: "player1_id"
			},
			{
				name: "player1.first_name",
				as: "player1_first_name"
			},
			{
				name: "player1.last_name",
				as: "player1_last_name"
			},
			{
				name: "player2.player_id",
				as: "player2_id"
			},
			{
				name: "player2.first_name",
				as: "player2_first_name"
			},
			{
				name: "player2.last_name",
				as: "player2_last_name"
			},
			{
				name: "doubles_ladder.rank",
				as: "rank"
			}
		],
		join: [
			{
				joinTable: "players",
				as: "player1",
				joinOn: {
					firstJoin: "teams.player_1",
					secondJoin: "player1.player_id"
				}
			},
			{
				joinTable: "players",
				as: "player2",
				joinOn: {
					firstJoin: "teams.player_2",
					secondJoin: "player2.player_id"
				}
			},
			{
				joinTable: "doubles_ladder",
				as:"doubles_ladder",
				joinOn:{
					firstJoin: "doubles_ladder.team",
					secondJoin: "teams.team_id"
				}
			}
		],
		orderBy: "doubles_ladder.rank",
		order: "ASC"
	}
})
export default function getTeams() {
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