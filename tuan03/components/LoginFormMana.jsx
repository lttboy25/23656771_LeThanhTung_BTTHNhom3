import React, { useReducer } from 'react'
import { Button, Text, TextInput, View } from 'react-native';

const initialState = {
    email: '',
    password: '',
    error: ''
};

function formReducer(state, action) {
    switch(action.type){
        case 'SET_EMAIL': return {...state, email: action.payload, error: ''};
        case 'SET_PASSWORD': return {...state, password: action.payload, error: ''};
        case 'SET_ERROR': return {...state, error: action.payload};
        case 'RESET': return initialState;
        default: return state;

    }
}

export default function LoginFormMana() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleLogin = () => {
        if(!state.email || !state.password) {
            dispatch({type: 'SET_ERROR', payload: 'Vui lòng nhập đầy đủ thông tin'});
            return;
        }

        dispatch({ type: 'SET_ERROR', payload: '' });

    }

  return (
    <View>
        <Text>Lee Thn tung</Text>

       <TextInput 
       value={state.email}
       onChangeText={text => {
        dispatch({type: 'SET_EMAIL', payload: text})
       }}
       placeholder='Input email: '
       />

        <TextInput 
        value={state.password}
        onChangeText={text => {
        dispatch({type: 'SET_PASSWORD', payload: text})
       }}
       placeholder='Input password: '
       secureTextEntry
       />
        
        {state.error ? <Text>{state.error}</Text> : null}
        <Button title='Login' onPress={handleLogin}/>
        <Button title='Reset' onPress={() => dispatch({type: 'RESET'})}/>
       
    </View>
  );
}
