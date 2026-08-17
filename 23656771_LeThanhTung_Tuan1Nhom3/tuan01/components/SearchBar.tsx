import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Tìm kiếm thông tin..." style={styles.searchInput} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },
    searchInput: {
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'gray',

    }
})