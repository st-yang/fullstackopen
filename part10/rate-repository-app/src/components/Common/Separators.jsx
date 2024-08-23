import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  verticalSeparator: {
    width: 16,
  },
  HorizontalSeparator: {
    height: 16,
  },
})

export const ItemSeparator = () => <View style={styles.separator} />

export const VerticalSeparator = () => <View style={styles.verticalSeparator} />

export const HorizontalSeparator = () => <View style={styles.HorizontalSeparator} />
