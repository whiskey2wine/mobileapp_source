import React from 'react';
import {
    StatusBar,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Inbox extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(175, 214, 240,1.0)',
        padding: 10,
        paddingTop: 75
    },
    inputBox: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255,0.2)',
        marginBottom: 2,
        color: '#FFF',
        paddingHorizontal: 10
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255,0.4)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    formContainer: {
        padding: 15,
    }
});