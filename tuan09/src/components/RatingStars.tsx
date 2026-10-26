import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
};

export default function RatingStars({ value, size = 18, onChange }: Props) {
  const rounded = Math.round(value);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text style={{ fontSize: size, color: n <= rounded ? '#f9a825' : '#ccc' }}>★</Text>
        );
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4}>
            {star}
          </Pressable>
        ) : (
          <View key={n}>{star}</View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row' } });
