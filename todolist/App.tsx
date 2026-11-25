import { useEffect, useState } from 'react'
import { Platform, SafeAreaView, StatusBar as RNStatusBar, StyleSheet, Text, } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
 
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import { Task } from './types'

 
const STORAGE_KEY = '@todo_tasks'
 
export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
 
  // Ladataan tehtävät puhelimen muistista sovelluksen käynnistyessä
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY)
        if (json !== null) {
          setTasks(JSON.parse(json) as Task[])
        }
      } catch (e) {
        console.log('Error loading tasks', e)
      } finally {
        setLoaded(true)
      }
    };
    loadTasks()
  }, [])
 
  // Tallennetaan aina kun lista muuttuu (vasta latauksen jälkeen,
  // ettei tyhjä lista ylikirjoita tallennettua dataa)
  useEffect(() => {
    if (!loaded) return;
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      } catch (e) {
        console.log('Error saving tasks', e)
      }
    }
    saveTasks()
  }, [tasks, loaded])
 
  const addTask = (name: string): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      done: false,
    }
    // Uusi taulukko vanhan muokkaamisen sijaan
    setTasks([...tasks, newTask])
  }
 
  const toggleTask = (id: string): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo list</Text>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // SafeAreaView hoitaa iOS:n, Androidilla lisätään statuspalkin korkeus
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
})
 