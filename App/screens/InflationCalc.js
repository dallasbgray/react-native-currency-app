import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, ScrollView, Picker, Alert, AsyncStorage, ActivityIndicator } from 'react-native'
import { Dimensions } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { currencyApi } from '../util/api';

import 'babel-polyfill';

const screenWidth = Dimensions.get("window").width;


const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.7,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //justifyContent: 'center',
        marginHorizontal: 20,
    },
    text: {
        color: "#6AAF6A",
        fontSize: 30,
        fontWeight: "400",
        marginTop: 5,
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
});


export default class InflationCalc extends React.Component {

    state = {
        path: 'historical',
        years: [2020, 2019, 2018, 2017, 2016, 2015],
        quotes: {},
        values: [0, 0, 4, 0, 0, 0],
        selectedCurrency: 'GBP',
        listdata1: {
            labels: ["2020", "2019", "2018", "2017", "2016", "2015"],
            datasets: [
                {
                    data: [105.065501, 109.673505, 112.779999, 116.758003, 120.3742, 120.2679],
                    color: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["USD to JPY Conversion Rate over Time"] // optional
        },
        listdata2: {
            labels: ["2020", "2019", "2018", "2017", "2016", "2015"],
            datasets: [
                {
                    data: [1.42469, 1.41893, 1.281703, 1.385698, 1.37393, 1.227915],
                    color: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["USD to AUD Conversion Rate over Time"] // optional
        },
        listdata3: {
            labels: ["2020", "2019", "2018", "2017", "2016", "2015"],
            datasets: [
                {
                    data: [0.754802, 0.7841, 0.74002, 0.81048, 0.678607, 0.644102],
                    color: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["USD to GBP Conversion Rate over Time"] // optional
        },

    }

    componentDidMount() {
        let path = 'historical';
        let date = `${this.state.years[0]}-09-16`;

        //currencyApi(path, date);
        this.getHistoricalConversion(path, date);

        // this.getGraphData();

    }

    handleError = () => {
        // Alert.alert('No currency data found!', 'Please try again', [
        //     {
        //         text: 'Okay',
        //     },
        // ]);
    };

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

    getGraphData() {

        let path = 'historical';
        let date = `2020-01-01`;
        let a = [0, 0, 0, 0, 0, 0];

        for (let i = 0; i < 6; i++) {
            date = `${this.state.years[i]}-01-01`;
            this.getHistoricalConversion(path, date);

            //let a = [...this.state.data];
            // let a = this.state.data.slice();
            // a[i] = this.state.quotes.USDGBP;

            // this.setState({ data: a });

            // a[i] = this.state.quotes.USDHKD;
        }

        //  this.setState({ values: a });
    }

    render() {
        return (
            <View>
                <SafeAreaView>
                    <ScrollView style={styles.container} >
                        <View style={styles.chartContainer}>
                            <Text style={styles.text}>Historical Exchange Rates</Text>
                            <LineChart
                                //data={this.state.isLoading ? linedata : this.state.linedata}
                                data={this.state.listdata1}
                                width={screenWidth * 0.9}
                                height={200}
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={styles.chartContainer}>
                            <LineChart
                                //data={this.state.isLoading ? linedata : this.state.linedata}
                                data={this.state.listdata2}
                                width={screenWidth * 0.9}
                                height={200}
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={styles.chartContainer}>
                            <LineChart
                                //data={this.state.isLoading ? linedata : this.state.linedata}
                                data={this.state.listdata3}
                                width={screenWidth * 0.9}
                                height={200}
                                chartConfig={chartConfig}
                            />
                        </View>
                    </ScrollView>
                    {/* <Picker
                        mode="dropdown"
                    >
                        <Picker.Item label="GBP - British Pound" value="GBP" />
                        <Picker.Item label="HKD - Hong Kong Dollar" value="HKD" />
                        <Picker.Item label="JPY - Japanese Yen" value="JPY" />
                        <Picker.Item label="MXN - Mexican Peso" value="MXN" />
                        <Picker.Item label="AUD - Australian Dollar" value="AUD" />
                    </Picker> */}
                    {/* <Text>{this.state.quotes.USDGBP}</Text> */}
                    {/* <Text>{this.state.linedata.datasets[0].data[0]}</Text> */}
                </SafeAreaView>
            </View >
        );
    }
}