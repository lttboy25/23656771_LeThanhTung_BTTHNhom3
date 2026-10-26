import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  disabled?: boolean;
};

export default function PrimaryButton({ title, onPress, variant = 'solid', disabled }: Props) {
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, outline && styles.outline, disabled && styles.disabled]}
    >
      <Text style={[styles.text, outline && styles.textOutline]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1565c0',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1565c0' },
  disabled: { opacity: 0.5 },
  text: { color: '#fff', fontWeight: '600' },
  textOutline: { color: '#1565c0' },
});
