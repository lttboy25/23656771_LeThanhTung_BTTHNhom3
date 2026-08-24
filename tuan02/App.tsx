
import { useState } from 'react';
import CourseRow from './src/components/CourseRow';
import { Course, courses } from './src/data/courses';
import {
  Alert,
  FlatList,
  FlatListComponent,
  Pressable,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './src/style';
import ListHeaderComponent from './src/components/ListHeaderComponent';
import ListEmptyComponent from './src/components/ListEmptyComponent';

export default function App() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase('vi');
  
  const filteredCourses = courses.filter((course) =>
  `${course.title} ${course.instructor} ${course.category}`
    .toLocaleLowerCase('vi')
    .includes(normalizedQuery),
);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ListHeaderComponent 
        query={query}
        setQuery={setQuery}
        filteredCourses={filteredCourses}
        />

        {filteredCourses.length === 0 &&
          <ListEmptyComponent />
        }

        {filteredCourses.length !== 0 &&
          <CourseListScreen />
        }
        
        
      </SafeAreaView>
    </ScrollView>
  );

  


  function CourseListScreen() {
    return (
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseRow
          course={item}
          onPress={openCourse}
          />
        )}
      />
    );
  }
}

const openCourse = (course: Course) => {
  Alert.alert(
    course.title,
    `Giảng viên: ${course.instructor}\nSố sinh viên: ${course.students}`,
  );
};








