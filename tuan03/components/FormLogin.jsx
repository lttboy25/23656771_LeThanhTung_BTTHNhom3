import React, { useReducer } from 'react'
import { TextInput, View } from 'react-native';

const initialState = {
    email: '',
    password: '',
    error: '',
};

function reducer(state, action) {
    switch(action.type) {
        case 'SET_EMAIL': return {...state, email: action.payload, error: ''};
        case 'SET_PASSWORD': return {...state, password: action.payload, error: ''};
        case 'SET_ERROR': return {...state, error: action.payload};
        case 'RESET': return initialState
        default: return state;
    }
}

export default function FormLogin() {
    const [state, dispatch] = useReducer(initialState, reducer);
  return (
    <View>
      <TextInput
        value={state.email}
        onChangeText={text =>
            dispatch({ type: 'SET_EMAIL', payload: text })
        }
        placeholder="Email"
        />

        <TextInput
        value={state.password}
        onChangeText={text =>
            dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        placeholder="Mật khẩu"
        secureTextEntry
        />

    </View>
  )
}
