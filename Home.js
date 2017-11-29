/**
 * Created by jayakornkarikan on 10/12/2017 AD.
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';


export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isLoggingIn: false,
            message: ''
        }
        this._userLogin = this._userLogin.bind(this);
    }

    _userLogin = () => {
        console.log('hello');
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
            .then(function (response) {
                response._bodyText == 'pass' ? proceed = true : proceed = false;
            })
            .then(() => {
                if (!proceed) this.setState({ message: 'not true' })
            })
            .then(() => {
                this.setState({ isLoggingIn: false });
                if (proceed) this.props.navigator.push({index: 5});
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
			});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('./Octocat.png')}
                        />
                </View>
                {this.state.isLoggingIn && <ActivityIndicator />}
                {!!this.state.message && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.message}
					</Text>
				)}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={"Username"}
                        placeholderTextColor={'rgba(255, 255, 255,0.6)'}
                        returnKeyType={'next'}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        enablesReturnKeyAutomatically={true}
                        onChangeText={(username) => { this.setState({ username }) }}
                    />
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={"Password"}
                        placeholderTextColor={'rgba(255, 255, 255,0.6)'}
                        returnKeyType={'go'}
                        secureTextEntry={true}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(password) => { this.setState({ password }) }}
                        onSubmitEditing={this._userLogin}
                    />
                    <TouchableOpacity onPress={() => this.props.navigator.push({index: 3, title: 'Forget Password'})}>
                        <Text style={{fontSize: 12}}>Forget password</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} onPress={() => this.props.navigator.push({index: 1, title: 'Profile'})}>
                        <Text style={styles.textBtn}>Login</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#D95E54' }]}
                        onPress={() => { this._userLogin(); } }
                    >
                        <Text style={styles.textBtn}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: '#3E5893'}]} onPress={() => this.props.navigator.push({index: 2, title: 'Register'})}>
                        <Text style={styles.textBtn}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 40
    },
    logo: {
        height: 100,
        width: 100
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
    }
});
