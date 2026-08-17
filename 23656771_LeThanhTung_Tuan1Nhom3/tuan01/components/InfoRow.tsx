import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

const InfoRow = () => {
  return (
    <View style={styles.container}>
        <View style={styles.left}>
            <Text>InfoRow 1</Text>

        </View>

        <View style={styles.right}>
            <Text style={styles.name}>
                Nguyen Minh Anh
            </Text>

            <Text style={styles.id}>
                Ma SV: 24CNTT001
            </Text>

        </View>
        
      </View>
  )
}

export default InfoRow


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    left: {
        width: '35%',
    },
    right: {
        width: '65%',
        padding: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 5,
        fontFamily: 'Times New Roman',
    },
    id: {
        color: 'gray',
        fontSize: 18,
        fontFamily: 'Times New Roman',
    }

})