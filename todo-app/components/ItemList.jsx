import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'

export default function ItemList({ item, onDelete, onToggle }) {
  return (
    <View>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text>{item.completed ? '☑' : '☐'}</Text>
      </TouchableOpacity>

      <Text>{item.title}</Text>

      <Button title='Delete' onPress={() => onDelete(item.id)} />
    </View>
  )
}