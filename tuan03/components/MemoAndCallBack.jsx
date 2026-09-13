    import React, { memo, useCallback, useMemo, useState } from 'react'
    import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'

    const ProductItem = memo(function ProductItem({item, onSelect}){
        return(
            <Button title={`${item.name} - ${item.price.toLocaleString('vi-VN')}d`}
            onPress={() => onSelect(item)}
            >
                
            </Button>

        );
    }) 
        


    export default function MemoAndCallBack() {
        const [keyword, setKeyword] = useState("");
        const [selectedName, setSelectedName] = useState('');

        const products = useMemo(
            () => [
                { id: '1', name: 'Điện thoại', price: 12000000 },
                { id: '2', name: 'Máy tính bảng', price: 9000000 },
                { id: '3', name: 'Tai nghe', price: 1500000 },

            ], 
            []
        )

        const filteredProducts = useMemo(() => {
            const normalizeKeyword = keyword.trim().toLowerCase();

            return products.filter(p => 
                p.name.trim().toLowerCase().includes(normalizeKeyword)
            )
        }, [keyword, products]);


        const handleSelectedProducts = useCallback(products => {
            setSelectedName(products.name);
        }, [])

    return (
        <View style={styles.container}>
        <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Tìm sản phẩm"
            style={styles.input}
        />

        <Text>Sản phẩm đã chọn: {selectedName || 'Chưa chọn'}</Text>

        <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <ProductItem item={item} onSelect={handleSelectedProducts} />
            )}
            ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
        />
        </View>

    )
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        padding: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 8,
        padding: 12,
    },
    });

