import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
};

export default function RatingStars({ value, size = 18, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map(i => {
        const star = (
          <Text style={{ fontSize: size, color: i <= Math.round(value) ? '#f5a623' : '#ccc' }}>★</Text>
        );
        return onChange ? (
          <TouchableOpacity key={i} onPress={() => onChange(i)}>
            {star}
          </TouchableOpacity>
        ) : (
          <View key={i}>{star}</View>
        );
      })}
    </View>
  );
}