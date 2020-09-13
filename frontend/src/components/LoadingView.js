import React, { Component } from "react";
import { PropagateLoader } from "react-spinners";

class LoadingView extends Component {
  render() {
    return (
      <div>
        <PropagateLoader color={"blue"} loading={true} />
      </div>
    );
  }
}
export default LoadingView;