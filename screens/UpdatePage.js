// UpdatePage.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UpdatePage = ({ route, navigation }) => {
  const { studentId, handleUpdateStudent } = route.params;
  const [updatedStudent, setUpdatedStudent] = useState({
    idno: '',
    lastname: '',
    firstname: '',
    course: '',
    level: ''
  });

  useEffect(() => {
    fetchStudentForEditing();
  }, []);

  const fetchStudentForEditing = async () => {
    try {
      const response = await fetch(`http://localhost:4321/students/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student for editing');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setUpdatedStudent(data[0]);
      } else {
        console.error('No student data found');
      }
    } catch (error) {
      console.error('Error fetching student for editing:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4321/students/:id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStudent)
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      handleUpdateStudent(updatedStudent);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedStudent(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={updatedStudent.idno}
        onChangeText={text => handleChange('idno', text)}
        placeholder="ID Number"
      />
      <TextInput
        style={styles.input}
        value={updatedStudent.lastname}
        onChangeText={text => handleChange('lastname', text)}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={updatedStudent.firstname}
        onChangeText={text => handleChange('firstname', text)}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={updatedStudent.course}
        onChangeText={text => handleChange('course', text)}
        placeholder="Course"
      />
      <TextInput
        style={styles.input}
        value={updatedStudent.level}
        onChangeText={text => handleChange('level', text)}
        placeholder="Level"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    width: '80%'
  },
  button: {
    backgroundColor: '#4A2558',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default UpdatePage;
