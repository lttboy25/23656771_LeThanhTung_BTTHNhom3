import React, { createContext, useContext } from 'react'
import { Text } from 'react-native';

const UserContext = createContext(null)

function ProfileScreen() {
    const user = useContext(UserContext);

    return(
        <Text>{`Xin chào ${user.name}`}</Text>
    )
}

export default function ShareInfomation() {
  return (
    <UserContext.Provider value={{name: "Lê Thanh Tùng"}}>
        <ProfileScreen />
    </UserContext.Provider>
  )
}
