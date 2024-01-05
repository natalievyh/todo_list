import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/task';
import { useState } from 'react';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // append new task to items array
    setTaskItems([...taskItems, task]);
    setTask(null);
    Keyboard.dismiss();
  }

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

    {/* Today's Tasks */}
    <View style={styles.tasksWrapper}> 
      <Text style={styles.sectionTitle}> Today's Tasks </Text>

      <View style={styles.items}>
        {/* list of tasks */}
        {
          taskItems.map((item, index) => {
            return (
            <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
              <Task text={item}/>
            </TouchableOpacity>
            )
          })
        }
        
      </View>

    </View>

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}>
      <TextInput style={styles.input} placeholder={'Enter a Task...'} value={task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BA47F',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4B5942'
  },
  items: {
    marginTop: 20
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#C5D5BD',
    borderRadius: 60,
    borderColor: '#7E9374',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#C5D5BD',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7E9374',
    borderWidth: 1,
  },
  addText: {},
});
