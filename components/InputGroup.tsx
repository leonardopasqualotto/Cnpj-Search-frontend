import { InputGroupProps } from '@/utils/interfaces';
import { Text,TextInput, StyleSheet } from 'react-native';

 export function InputGroup({label, ...rest}: InputGroupProps) {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input} {...rest}/>
    </>
  );
}

const styles = StyleSheet.create({
inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937'
  },
  input: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    fontSize: 14,
    color: '#1f2937',
  }
})