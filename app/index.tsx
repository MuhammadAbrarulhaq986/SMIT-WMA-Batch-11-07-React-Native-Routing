// app/index.tsx
import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

interface Item {
  name: string;
  id: number;
}

const Index = () => {
  const [users, setUsers] = useState<null | Item[]>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User List</Text>
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>Error occurred</Text>}
      {users &&
        users.map((item: Item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Link href={`/user/${item.id}`} style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </Link>
          </View>
        ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Changed to 1 for better flexibility
    padding: 20, // Increased padding for more space around content
    margin: 10, // Reduced margin for better use of space
    backgroundColor: "#f0f0f0", // Softer background color
    borderRadius: 12, // Rounded corners
    shadowColor: "#000", // Shadow effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // Slightly increased opacity for a more prominent shadow
    shadowRadius: 5, // Increased radius for a softer shadow
    elevation: 5, // For Android shadow
  },
  itemContainer: {
    backgroundColor: "#ffffff", // Changed to white for contrast
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center", // Center the title
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4a4a4a",
  },
  button: {
    backgroundColor: "#007BFF", // Bootstrap primary color
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#007BFF",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#FF0000",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Index;
