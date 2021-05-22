import { Component } from "react";

export default class Meter extends Component {
  state = {
    // cents: new Animated.Value(0),
  };

  componentDidUpdate() {
    // Animated.timing(this.state.cents, {
    //   toValue: this.props.cents,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  }

  render() {
    // const cents = this.state.cents.interpolate({
    //   inputRange: [-50, 50],
    //   outputRange: ["-45deg", "45deg"],
    // });

    // const pointerStyle = {
    //   transform: [{ rotate: cents }],
    // };

    return (
      <p>meter</p>
      // <View style={style.meter}>
      //   <View style={style.origin} />
      //   <Animated.View
      //     style={[style.scale, style.strong, style.pointer, pointerStyle]}
      //   />
      //   <View style={[style.scale, style.scale_5, style.strong]} />
      //   <View style={[style.scale, style.scale_4]} />
      //   <View style={[style.scale, style.scale_3]} />
      //   <View style={[style.scale, style.scale_2]} />
      //   <View style={[style.scale, style.scale_1]} />
      //   <View style={[style.scale, style.strong]} />
      //   <View style={[style.scale, style.scale1]} />
      //   <View style={[style.scale, style.scale2]} />
      //   <View style={[style.scale, style.scale3]} />
      //   <View style={[style.scale, style.scale4]} />
      //   <View style={[style.scale, style.scale5, style.strong]} />
      // </View>
    );
  }
}
