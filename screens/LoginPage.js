import React, { useState } from 'react';
import Header from './header';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (!username) {
      setUsernameError('Username cannot be empty');
      return;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password cannot be empty');
      return;
    } else {
      setPasswordError('');
    }

    fetch('http://localhost:4321/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        setLoginError('Invalid username or password');
        return;
      }
      console.log('Login successful:', data);
      navigation.navigate("Home", { user: data });
      setUsername('');
      setPassword('');
    })
    .catch(error => {
      console.error('Error logging in:', error);
      setLoginError('Wrong username or password');
    });
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
      <Header/>
      <View style={styles.loginContainer}>
        <Text style={styles.titlePage}>Login Page</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder='Username'
            value={username}
            onChangeText={text => {
              setUsername(text);
              setUsernameError('');
              setLoginError('');
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
              setLoginError('');
            }}
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.errorText}>{passwordError}</Text>
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 15}}>OR</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("SignUp Page")}>
          <Text style={styles.registerText}>Register</Text>
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
  loginContainer: {
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
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#4A2558',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default LoginPage;
