import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

type ActionButtonProps = {
  title: string
  onPress?: () => void
  disabled?: boolean
  accessibilityLabel?: string
  accessibilityHint?: string
}

export default function ActionButton({
  title,
  onPress,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}: ActionButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.btn,
          disabled && styles.btnDisabled,
          pressed && !disabled && styles.btnPressed,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              styles.text,
              disabled && styles.textDisabled,
              pressed && !disabled && styles.textPressed,
            ]}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },

  btn: {
    width: '60%',
    minHeight: 48,
    backgroundColor: '#2600ff',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnPressed: {
    backgroundColor: '#1900b3',
  },

  btnDisabled: {
    backgroundColor: '#cccccc',
  },

  text: {
    color: '#f2f2f2',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    fontSize: 18,
    textAlign: 'center',
  },

  textPressed: {
    color: '#e0e0e0',
  },

  textDisabled: {
    color: '#888888',
  },
})