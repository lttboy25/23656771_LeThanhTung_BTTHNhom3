import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Form() {
    const [fullname, setFullName] = useState('');
    const [age, setAge] = useState(0);

  return (
    <View>
        <TextInput 
        style={styles.input}
        placeholder='Vui lòng nhập họ và tên của bạn...'
        value={fullname}
        onChangeText={(e) => setFullName(e)}
        />

        <TextInput 
        style={styles.input}
        placeholder='Vui lòng nhập tuổi.'
        value={age}
        keyboardType='numeric'
        onChangeText={(e) => setAge(e)}
        />

        <Button 
        title='Reset'
        onPress={() => {
            setAge(0);
            setFullName('');
        }}
        />

        <Text>{fullname ? `Xin chào, ${fullname}` : `Vui lòng nhập Họ tên`}</Text>
        <Text>{age>=18 ? `Tuổi: ${age}` : `Chưa có thông tin về tuổi hoặc tuổi dưới 18`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        alignContent: 'center',
        padding: 24
    },
    input: {
        width: '100%',
        height: 25,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        paddingHorizontal: 10,
    }
})
