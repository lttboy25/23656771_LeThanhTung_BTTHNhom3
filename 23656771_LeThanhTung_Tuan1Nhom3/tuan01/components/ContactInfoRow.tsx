import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ContactInfoRow() {
  return (
    <View style={styles.con}>
      <View style={styles.container}>
      <Text style={styles.title}>
        Thông tin sinh viên
      </Text>

      <View style={styles.info}>
        <Text style={styles.text_info}>
          Email: minhanh@sv.edu.iuh.vn
        </Text>

        <Text style={styles.text_info}>
          Lớp: CNTT K24
        </Text>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    alignItems: "center"
  },
  container: {
    flexDirection: 'column',
    padding: 15,
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',


  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: 'Times New Roman',
  },
  info: {
    marginTop: 5,
  },
  text_info: {
    fontSize: 16,
    paddingBottom: 5,
    fontFamily: 'Times New Roman',
  }

})