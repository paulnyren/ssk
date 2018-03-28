import React, {
	Component 
} from "react"
import DatePicker from "react-native-datepicker"

export default class datepicker extends Component {
	constructor(props){
		super(props)
		var today = new Date()
		this.state = today.getDate()
	}

	render(){
		return (
			<DatePicker
				date={this.state.date}
				mode="date"
				format="YYYY-MM-DD"
				hideText='true'
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				// customStyles={{
				//   dateIcon: {
				//     position: 'absolute',
				//     left: 0,
				//     top: 4,
				//     marginLeft: 0
				//   },
				//   dateInput: {
				//     marginLeft: 36
				//   }
				//   // ... You can check the source to find the other keys.
				// }}
				onDateChange={(date) => {
					this.setState({
						date: date
					}) 
				}}
			/>
		)
	}
}
