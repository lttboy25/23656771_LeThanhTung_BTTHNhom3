import React from 'react'
import { Course } from '../data/courses';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import styles from '../style';


interface CourseRowProps {
  course: Course,
  onPress: (course: Course) => void;
}

function CourseRow({course, onPress}: CourseRowProps) {
  return (
    <Pressable
    onPress={() => onPress(course)}
    style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.courseCardPressed,
      ]}

    >
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>Giảng viên: {course.instructor}</Text>

      <View style={styles.courseFooter}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.studentCount}>{course.students} sinh viên</Text>
      </View>
    </Pressable>
  )
}

export default CourseRow;
