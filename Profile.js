/**
 * Created by jayakornkarikan on 10/12/2017 AD.
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';
import PropTypes from 'prop-types';
import api from './api.js';
import TabView from './TabView.js';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            ID: '',
            mobile: '',
            balance: ''
        };
        api.profile()
            .then((data) => {
                this.setState({ name: data.firstnameEn + ' ' + data.lastnameEn, email: data.email, mobile: data.mobileNumber, balance: data.balance });
            })
            .catch((error) => {
                console.log('fetchUserInit', error);
                throw error;
            });
        this.fetchUserData();
    }

    fetchUserData() {
        setInterval(() => {
            api.profile()
            .then((data) => {
                if (data) {
                    this.setState({ name: data.firstnameEn + ' ' + data.lastnameEn, email: data.email, mobile: data.mobileNumber, balance: data.balance });
                }
            })
                .catch((error) => {
                console.log('fetchUser', error);
                throw error;
            });
        }, 5000)
    }
    
    static separator() {
        return (
            <View style={{height:1, backgroundColor: '#beebee'}}/>
        );
    }

    render() {
        return (

        <View style={styles.container}>
            <Image style={styles.image} source={require('./profile_pic.jpg')}/>
            <View style={{borderRadius: 5, borderWidth: 2, borderColor: 'rgba(255, 255, 255,0)', backgroundColor: 'rgba(255, 255, 255,0.2)', width: 350}}>
                <View style={styles.group}>
                    <Text style={[styles.title,styles.textProf]}>Name</Text><Text style={styles.textProf}> {this.state.name}</Text>
                </View>
                {Profile.separator()}
                <View style={styles.group}>
                    <Text style={[styles.title,styles.textProf]}>Email</Text><Text style={styles.textProf}> {this.state.email}</Text>
                </View>
                {Profile.separator()}
                <View style={styles.group}>
                    <Text style={[styles.title,styles.textProf]}>Mobile</Text><Text style={styles.textProf}> {this.state.mobile}</Text>
                </View>
                {Profile.separator()}
                <View style={styles.group}>
                    <Text style={[styles.title,styles.textProf]}>Balance</Text><Text style={styles.textProf}> {this.state.balance} Baht</Text>
                </View> 
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(33,33,33 ,0.9)',
        padding: 10,
        paddingTop: 75,
        alignItems: 'center',
    },
    textProf: {
        fontSize: 15,
        color: '#ffffff',
        padding: 5
    },
    title: {
        fontWeight: 'bold'
    },
    image: {
        height: 120,
        width: 120,
        marginBottom: 15,
        borderRadius: 60,
    },
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    
});
