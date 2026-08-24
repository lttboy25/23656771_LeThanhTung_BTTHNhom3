import React from 'react'
import { Text, View } from 'react-native'
import styles from '../style'

export default function ListEmptyComponent() {
  return (
    <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>
      Không tìm thấy khóa học
    </Text>

    <Text style={styles.emptyText}>
      Hãy thử tìm kiếm bằng một từ khóa khác.
    </Text>
  </View>

  )
}
