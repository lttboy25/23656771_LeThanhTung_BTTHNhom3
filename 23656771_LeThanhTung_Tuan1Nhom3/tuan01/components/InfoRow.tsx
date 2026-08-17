import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const InfoRow = () => {
  return (
    <View style={styles.container}>
        <View style={styles.left}>
            <Image
                source={require("../assets/favicon.png")}
                style={styles.avatar}
                accessibilityRole="image"
                accessibilityLabel="Ảnh đại diện sinh viên Nguyễn Minh Anh"
            />
        </View>

        <View style={styles.right}>
            <Text style={styles.name}>
                Nguyen Minh Anh
            </Text>

            <Text style={styles.id}>
                Ma SV: 24CNTT001
            </Text>

        </View>
        
      </View>
  )
}

export default InfoRow


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    left: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        resizeMode: 'cover',
    },
    right: {
        width: '65%',
        padding: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 5,
        fontFamily: 'Times New Roman',
    },
    id: {
        color: 'gray',
        fontSize: 18,
        fontFamily: 'Times New Roman',
    }

})