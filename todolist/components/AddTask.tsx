import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
 
type Props = {
  onAdd: (name: string) => void;
};
 
export default function AddTask({ onAdd }: Props) {
  const [text, setText] = useState<string>('');
 
  const save = (): void => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onAdd(trimmed);
    setText('');
  };
 
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        placeholderTextColor="#c7c7cd"
        value={text}
        onChangeText={setText}
        onSubmitEditing={save}
        returnKeyType="done"
      />
      {/* Natiivi Button: iOS:llä sininen "Save"-teksti kuten kuvassa */}
      <Button title="Save" onPress={save} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 24,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingVertical: 6,
    marginRight: 16,
  },
});
 