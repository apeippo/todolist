import { Pressable, StyleSheet, Text } from 'react-native';
import { Task } from '../types';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <Pressable onPress={() => onToggle(task.id)}>
      {/* Ehdollinen tyyli: yliviivaus kun tehtävä on tehty */}
      <Text style={[styles.text, task.done && styles.done]}>{task.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingVertical: 8,
  },
  done: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
