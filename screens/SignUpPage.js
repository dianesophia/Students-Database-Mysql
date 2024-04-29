import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import Header from './header';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleAddStudent = async () => {
    try {
      const response = await fetch("http://localhost:4321/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result = await response.json();
      console.log("Success:", result);
      if (!response.ok) {
        throw new Error("Failed to add student");
      }
      setUsername('');
      setPassword('');
      navigation.navigate("Home", { newStudent: result }); 
    } catch (error) {
      console.error("Error adding student:", error);
      if (error.code === 'ER_DUP_ENTRY') {
        Alert.alert("Error", "A student with the same username already exists.");
      } else {
        Alert.alert("Error", "Failed to add student. Please try again later.");
      }
    }
  };
  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
      <Header />
      <View style={styles.mainView}>
        <Text style={styles.titlePage}>Sign Up Page</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder='Username'
            value={username}
            onChangeText={text => {
              setUsername(text);
              setUsernameError('');
            }}
          />
        </View>
        <Text style={styles.errorText}>{usernameError}</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.errorText}>{passwordError}</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
        <TouchableOpacity onPress={handleAddStudent} style={styles.loginButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 15}}>OR</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.registerButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    height: '100%',
  },
  mainView: {
    width: 900,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 50,
  },
  titlePage:{
    fontSize: 35,
    marginBottom: 30,
    color: 'black',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  inputIcon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#4A2558',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '50%'
  },
  registerButton: {
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  loginText:{
    color: '#4A2558',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default SignUpPage;
