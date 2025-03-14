import React, {useState, useCallback} from 'react';
import {View, Text, SafeAreaView, TextInput, FlatList, Button, StyleSheet} from 'react-native';
import Background from '../components/Background';
import { createContext, useReducer } from 'react';
import firestore from '@react-native-firebase/firestore';



export default function Workout() {
  const date = new Date().toISOString().split('T')[0];
  const[name, setName] = useState('');
  const[type, setType] = useState('');
  const[reps, setReps] = useState(0);
  const[weight, setWeights] = useState(0);
  const[sets, addSets] = useState(0);

  const ref = firestore().collection('exercises');
  
  async function addExercise(){
    await ref.add({
      name: name,
      areasAffected: type, 
      dateDone: date,
      sets: sets,
      reps: reps,
      weight: weight
    });
    setName('');
    setType('');
    setReps(0);
    setWeights(0);
    addSets(0);
    
  }
  

















  return (
    <>
      {/* ... */}
      <Text style={{textAlign: 'center'}}>New Exercise Name</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName} />
      <Text style={{textAlign: 'center'}}>Muscle groups affected</Text>
      <TextInput style={styles.textInput} value={type} onChangeText={setType} />
      <Text style={{textAlign: 'center'}}>Sets done</Text>
      <TextInput style={styles.textInput} value={sets} onChangeText={addSets} />
      <Text style={{textAlign: 'center'}}>Reps done</Text>
      <TextInput style={styles.textInput} value={reps} onChangeText={setReps} />
      <Text style={{textAlign: 'center'}}>Weight in lbs</Text>
      <TextInput style={styles.textInput} value={weight} onChangeText={setWeights} />
      <Button title="addExercise" onPress={() => addExercise()}>Add Exercise</Button>
      {/* ... */}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15
  }
})