import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'

export default function FormInput({ onAdd }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd({
      id: Date.now().toString(),
      title: input,
      completed: false,
    });
    setInput('');
  };

  return (
    <View>
      <TextInput
        placeholder='Nhập công việc mới'
        value={input}
        onChangeText={setInput}
      />
      <Button title='+' onPress={handleAdd} />
    </View>
  )
}