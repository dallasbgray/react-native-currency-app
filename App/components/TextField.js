import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    row: {
        borderBottomWidth: 1,
        borderBottomColor: "#98FB98",
        marginBottom: 11
    },
    label: {
        color: "#5B965B",
        fontSize: 30,
        fontWeight: "400",
        marginBottom: 4
    },
    textfield: {
        fontSize: 30,
        fontWeight: "400",
        color: "#828282",
        marginBottom: 4
    },
    errorText: {
        color: 'red',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 20,
    }
});

export const TextField = ({ label, ...props }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.textfield}
            placeholderTextColor="#828282"
            keyboardType={'numeric'}
            keyboardAppearance='dark'
            clearButtonMode='while-editing'
            {...props}
        />
    </View>
);

export const ErrorText = ({ text = '' }) => (
    <Text style={styles.errorText}>{text}</Text>
)
