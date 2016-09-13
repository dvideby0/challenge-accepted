'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';
import Login from './components/Login';

/*
 * Main app which houses navigator
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, nav) {
    if (route.component) {
      // pass navigator and route info
      var props = {navigator: nav, route: route};
      // expose any additional props
      if (route.props) {
        Object.assign(props, route.props);
      }
      return React.createElement(route.component, props);
    }
  }

  render() {
    return (
      <Navigator
        title='Challenge Accepted'
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{
            component: Login, title: 'Challenge Accepted'
          }}>
      </Navigator>
    );
  }
}

AppRegistry.registerComponent('ChallengeAccepted', () => App);
