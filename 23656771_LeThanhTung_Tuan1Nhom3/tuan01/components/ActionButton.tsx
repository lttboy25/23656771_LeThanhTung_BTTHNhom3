import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function ActionButton() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn}>
        <Text style={styles.text}>
        ActionButton
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 20

    },

    btn: {
        width: "60%",
        backgroundColor: "#2600ff",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        alignItems: "center"

    },
    text: {
        color: "#f2f2f2",
        fontWeight: "bold",
        fontFamily: 'Times New Roman',
        fontSize: 18

    }

})