import {
	DB_INTERACTION_PATH
} from "./constants"
import getReferees from "./getReferees"
export default function getDoublesMatchesByPlayerId(playerId) {
	const query = JSON.stringify({
		params: {
			table: "doubles_matches",
			select: [
				{
					name: "doubles_matches.match_id",
					as: "match_id"
				},
				{
					name: "doubles_matches.winner",
					as: "winner"
				},
				{
					name: "doubles_matches.loser",
					as: "loser"
				},
				{
					name: "doubles_matches.match_date",
					as: "match_date"
				},
				{
					name: "winner1.player_id",
					as: "winner1_player_id"
				},
				{
					name: "winner1.first_name",
					as: "winner1_first_name"
				},
				{
					name: "winner1.last_name",
					as: "winner1_last_name"
				},
				{
					name: "winner2.player_id",
					as: "winner2_player_id"
				},
				{
					name: "winner2.first_name",
					as: "winner2_first_name"
				},
				{
					name: "winner2.last_name",
					as: "winner2_last_name"
				},
				{
					name: "loser1.player_id",
					as: "loser1_player_id"
				},
				{
					name: "loser1.first_name",
					as: "loser1_first_name"
				},
				{
					name: "loser1.last_name",
					as: "loser1_last_name"
				},
				{
					name: "loser2.player_id",
					as: "loser2_player_id"
				},
				{
					name: "loser2.first_name",
					as: "loser2_first_name"
				},
				{
					name: "loser2.last_name",
					as: "loser2_last_name"
				},
				{
					name: "doubles_matches.match_date",
					as: "match_date"
				},
				{
					name: "doubles_matches.winner_score",
					as: "winner_score"
				},
				{
					name: "doubles_matches.loser_score",
					as: "loser_score"
				},
				{
					name: "doubles_matches.court",
					as: "court"
				},
				{
					name: "doubles_matches.referee",
					as: "referee"
				},
				{
					name: "doubles_matches.notes",
					as: "notes"
				}
			],
			where: [
				{
					key: "winner1.player_id",
					value: playerId,
					separator: "OR"
				},
				{
					key: "winner2.player_id",
					value: playerId,
					separator: "OR"
				},
				{
					key: "loser1.player_id",
					value: playerId,
					separator: "OR"
				},
				{
					key: "loser2.player_id",
					value: playerId,
					separator: "OR"
				},
				{
					key: "doubles_matches.referee",
					value: playerId,
				},
			],
			join: [
				{
					joinTable: "teams",
					as: "winnerTeam",
					joinOn: {
						firstJoin: "doubles_matches.winner",
						secondJoin: "winnerTeam.team_id"
					}
				},
				{
					joinTable: "teams",
					as: "loserTeam",
					joinOn: {
						firstJoin: "doubles_matches.loser",
						secondJoin: "loserTeam.team_id"
					}
				},
				{
					joinTable: "players",
					as: "winner1",
					joinOn: {
						firstJoin: "winnerTeam.player_1",
						secondJoin: "winner1.player_id"
					},
				},
				{
					joinTable: "players",
					as: "winner2",
					joinOn: {
						firstJoin: "winnerTeam.player_2",
						secondJoin: "winner2.player_id"
					},
				},
				{
					joinTable: "players",
					as: "loser1",
					joinOn: {
						firstJoin: "loserTeam.player_1",
						secondJoin: "loser1.player_id"
					},
				},
				{
					joinTable: "players",
					as: "loser2",
					joinOn: {
						firstJoin: "loserTeam.player_2",
						secondJoin: "loser2.player_id"
					},
				}
			],
			sortBy: "match_date",
			sort: "DESC"
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
			return getReferees().then((referees)=> {
				for (let i=0;i<responseJson.length;i++){
					for (let j=0;j<referees.length;j++){
						if(responseJson[i].referee == referees[j].referee_id){
							responseJson[i].referee_last_name = referees[j].last_name
							responseJson[i].referee_first_name = referees[j].first_name
						}
					}
				}
				return responseJson
			})
		})
}