import {
	CREATE_ADMIN_PATH
} from "./constants"
export default function addAdmin(adminObject) {
	return fetch(CREATE_ADMIN_PATH, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			params: {
				user_name: adminObject.username,
				password: adminObject.password
			}
		}),
	}).then((data) => {
		return data.json()
	})
		.then((responseJson) => {
			return responseJson
		})
}