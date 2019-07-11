import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Platform,
  Text,
  Keyboard,
  TimePickerIOS,
  TimePickerAndroid
} from "react-native";
import variable from "./theme/variables/platform";
import PropTypes from "prop-types";
import { TextField } from 'react-native-material-textfield';

export class TimePicker extends React.Component {

  static propTypes = {
    mode: PropTypes.oneOf(["date", "time", "datetime"]),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
    is24Hour: PropTypes.bool,
    isVisible: PropTypes.bool,
    timePickerModeAndroid: PropTypes.oneOf(["clock", "spinner", "default"]),
  };

  static defaultProps = {
    date: new Date(),
    mode: "date",
    timePickerModeAndroid: "default",
    is24Hour: true,
    isVisible: false,
    onHideAfterConfirm: () => {}
  };

  constructor(props) {
    super(props);
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    this.state = {
      // modalVisible: false,
      defaultDate: props.defaultDate ? props.defaultDate : new Date(),
      chosenTime: !props.placeHolderText && props.defaultDate ? props.defaultDate : time
    };
  }

  showTimePicker() {
    Keyboard.dismiss();
    if (Platform.OS === "android") {
      this.openAndroidTimePicker();
    } else {
      // this.setState({ modalVisible: true });
    }
  }

  async openAndroidTimePicker() {
    let picked;
    try {
      picked = await TimePickerAndroid.open({
        hour: this.props.date.getHours(),
        minute: this.props.date.getMinutes(),
        is24Hour: this.props.is24Hour,
        mode: this.props.timePickerModeAndroid
      });
    } catch ({ message }) {
      console.warn("Cannot open time picker", message);
      return;
    }

    const { action, hour, minute } = picked;
    if (action !== TimePickerAndroid.dismissedAction) {
      let date;
      if (this.props.date) {
        // This prevents losing the Date elements, see issue #71
        const year = this.props.date.getFullYear();
        const month = this.props.date.getMonth();
        const day = this.props.date.getDate();
        date = new Date(year, month, day, hour, minute);
      } else {
        date = new Date().setHours(hour).setMinutes(minute);
      }
      var time = date.getHours() + ":" + date.getMinutes();
      this.setState({ chosenTime: time });
      this.props.onConfirm({date: date, field_form: this.props.fieldForm});
      this.props.onHideAfterConfirm(date);
    } else {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <View>
        <TextField
          labelTextStyle={this.props.labelTextStyle}
          containerStyle={this.props.containerStyle}
          tintColor='#9dc107'
          label={this.props.titleInput}
          value={this.state.chosenTime}
          onFocus={ !this.props.disabled ? this.showTimePicker.bind(this) : undefined }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },
  containerInput:{
    flex: 1,
  },
  inputLeft:{
    paddingRight: 20
  },
  inputRight:{
    paddingLeft: 20
  },
});
