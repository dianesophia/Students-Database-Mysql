  import React, { useEffect, useState } from 'react';
  import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, TextInput, ImageBackground } from 'react-native';
  import Header from './header';
  import { Feather } from '@expo/vector-icons'; 

  const Home = ({ route, navigation }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [modal, setModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await fetch("http://localhost:4321/students");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };

      fetchStudents();
    }, []);

    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:4321/students/${selectedStudent.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        setModal(false);
        setStudents(prevStudents => prevStudents.filter(student => student.id !== selectedStudent.id));
        Alert.alert("Student Deleted", "The student has been successfully deleted.");
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    };

    const handleStudentPress = (student) => {
      setSelectedStudent(student);
      setModal(true);
    }

    const closeModal = () => {
      setModal(false);
    }

    const handleAddStudent = (newStudent) => {
      setStudents(prevStudents => [...prevStudents, newStudent]);
    };

    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleStudentPress(item)} style={styles.studentData}>
        <View style={styles.itemContainer}>
          <Text style={styles.cell}>{item.id}</Text>
          <Text style={styles.cell}>{item.username}</Text>
          <Text style={styles.cell}>{item.password}</Text>
        </View>
      </TouchableOpacity>
    );

    const TableHeader = () => (
      <View style={[styles.itemContainer, styles.headerContainer]}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Username</Text>
        <Text style={[styles.cell, styles.headerCell]}>Password</Text>
      </View>
    );

    const filteredStudents = students.filter(student => {
      const fullName = `${student.username} ${student.password}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <ImageBackground source={require('../assets/bg.jpg')}style={styles.backgroundImage}  >
          <View style={styles.container}>
          <Header />
          <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍  Search Name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

          <View style={styles.contentContainer}>
            <TableHeader />
            <FlatList
              data={filteredStudents}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modal}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Username: {selectedStudent.username}</Text>
                <Text>Password: {selectedStudent.password}</Text>
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity onPress={() => handleDelete()} style={styles.modalButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => closeModal()} style={[styles.modalButton, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate("Login Page", { handleAddStudent })}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
    height: '100%',
    },
    container: {
      flex: 1,
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginTop: 100,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 30,
      marginBottom: 30,
      width: 900,
      alignSelf: 'center',
    },
    contentContainer: {
      backgroundColor: 'white',
      marginTop: 20,
    padding: 30,
      width: 900,
      alignSelf: 'center',
      borderRadius: 15,
    },
    itemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    cell: {
      flex: 1,
      fontSize: 16,
    },
    headerContainer: {
      backgroundColor: '#4A2558',
    },
    headerCell: {
      color: 'white',
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '30%',
      alignSelf: 'center', 
      justifyContent: 'center'
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#4A2558',
      borderRadius: 5,
    },
    cancelButton: {
      backgroundColor: '#ccc',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    addBtn: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#4A2558',
      borderRadius: 30,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addText: {
      fontSize: 15,
      color: 'white',
    },
    flatListContainer: {
      flexGrow: 1,
    },
    studentData: {
      borderColor: "#4A2558",
      width: '100%',
      alignSelf: 'center',
      marginTop: 10,
      borderWidth: 2,
      borderRadius: 10,
    },
    logoutBtn: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#4A2558',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: 150,
      height: 50,
      borderRadius: 15,
    },
    logoutText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
    },
    searchIcon: {
      position: 'absolute',
      left: 10,
      top: 10,
    },
    
  });

  export default Home;
