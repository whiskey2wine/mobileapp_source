import React from 'react';
import {
    StatusBar,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Profile from './Profile';
import Menu from './menu';
import History from './history';

import type { NavigationState } from 'react-native-tab-view/types';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class TabView extends React.Component {
    constructor(props) {
      super(props);
    }

    static title = 'NOB-HILL CAFE';

    state = {
        index: 0,
        routes: [
          { key: '1', title: 'Profile' },
          { key: '2', title: 'Menu' },
          { key: '3', title: 'History' },
        ],
    };
    
    _handleIndexChange = index => {
        this.setState({
          index,
        });
    };
    
    _renderHeader = props => {
        return (
          <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            labelStyle={styles.label}
          />
        );
    };
  
     _handleBackPress() {
      this.props.navigator.pop();
    }

    _renderScene = ({ route }) => {
        switch (route.key) {
          case '1':
            return (
              <Profile
                state={this.state}
              />
            );
          case '2':
            return (
              <Menu
                state={this.state}
              />
            );
          case '3':
            return (
              <History
                state={this.state}
              />
            );
          default:
            return null;
        }
    };

    render() {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />  
          <View style={styles.statusbar}/>
          <TabViewAnimated
              style={[styles.container, this.props.style]}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderHeader={this._renderHeader}
              onIndexChange={this._handleIndexChange}
              initialLayout={initialLayout}
          />
          {/* { this.state.index === 0 ? ( */}
            <TouchableOpacity style={[styles.button, { backgroundColor: '#D95E54' }]}
              onPress={() => {
                  this._handleBackPress();
              }}
            >
              <Text style={styles.textBtn}>Logout</Text>
            </TouchableOpacity>  
          {/* ) : null} */}
        </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
    tabbar: {
      backgroundColor: '#222',
    },
    tab: {
      width: Dimensions.get('window').width / 3,
    },
    indicator: {
      backgroundColor: '#ffeb3b',
    },
    label: {
      color: '#fff',
      fontWeight: '400',
    },
    statusbar: {
      backgroundColor: '#222',
      height: Platform.OS === 'ios' ? 20 : 25,
    },
    textBtn: {
      fontSize: 15,
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
    },
    button: {
      paddingVertical: 15,
      width: Dimensions.get('window').width
    },
});