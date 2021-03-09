import React, { useState, useEffect } from 'react';

import { ScrollView, StatusBar, View, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native'

import LoanCalc from './screens/LoanCalc';
import InflationCalc from './screens/InflationCalc';
import Converter from './screens/Converter';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;

export default class MyCarousel extends React.Component {
    constructor() {
        super();
        this.state = {
            activeSlide: 0,
        }
    }

    _renderItem = ({ item, index }) => {
        if (index === 0) {
            return (<LoanCalc />);
        } else if (index === 1) {
            return (<Converter />);
        } else if (index === 2) {
            return (<InflationCalc />);
        } else {
            return (<LoanCalc />);
        }
    }

    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={3}
                activeDotIndex={activeSlide}
                // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotColor='rgba(0, 0, 0, 0.50)'
                inactiveDotColor='rgba(0, 0, 0, 0.75)'
                dotStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {

        return (
            <View>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content" // Here is where you change the font-color
                />
                <SafeAreaView>
                    <Carousel
                        data={[{}, {}, {}]}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    />
                    <View style={{ position: 'fixed', bottom: 0, }}>
                        {this.pagination}
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}


// export default createBottomTabNavigator({
//     LoanScreen: { screen: LoanCalc },
//     InflationScreen: { screen: InflationCalc },
//     ConverterScreen: { screen: Converter },


// });


// // REACT NAVIGATION APPSTACK
// // const defaultStackOptions = {
// //     headerStyle: {
// //         backgroundColor: '#0000ff',
// //     },
// //     headerTintColor: '#fff',
// // };

// // const AppStack = createStackNavigator(
// //     {
// //         LoanCalc: {
// //             screen: LoanCalc,
// //             navigationOptions: ({ navigation }) => ({
// //                 headerTitle: 'Loan Payment Calculator',
// //             }),
// //         },
// //         InflationCalc: {
// //             screen: InflationCalc,
// //             navigationOptions: ({ navigation }) => ({
// //                 headerTitle: 'Inflation Calculator',
// //             }),
// //         },
// //         Converter: {
// //             screen: Converter,
// //             navigationOptions: ({ navigation }) => ({
// //                 headerTitle: 'Currency Conversion',
// //             })
// //         }
// //     },
// //     {
// //         defaultNavigationOptions: {
// //             ...defaultStackOptions,
// //         },
// //     }
// // );


// //REACT MATERIAL NAVIGATION TAB VIEW
// // export default createMaterialBottomTabNavigator(
// //     {
// //         Loan: { screen: LoanCalc },
// //         Inflation: { screen: InflationCalc },
// //         Converter: { screen: Converter },
// //     },
// //     {
// //         initialRouteName: 'Loan',
// //         activeTintColor: '#F44336',
// //     },
// // );


// //TAB VIEW
// // const initialLayout = { width: Dimensions.get('window').width };

// // export default function TabViewExample() {
// //     const [index, setIndex] = React.useState(0);
// //     const [routes] = React.useState([
// //         { key: 'first', title: 'First' },
// //         { key: 'second', title: 'Second' },
// //         { key: 'third', title: 'Third' },
// //     ]);

// //     const renderScene = SceneMap({
// //         first: LoanCalc,
// //         second: InflationCalc,
// //         third: Converter,
// //     });

// //     return (
// //         <TabView
// //             renderPager={props => <ScrollPager {...props} />}
// //             navigationState={{ index, routes }}
// //             renderScene={renderScene}
// //             onIndexChange={setIndex}
// //             initialLayout={initialLayout}
// //         // screenContainerStyle={ }
// //         />
// //     );
// // }

// // const styles = StyleSheet.create({
// //     scene: {
// //         flex: 0,
// //     },
// // });