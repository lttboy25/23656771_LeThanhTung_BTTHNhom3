import React, { useEffect, useState } from 'react'
import { Switch, Text, View } from 'react-native';

export default function ConnectionStatusMonitor() {
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isConnected) {
            setMessage('Thiết bị đã kết nối!')
        }else{
            setMessage('Thiết bị chưa kết nối!')
        }
    }, [isConnected])

  return (
    <View>
        <Switch value={isConnected} onValueChange={setIsConnected}/>
        <Text>{message}</Text>

    </View>
  )
}
