import React, {useState, useEffect} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
//import Button from '../components/Button'
import firestore from '@react-native-firebase/firestore';

import { View, StyleSheet, Button, Text, FlatList } from 'react-native'
import { DataTable, DataTableRow, DataTableCell } from 'react-native-paper'; 



export default function Dashboard({ navigation }) {
  const today = new Date().toISOString().split('T')[0];
  //setExercises(collection.docs());
  const [exercise, setExercises] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('exercises')
      .where('dateDone', '==', today)
      .onSnapshot(querySnapshot => {
        const exercises = [];
  
        querySnapshot.forEach(documentSnapshot => {
          exercises.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setExercises(exercises);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  async function deleteExercises(){
    
    await firestore()
      .collection('exercises')
      .where('dateDone', '==', today)
      .get()
      .then(querySnapshot => {
        
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.ref.delete();
        });
      });
      
  }
  
  return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Add Workout" onPress={() => navigation.navigate('workoutScreenStack')}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Delete Workout" onPress={() => deleteExercises()}></Button>
          </View>
        </View>
        <FlatList
          data={exercise}
          contentContainerStyle={{gap: 10}}
          renderItem={({ item }) => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "deepskyblue" }}>
              <Text>Exercise Name: {item.name}</Text>
              <Text>Areas Affected: {item.areasAffected}</Text>
              <Text>Sets: {item.sets}</Text>
              <Text>Reps: {item.reps}</Text>
              <Text>Weight: {item.weight}</Text>
            </View>
          )}
        />
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
  },
  buttonsContainer: {
    alignItems: 'flex-start',
    flexDirection: "row",
  },
  buttonContainer: {
    margin:  4,
  },
  
  

});
