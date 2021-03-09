import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Text, View, StyleSheet, Picker, Alert } from 'react-native'
import { TextField, ErrorText } from "../components/TextField.js";
import { currencyApi } from "../util/api";
import NumberFormat from 'react-number-format';
//let CurrencyConverter = require('@y2nk4/currency-converter')
//let converter = new CurrencyConverter('f2106985933cb7a61398')

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        backgroundColor: 'grey',
        borderRadius: 8,
        width: "40%",
        alignItems: 'center',
    },
    buttonReset: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
    },
    textContainer: {
        alignItems: 'flex-start',
        marginTop: 15,
    },
    textContainerResults: {
        justifyContent: 'center'
    },
    text: {
        color: "#6AAF6A",
        fontSize: 30,
        fontWeight: "400",
        marginTop: 5,
    },
    textResults: {
        fontSize: 30,
        fontWeight: "400",
        marginTop: 5,
    }
});

const initialstate = {
    USDamount: 0,
    currency: "",
    conversion: 0,
    result: 0,
    quotes: {},
};


const path = "live";
const date = "";



export default class LoanCalc extends React.Component {

    handleError = () => {
        Alert.alert('No currency data found!', 'Please try again', [
            {
                text: 'Okay',
            },
        ]);
    };
    componentDidMount() {
        this.getHistoricalConversion(path, date);
        //this.testing();
    }

    testing() {
        converter.convert('USD', 'GBP')
            .then((value) => {
                console.log(value);
            })
    }


    getHistoricalConversion = (path, date) =>
        currencyApi(path, date)
            .then(response => {
                if (response.code === '404') {
                    this.handleError();
                } else {
                    this.setState({
                        quotes: response.quotes,
                    });

                }
            })
            .catch(err => {
                console.log('what went wrong:', err);
                this.handleError();
            });

    state = initialstate;

    reset = () => {
        this.setState({
            USDamount: "",
            currency: "",
            conversion: 0,
            result: 0,
            quotes: {},
        });
    }
    calculatePayment() {
        this.setState({ result: this.state.USDamount * this.state.currency })

    }


    render() {
        return (

            <SafeAreaView style={styles.container}>

                <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                    <TextField label="USD Amount ($)" placeholder="Ex: $100000" onChangeText={TextInputValue => this.setState({ USDamount: TextInputValue })} />
                </ScrollView>

                <Picker
                    onValueChange={itemValue => {
                        this.setState({ currency: itemValue });
                    }}
                    selectedValue={this.state.currency}
                    mode="dropdown"
                >
                    <Picker.Item label='Please select an option...' value='0' />
                    <Picker.Item label="GBP - British Pound" value="0.739965" />
                    <Picker.Item label="HKD - Hong Kong Dollar" value="7.75215" />
                    <Picker.Item label="JPY - Japanese Yen" value="103.302976" />
                    <Picker.Item label="MXN - Mexican Peso" value="19.897901" />
                    <Picker.Item label="AUD - Australian Dollar" value="1.321202" />
                </Picker>

                <View>
                    <Text style={styles.text}>{this.state.user}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.calculatePayment()} style={styles.button}><Text style={styles.buttonText}>Calculate</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.reset()} style={[styles.button, styles.buttonReset]}><Text style={styles.buttonText}>Reset</Text></TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Conversion:</Text>
                    <NumberFormat value={this.state.result} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} renderText={value => <Text style={styles.textResults}>{value}</Text>} />
                </View>


            </SafeAreaView>
        );
    }
}