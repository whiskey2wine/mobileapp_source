import React from 'react';
import {
    StatusBar,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView
} from 'react-native';
import api from './api.js';

export default class History extends React.Component {

    constructor() {
        super();
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            email: ''
        }
        api.profile()
            .then((data) => {
                this.setState({ email: data.email });
            })
            .then(() => {
                api.getHistory(this.state.email).then((data) => {
                    this.setState({ dataSource: ds.cloneWithRows(data) });
                });
            })
            .catch((error) => {
                throw error;
            });
        this.fetchHistory();
    }

    fetchHistory() {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });        
        setInterval(() => {
            api.getHistory(this.state.email)
                .then((data) => {
                    if (data) {
                        this.setState({ dataSource: ds.cloneWithRows(data) });
                    }
            })
            .catch((error) => {
                throw error;
            });
        }, 10000)
    }

    render() {
        return (
            <ListView style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    return (
                        <View style={[styles.row, { alignItems: 'center' }]}>
                            <View style={{ flex: 10 }}>
                                <View style={{ flex: 3, padding: 10 }}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{rowData.item}</Text>
                                </View>
                                <View style={{ flex: 10, padding: 10}}>
                                    <Text style={{fontSize: 16}}>{rowData.price} ฿</Text>
                                </View>
                            </View>
                            <View style={{ flex: 4, padding: 10}}>
                                <Text style={{fontSize: 18, fontWeight: '500'}}>{rowData.status}</Text>
                            </View>
                        </View>
                    );
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255,1.0)',
        padding: 10,
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
    },
    row: {
        flexDirection: 'row',
        height: 100,
    },
});