import React, { useCallback, useMemo, useState } from 'react'
import { Button, FlatList, Text, TextInput, View } from 'react-native';



export default function FindAndSum() {
    const products = useMemo(() => [
        { id: '1', name: 'Áo thun', price: 200000 },
        { id: '2', name: 'Quần jean', price: 450000 },
        { id: '3', name: 'Giày thể thao', price: 800000 },
        ], []
    )

    const [keyword, setKeyword] = useState('');

    const filteredProducts = useMemo(() => {
        const normalizeKeyword = keyword.trim().toLowerCase();

        return products.filter(p => p.name.trim().toLowerCase().includes(normalizeKeyword))


    }, [keyword, products]);

    const handleSelect = useCallback((product) => {
        console.log('Selected: ', product.name);
        
    }, [])

    const total = useMemo(() => {
        return filteredProducts.reduce((total, products) => total + products.price, 0);
    }, [filteredProducts])




  return (
    <View>
        <TextInput 
        placeholder='Input'
        onChangeText={setKeyword}
        />
        <FlatList 
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <Button 
            title={item.name}
            onPress={(item) => handleSelect(item)}
            />
        )}
        />

        <Text>Total: {total.toLocaleString('vi-VN')} d</Text>
    </View>
  )
}
