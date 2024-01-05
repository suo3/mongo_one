import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchBookData = async () => {
    try {
      const response = await fetch("http://10.0.0.61:3000/books");
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBookData();
  }, []);

  //Books list section
  const appBookListSection = (
    <View style={styles.appBookListSection}>
      <FlatList
        data={data}
        //data defined in constructor
        ItemSeparatorComponent={itemSeparatorView}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {appHeaderSection} {appBookListSection}
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    flex: "1",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 10,
    minWidth: 300
  },
  container: {
    flex: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: 300,
    marginLeft: "auto",
    marginRight: "auto"
  },
  logo: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 150,
    marginTop: 20,
    marginBottom: 20
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20
  },
  appBookListSection: {
    marginBottom: 400
  },
  bookCover: {
    backgroundColor: "#ccc",
    width: 280,
    minHeight: 350,
    marginTop: 20,
    marginBottom: 20
  },
  bookListTitle: {
    fontSize: 25,
    fontWeight: "bold",
    maxWidth: 280,
    marginLeft: "auto",
    marginRight: "auto"
  },
  bookListAuthor: {
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: 280,
    fontStyle: "italic",
    marginLeft: "auto",
    marginRight: "auto"
  },
  itemSeparator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "darkblue",
    borderWidth: 2,
    borderBottomColor: "darkmagenta",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 280,
    marginLeft: "auto",
    marginRight: "auto"
  },
  thumbsUP: {
    width: 200,
    marginBottom: 5
  },
  thumbsDOWN: {
    width: 200,
    marginTop: 5,
    marginBottom: 5
  },
  booklistview: {
    borderWidth: 1,
    borderColor: "blue",
    marginTop: 20,
    minHeight: 200,
    minWidth: 400,
    backgroundColor: "#ccc"
  }
});

//Header Section
const appHeaderSection = (
  <View style={styles.container}>
    <Image src="https://placehold.it/100x150" style={styles.logo} />
    <Text style={styles.heading}>Welcome to the Book Manager APP</Text>

    <StatusBar style="auto" />
  </View>
);

//Thumbs Up Button
const thumbsUP = (id, data) => {
  return (
    <FontAwesome.Button name="thumbs-up" onPress={() => doThumbsUP(id, data)}>
      Thumbs Up
    </FontAwesome.Button>
  );
};
//Thumbs Down Button
const thumbsDOWN = (id) => {
  return (
    <FontAwesome.Button name="thumbs-down" onPress={() => doThumbsDOWN()}>
      Thumbs Down
    </FontAwesome.Button>
  );
};

const doThumbsUP = (id, data) => {
  console.log("Thumbs Up Pressed");
  console.log(id);
  console.log(data);
  fetch("http://10.0.0.61:3000/books/thumbsUp/" + id, {
    method: "PATCH",
    body: data
  });
};

const doThumbsDOWN = (id) => {
  console.log("Thumbs Down Pressed");
  console.log(id);
  fetch("http://10.0.0.61:3000/books/thumbsDown/" + id, { method: "PUT" });
};

//Book List Section
const ItemView = ({ item }) => {
  return (
    //Single comes here which will be repetitve for the FlatListItems
    <View style={styles.bookContainer}>
      <Text style={styles.bookContainer}>{item.title}</Text>
      <Text style={styles.bookListAuthor}>{item.author}</Text>
      <Image
        source={{ uri: "./assets/splash.png" }}
        styles={styles.bookCover}
        height={300}
        width={300}
      />
      <View>
        <Image
          source={{ uri: "./assets/splash.png" }}
          styles={styles.bookCover}
          height={300}
        />
      </View>
      <View style={styles.thumbsUP}>
        {thumbsUP(item._id, item)} <strong>{item.thumbsUP}</strong>
      </View>
      <View style={styles.thumbsDOWN}>{thumbsDOWN(item._id)}</View>
    </View>
  );
};

const itemSeparatorView = () => {
  return (
    //Item Separator
    <View style={styles.itemSeparator} />
  );
};
