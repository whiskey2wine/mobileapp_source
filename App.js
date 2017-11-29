import React, { Component } from 'react';
import {
    StatusBar,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Image,
    TextInput,
    ActivityIndicator,
    NavigatorIOS,
    Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';

import TabViewJS from './TabView.js';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

// const initialLayout = {
//     height: 0,
//     width: Dimensions.get('window').width,
// };


export default class TabView extends React.Component {
    render() {
        return (
            <NavigatorIOS
                ref='nav'    
                initialRoute={{
                    component: MyScene,
                    title: 'My Initial Scene',
                    navigationBarHidden: true
                }}
                style={{flex: 1}}
            />
        );
    }
}

export class MyScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggingIn: false,
            message: '',
        }
    }

    _userLogin = () => {
        const nextRoute = {
            component: TabViewJS,
            navigationBarHidden: true
        };
        this.setState({ isLoggingIn: true });
        fetch('http://35.198.194.101:3000/login', {
            method: "POST",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                user: this.state.username,
                pass: this.state.password
            })
            })
            .then((response) => {
                response._bodyText == 'pass' ? proceed = true : proceed = false;
            })
            .then(() => {
                if (!proceed) this.setState({ message: 'Login failed. Please enter the correct credentials.' })
            })
            .then(() => {
                this.setState({ isLoggingIn: false });
                if (proceed) this._onForward(nextRoute);
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
			});
    }

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '', username: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '', password: '' });
    }
  
    _onForward = (nextRoute) => {
      this.props.navigator.push(nextRoute);
    }
  
    render() {  
      return (
          <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('./Nophilllogo.png')}
                            />
                    </View>
                    {this.state.isLoggingIn && <ActivityIndicator />}
                    
                    <View style={styles.formContainer}>
                        {!!this.state.message && (
                            <Text
                                style={{fontSize: 14, color: 'red', padding: 5}}>
                                {this.state.message}
                            </Text>
                        )}      
                        <TextInput
                            ref={component => this._username = component}      
                            style={styles.input}
                            autoCorrect={false}
                            keyboardType={'email-address'}  
                            autoCapitalize={'none'}
                            placeholder={"Email"}
                            placeholderTextColor={'rgba(255, 255, 255,0.6)'}
                            returnKeyType={'next'}
                            onSubmitEditing={() => this._password.focus()}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={(username) => { this.setState({ username }) }}
                            onFocus={this.clearUsername}
                        />
                        <TextInput
                            style={styles.input}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            placeholder={"Password"}
                            placeholderTextColor={'rgba(255, 255, 255,0.6)'}
                            returnKeyType={'go'}
                            secureTextEntry={true}
                            ref={component => this._password = component}
                            onChangeText={(password) => { this.setState({ password }) }}
                            onFocus={this.clearPassword}  
                            onSubmitEditing={this._userLogin}
                        />
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#D95E54' }]}
                            onPress={() => {
                                this._userLogin();
                            }}
                        >
                            <Text style={styles.textBtn}>Login</Text>
                        </TouchableOpacity>
                      </View>
                    </View>  
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(109,76,65 ,1)'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 40
    },
    logo: {
        height: 150,
        width: 150
    },
    title: {
        color: '#FFF',
        width: 160,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 15
    },
    textBtn: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    button: {
        paddingVertical: 10,
        marginVertical: 5
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    formContainer: {
        padding: 20,
    },
  });