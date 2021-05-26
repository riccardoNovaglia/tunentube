import { Component } from "react";

export default class Meter extends Component {
  state = {
    cents: new Animated.Value(0),
  };

  componentDidUpdate() {
    Animated.timing(this.state.cents, {
      toValue: this.props.cents,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const cents = this.state.cents.interpolate({
      inputRange: [-50, 50],
      outputRange: ["-45deg", "45deg"],
    });

    const pointerStyle = {
      transform: [{ rotate: cents }],
    };

    return (
      <div style={style.meter}>
        <div style={style.origin} />
        <div style={[style.scale, style.strong, style.pointer, pointerStyle]} />
        <div style={[style.scale, style.scale_5, style.strong]} />
        <div style={[style.scale, style.scale_4]} />
        <div style={[style.scale, style.scale_3]} />
        <div style={[style.scale, style.scale_2]} />
        <div style={[style.scale, style.scale_1]} />
        <div style={[style.scale, style.strong]} />
        <div style={[style.scale, style.scale1]} />
        <div style={[style.scale, style.scale2]} />
        <div style={[style.scale, style.scale3]} />
        <div style={[style.scale, style.scale4]} />
        <div style={[style.scale, style.scale5, style.strong]} />
      </div>
    );
  }
}
