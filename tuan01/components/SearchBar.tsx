import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function SearchBar() {
  const [keyword, setKeyword] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm thông tin..."
        placeholderTextColor="#e0e0e0"
        style={styles.searchInput}
        value={keyword}
        onChangeText={setKeyword}
        accessibilityRole="search"
        accessibilityLabel="Ô tìm kiếm thông tin sinh viên"
        accessibilityHint="Nhập từ khóa để tìm kiếm"
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        fontFamily: 'Times New Roman',

    }
})