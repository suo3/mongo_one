import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchBookData = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      const json = await response.json();
      setData(data);
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBookData();
  }, []);
  return <View style={styles.container}>{appHeaderSection}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: 300,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

//Header Section
const appHeaderSection = (
  <View style={styles.container}>
    <Image
      src="https://placehold.it/100x150"
      style={{ height: 50, width: 50, marginTop: 10 }}
    />
    <Text>BPBBBB</Text>

    <StatusBar style="auto" />
  </View>
);
