import React, { Component } from "react";
import { Provider } from "react-redux";
import Navigator from './navigator';
import myStore from "./myStore";

class App extends Component {
  render() {
    return (
        <Provider store={myStore}>
           <Navigator />
        </Provider>
    );
  }
}

export default App;