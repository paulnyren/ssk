import {
	ADD_DOUBLES_MATCH_PATH
} from "./constants"
import elo from "./elo"
export default function addDoublesMatch(winnerObject, loserObject, refereeObject, winnerScore, loserScore, date, court, notes) {
	const winnerNewElo = elo().getNewRating(winnerObject.elo_rank, loserObject.elo_rank, 1)
	const loserNewElo = elo().getNewRating(loserObject.elo_rank, winnerObject.elo_rank, 0)
	return fetch(ADD_DOUBLES_MATCH_PATH, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			params: {
				winnerId: winnerObject.team_id,
				loserId: loserObject.team_id,
				winnerScore: parseInt(winnerScore),
				loserScore: parseInt(loserScore),
				court: parseInt(court),
				refereeId: refereeObject.player_id,
				notes: notes,
				date: date,
				winnerNewElo: parseInt(winnerNewElo),
				loserNewElo: parseInt(loserNewElo)
			}
		}),
	}).then((data) => {
		return data
	})
		.then((responseJson) => {
			return responseJson
		})
}