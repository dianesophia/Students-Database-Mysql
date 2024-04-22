import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Header from './header';

const AddPage = ({ navigation }) => {
  const [idno, setIdno] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');

  const handleAddStudent = async () => {
    try {
      const response = await fetch("http://localhost:4321/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idno,
          lastname,
          firstname,
          course,
          level,
        }),
      });
      const result = await response.json();
      console.log("Success:", result);
      if (!response.ok) {
        throw new Error("Failed to add student");
      }
      setIdno('');
      setLastname('');
      setFirstname('');
      setCourse('');
      setLevel('');
      navigation.navigate("Home", { newStudent: result }); 
    } catch (error) {
      console.error("Error adding student:", error);
      if (error.code === 'ER_DUP_ENTRY') {
        Alert.alert("Error", "A student with the same ID already exists.");
      } else {
        Alert.alert("Error", "Failed to add student. Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainView}>
        <TextInput
          style={styles.input}
          placeholder='Id number'
          value={idno}
          onChangeText={setIdno}
        />
        <TextInput
          style={styles.input}
          placeholder='Last name'
          value={lastname}
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.input}
          placeholder='First name'
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          style={styles.input}
          placeholder='Course'
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={styles.input}
          placeholder='Level'
          value={level}
          onChangeText={setLevel}
        />
        <TouchableOpacity onPress={() => handleAddStudent()} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Student</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    marginTop: 100,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A2558"',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4A2558',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddPage;
