import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}


export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const load = async () => {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
          const data = (await response.json()) as Todo[];
          setTodos(data)
        } catch (error) {
          setError(true)
        } finally {
          setLoading(false);
        }
      };

      load();
    }, [])

    if(loading) return <ActivityIndicator style={{flex: 1}} size={'large'}/>

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách công việc</Text>

      {error ? <Text style={styles.error}>Không tải được dữ liệu</Text> 
      
      : <FlatList 
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <Text style={styles.item}>
            {item.completed ? '✅' : '⬜'} {item.title}
          </Text>
        )}
        ListEmptyComponent={<Text style={styles.error}>Không có công việc nào</Text>}  
      />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 56 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  error: { color: 'red' },
  item: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
});
