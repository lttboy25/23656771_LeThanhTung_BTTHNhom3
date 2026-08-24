import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import styles from '../style'
import { Course } from '../data/courses';

interface listHeaderProps {
  query: string,
  setQuery: (value: string) => String,
  filteredCourses: Course[]

}


export default function ListHeaderComponent({query, setQuery, filteredCourses}: listHeaderProps) {
  return (
    <View style={styles.header}>
    <Text style={styles.screenTitle}>Course Catalog</Text>
    <Text style={styles.subtitle}>
      Khám phá các khóa học đang mở
    </Text>

    <TextInput
      value={query}
      onChangeText={setQuery}
      placeholder="Tìm theo tên, giảng viên hoặc danh mục"
      placeholderTextColor="#8A8F98"
      returnKeyType="search"
      style={styles.searchInput}
    />

    <Text style={styles.resultText}>
      Tìm thấy {filteredCourses.length} khóa học
    </Text>
  </View>

  )
}
