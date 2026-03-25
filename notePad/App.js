import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Pressable } from 'react-native';

export default function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const saveNote = () => {
    if (!input) return;
    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? { ...n, text: input } : n));
      setEditingId(null);
    } else {
      setNotes([...notes, { id: Math.random().toString(), text: input }]);
    }
    setInput('');
  };
  const editNote = (note) => {
    setInput(note.text);
    setEditingId(note.id);
  };
  const deleteNote = (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setNotes(notes.filter(n => n.id !== id)), 
        style: "destructive"
      }
    ]
    );
  };
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => editNote(item)}
      onLongPress={() => deleteNote(item.id)}
      style={styles.noteContainer}
    >
      <Text style={styles.note}>{item.text}</Text>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Write Note"
      />
      <Button
        title={editingId ? "Update Note" : "Add Note"}
        onPress={saveNote}
      />
      <Text style={styles.title}>List of Notes:</Text>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f0f0f0"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },
  noteContainer: {
    backgroundColor: "#fff",  
    padding: 15,
    borderRadius: 15, 
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  note: {
    fontSize: 16
  }
});