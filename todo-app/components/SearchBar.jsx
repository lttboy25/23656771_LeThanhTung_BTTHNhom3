import React from 'react'
import { TextInput, View } from 'react-native'

export default function SearchBar({ keyword, onChangeKeyword }) {
  return (
    <View>
      <TextInput
        placeholder='Tìm kiếm công việc...'
        value={keyword}
        onChangeText={onChangeKeyword}
      />
    </View>
  )
}