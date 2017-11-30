import React from 'react';
import {
    StatusBar,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    Platform,
    Modal,
    TouchableHighlight,
    TextInput,
    Dimensions,
    Image
} from 'react-native';
import api from './api';
import { Ionicons } from '@expo/vector-icons';

export default class Menu extends React.Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            modalVisible: false,
            modalVisibleDetail: false,
            otp: '',
            invoiceid: ''
        }
        api.profile()
            .then((data) => {
                this.setState({name: data.firstnameEn + ' ' + data.lastnameEn, email: data.email, mobile: data.mobileNumber, balance: data.balance});
            })
            .catch((error) => {
                throw error;
            });

        api.menu().then((data) => {
            this.setState({ dataSource: ds.cloneWithRows(data) });
        });
    }

    _buyItem = function (name, price, quantity) {
        api.buyItem(name, price, 1, this.state.email).then((data) => {
            if (data.status === 'ok') {
                this.setState({invoiceid: data.id, modalVisible: true});
            } else {
                alert('Error occured.');
            }
        })
    }

    confirmOTP() {
        fetch('http://35.198.194.101:3000/otp', {
            method: "POST",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                otp: this.state.otp,
                invoiceid: this.state.invoiceid
            })
        })
            .then((res) => {
                if (res._bodyText == 'complete') {
                    this.setState({ modalVisible: false });
                    setTimeout(() => {
                        alert(res._bodyText);
                    }, 1500);
                } else {
                    alert(res._bodyText);
                }
            })
    }

    clearOTP = () => {
        this._otp.setNativeProps({ text: '' });
        this.setState({ otp: '' });
    }

    separator() {
        return (
            <View style={{height: 1, backgroundColor: 'lightgray', margin: 5}}/>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />      
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    >
                    <View style={[styles.container, {alignItems: 'center', paddingTop: 75}]}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            Confirmation
                        </Text>
                        <TextInput
                            ref={component => this._otp = component}      
                            style={[styles.input, {backgroundColor: 'rgba(109,76,65 ,0.2)', borderRadius: 4, textAlign: 'center'}]}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            placeholder={"Enter OTP here"}
                            keyboardType={'number-pad'}
                            maxLength={6}
                            onSubmitEditing={() => this.confirmOTP()}
                            onChangeText={(otp) => { this.setState({ otp }) }}
                            onFocus={this.clearOTP}
                        />
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#34495e' }]}
                            onPress={() => {
                                this.confirmOTP()
                            }}>
                            <Text style={styles.textBtn}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]}
                            onPress={() => {
                                this.setState({modalVisible: !this.state.modalVisible})
                            }}>
                            <Text style={styles.textBtn}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
                {/* Detail */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisibleDetail}
                    >
                    <View style={[styles.container, { paddingTop: 75 }]}>
                        <StatusBar barStyle="dark-content" />     
                        <View style={{ flex: 2 }}>
                            <Image style={styles.image} source={{uri: this.state.itemPic}}/>
                        </View>
                        <View style={{ flex: 3, padding: 10 }}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                    {this.state.nameItem}
                                </Text>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                    {this.state.price} ฿
                                </Text>
                            </View>    
                            {this.separator()}
                            <Text>
                                {this.state.desc}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#2980b9', marginRight: 5 }]}
                                onPress={() => {
                                    this._buyItem(this.state.nameItem, this.state.price, 1);
                                    this.setState({modalVisibleDetail: !this.state.modalVisibleDetail})
                                }}>
                                <Text style={styles.textBtn}>Buy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c', marginLeft: 5 }]}
                                onPress={() => {
                                    this.setState({modalVisibleDetail: !this.state.modalVisibleDetail})
                                }}>
                                <Text style={styles.textBtn}>Back</Text>
                            </TouchableOpacity>
                        </View>    
                    </View>
                </Modal>

                <ListView style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                this.setState({ nameItem: rowData.name, desc: rowData.desc, price: rowData.price, itemPic: rowData.img, modalVisibleDetail: true });
                            }}>
                                <View style={styles.row}>
                                    <View style={{ flex: 3 }}>
                                        <Image style={styles.imageList} source={{uri: rowData.img}}/>
                                    </View>
                                    <View style={{ flex: 10 }}>
                                        <View style={{ flex: 3, padding: 10 }}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{rowData.name}</Text>
                                        </View>
                                        <View style={{ flex: 10, padding: 10}}>
                                            <Text style={{fontSize: 16}}>{rowData.price} ฿</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center'}}>
                                        <Ionicons
                                            name={ Platform.OS === 'android' ? 'md-arrow-forward' : 'ios-arrow-forward' }
                                            size={24}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    enableEmptySections={true}
                    />
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255 ,1)',
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
        marginTop: 20,
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
        width: Dimensions.get('window').width - 150
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
    button: {
        paddingVertical: 10,
        marginVertical: 5,
        width: Dimensions.get('window').width - 250
    },
    textBtn: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    image: {
        height: 200,
        resizeMode: Image.resizeMode.cover,
        borderRadius: 7,
    },
    imageList: {
        height: 80,
        resizeMode: Image.resizeMode.cover,
        borderRadius: 7
    },
});