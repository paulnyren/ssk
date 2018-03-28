import {
	LOGIN_PATH
} from "./constants"

export default function login(loginObject) {
	const query = JSON.stringify({
		params: {
			user_name: loginObject.username,
			password: loginObject.password
		}
	})
	return fetch(LOGIN_PATH+"?query="+query, {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	}).then((data) => {
		return data.json()
	})
		.then((responseJson) => {
			return responseJson
		})
}