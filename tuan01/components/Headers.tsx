import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Headers extends Component {
  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.title}>SMART CAMPUS</Text>  
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#2600ff',
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    }
})