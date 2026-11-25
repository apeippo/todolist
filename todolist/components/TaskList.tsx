import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { Task } from '../types';
 
type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
};
 
export default function TaskList({ tasks, onToggle }: Props) {
  return (
    <FlatList
      style={styles.list}
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} onToggle={onToggle} />}
    />
  );
}
 
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
});
 