import {
	DB_INTERACTION_PATH
} from "./constants"
import getReferees from "./getReferees"
const query = JSON.stringify({
	params: {
		order: "DESC",
		orderBy:"singles_matches.match_date",

		table: "singles_matches",
		select: [
			{
				name: "singles_matches.match_id",
				as: "match_id"
			},
			{
				name: "singles_matches.winner",
				as: "winner"
			},
			{
				name: "winners.first_name",
				as: "winner_first_name"
			},
			{
				name: "winners.last_name",
				as: "winner_last_name"
			},
			{
				name: "losers.first_name",
				as: "loser_first_name"
			},
			{
				name: "losers.last_name",
				as: "loser_last_name"
			},
			{
				name: "singles_matches.loser",
				as: "loser"
			},
			{
				name: "singles_matches.match_date",
				as: "match_date"
			},
			{
				name: "singles_matches.winner_score",
				as: "winner_score"
			},
			{
				name: "singles_matches.loser_score",
				as: "loser_score"
			},
			{
				name: "singles_matches.court",
				as: "court"
			},
			{
				name: "singles_matches.referee",
				as: "referee"
			},
			{
				name: "singles_matches.notes",
				as: "notes"
			}
		],
		join: [
			{
				joinTable: "players",
				as: "winners",
				joinOn: {
					firstJoin: "singles_matches.winner",
					secondJoin: "winners.player_id"
				}
			},
			{
				joinTable: "players",
				as: "losers",
				joinOn: {
					firstJoin: "singles_matches.loser",
					secondJoin: "losers.player_id"
				}
			}
		]
	}
})
export default function getSinglesMatches() {
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