import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ContactInfoRow() {
  return (
    <View>
      <Text>
        Thông tin sinh viên
      </Text>

      <Text>
        Email: minhanh@sv.edu.iuh.vn
      </Text>

      <Text>
        Lớp: CNTT K24
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',}

})