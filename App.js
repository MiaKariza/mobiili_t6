import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ItemSeparatorComponent,
  Button,
} from "react-native";

export default function App() {
  const [hakusana, setHakusana] = useState("");
  const [lista, setLista] = useState([]);
  console.log(lista);

  const fetchUrl = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + hakusana
      );
      const json = await response.json();
      setLista(json.meals);
    } catch (error) {
      alert("Reseptien haku ei onnistunut");
    }
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <View style={[{ paddingTop: 60 }, styles.container]}>
      <View style={styles.list}>
        <View>
          <StatusBar style="auto" />
          <FlatList
            data={lista}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <View>
                <View>
                  <Text>{item.strMeal}</Text>
                </View>
                <Image
                  style={styles.image}
                  source={{ uri: item.strMealThumb }}
                />
              </View>
            )}
            ItemSeparatorComponent={listSeparator}
          />
        </View>
      </View>
      <View
        style={[
          styles.container,
          { justifyContent: "flex-end", paddingBottom: 5 },
        ]}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setHakusana(text)}
          value={hakusana}
        />
        <Button title="Find" onPress={() => fetchUrl()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  list: {
    flex: 7,
    paddingBottom: 10,
    width: 300,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  input: {
    borderBottomColor: "#0096FF",
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 15,
    color: "#000000",
    textAlign: "center",
  },
});
