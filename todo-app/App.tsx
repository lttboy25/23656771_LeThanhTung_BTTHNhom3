import { useReducer, useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import FormInput from './components/FormInput';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'DELETE_TODO':
      return state.filter(item => item.id !== action.payload);
    case 'TOGGLE_TODO':
      return state.map(item =>
        item.id === action.payload ? { ...item, completed: !item.completed } : item
      );
    default:
      return state;
  }
};

export default function App() {
  return (
    <ThemeProvider>
      <TodoScreen />
    </ThemeProvider>
  );
}

function TodoScreen() {
  const { isDark, toggleTheme } = useTheme();

  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [keyword, setKeyword] = useState('');

  const handleAdd = (newItem) => {
    dispatch({ type: 'ADD_TODO', payload: newItem });
  };

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(item =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [todos, keyword]);

  const uncompletedCount = useMemo(() => {
    return todos.filter(item => !item.completed).length;
  }, [todos]);

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  return (
    <View>
      <Text>{isDark ? 'Chế độ tối' : 'Chế độ sáng'}</Text>
      <Button title='Chuyển giao diện' onPress={toggleTheme} />

      <Text>Công việc của tôi</Text>
      <FormInput onAdd={handleAdd} />

      <SearchBar keyword={keyword} onChangeKeyword={setKeyword} />

      <Text>{uncompletedCount} việc chưa hoàn thành</Text>

      {filteredTodos.length === 0 ? (
        <Text>Không có công việc nào</Text>
      ) : (
        filteredTodos.map(item => (
          <ItemList
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))
      )}
    </View>
  );
}