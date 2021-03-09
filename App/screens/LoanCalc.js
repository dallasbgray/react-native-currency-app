import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { TextField, ErrorText } from "../components/TextField.js";
import NumberFormat from 'react-number-format';

const styles = StyleSheet.create({
    container: {
        //flex: 1,
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
    selectedPrincipal: 0,
    selectedYears: 0,
    selectedMonths: 0,
    interestRate: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    totalPrincipal: 0,
};

export default class LoanCalc extends React.Component {

    state = initialstate;



    calculatePayment = () => {
        let n = (Number(this.state.selectedYears) * 12) + Number(this.state.selectedMonths);
        let r = Number(this.state.interestRate) / 100;
        let p = Number(this.state.selectedPrincipal);

        // let p = a / (((1 + r) ** n) - 1) / (r * (1 + r) ** n);
        let monthly = p * r / 12 * Math.pow(1 + r / 12, n) / (Math.pow(1 + r / 12, n) - 1);

        let total = monthly * n - p;

        // for (let i = 0; i < n; i++) {
        //     let tempInterest = a * (r / 12);
        //     let tempPrincipal = 
        // }

        this.setState({
            monthlyPayment: monthly,
            totalPrincipal: p,
            totalInterest: total,
        });
    }

    reset = () => {
        // return {
        //     ...initialstate,
        // };

        this.setState({
            selectedPrincipal: 0,
            selectedYears: 0,
            selectedMonths: 0,
            interestRate: 0,
            monthlyPayment: 0,
            totalInterest: 0,
            totalPrincipal: 0,
        });
    }

    onNavPress = () => {
        this.props.navigation.navigate('InflationCalc');
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <TouchableOpacity
                    style={[styles.button, { marginTop: 5 }]}
                    onPress={() => this.onNavPress()}
                >
                    <Text style={{ color: 'white', fontSize: 25 }}>Next Screen</Text>
                </TouchableOpacity> */}

                <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                    <TextField label="Loan Principal ($)" placeholder="Ex: $100000" onChangeText={TextInputValue => this.setState({ selectedPrincipal: TextInputValue })} />
                    <TextField label="Loan Term (years)" placeholder="Ex: 10" onChangeText={TextInputValue => this.setState({ selectedYears: TextInputValue })} />
                    <TextField label="Loan Term(months)" placeholder="Ex: 6" onChangeText={TextInputValue => this.setState({ selectedMonths: TextInputValue })} />
                    <TextField label="Interest Rate (%)" placeholder="Ex: 4.5" onChangeText={TextInputValue => this.setState({ interestRate: TextInputValue })} />
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.calculatePayment()} style={styles.button}><Text style={styles.buttonText}>Calculate</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.reset()} style={[styles.button, styles.buttonReset]}><Text style={styles.buttonText}>Reset</Text></TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Monthly Payment:</Text>
                    <NumberFormat value={this.state.monthlyPayment} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.textResults}>{value}</Text>} />


                    <Text style={styles.text}>Total Principal Paid</Text>
                    <NumberFormat value={this.state.totalPrincipal} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.textResults}>{value}</Text>} />

                    <Text style={styles.text}>Total Interest Paid</Text>
                    <NumberFormat value={this.state.totalInterest} displayType={'text'} decimalScale={2} fixedDecimalScale={2} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.textResults}>{value}</Text>} />
                </View>

            </SafeAreaView>
        );
    }
}