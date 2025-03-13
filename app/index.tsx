import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Platform,
  ImageBackground,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { API_KEY } from '@env';

const statusBarHeight = StatusBar.currentHeight;
console.log(API_KEY);


export default function App() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);5
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState("");

  async function handleGenerate() {
    if(city === ""){
      Alert.alert("Atençao", "Preencha o nome da Cidade")
      return;

    }
    setLoading(true);
    Keyboard.dismiss();
    const prompt = `Crie um roteiro para viagem de exatos ${days} dias na cidade ${city}, busque lugares turisticos, lugares mais visitados, forneca apenas em topicos com nome de local e onde ir em cada dia`


    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        message:[
          {
            role: 'user',
            content: prompt
          }
        ], 
        temperature: 0.20,
        max_tokens: 500,
        top_p: 1,
      })

    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.choices[0].message.content);
      setTravel(data.choices[0].message.content)

    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setLoading(false);
    })

    setTimeout(() => {
      setTravel(`Roteiro para ${city} por ${days.toFixed(0)} dias.`);
      setLoading(false);
    }, 2000);
  }

  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/800/600" }}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <Text style={styles.heading}>Roteiros</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Cidade destino</Text>
          <TextInput
            placeholder="Ex: Campo Grande, MS"
            placeholderTextColor="#A1A1A1"
            style={styles.input}
            value={city}
            onChangeText={(text) => setCity(text)}
          />

          <Text style={styles.label}>
            Tempo de estadia: <Text style={styles.days}>{days.toFixed(0)}</Text>{" "}
            dias
          </Text>

          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            step={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={days}
            onValueChange={(value) => setDays(value)}
          />
        </View>

        <Pressable style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Gerar Roteiros</Text>
          <MaterialIcons name="travel-explore" size={24} color="#fff" />
        </Pressable>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 16, marginTop: 4 }}
          style={styles.containerScroll}
          showsVerticalScrollIndicator={false}
        >
          {loading && (
            <View style={styles.content}>
              <Text style={styles.title}>Carregando Roteiro...</Text>
              <ActivityIndicator size="large" color="#3B82F6" />
            </View>
          )}

          {!loading && travel && (
            <View style={styles.content}>
              <Text style={styles.title}>Roteiro da sua Viagem 🤞</Text>
              <Text style={styles.travelText}>{travel}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? statusBarHeight : 54,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E1E1E1",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  form: {
    backgroundColor: "#1E293B",
    width: "90%",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#E1E1E1",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#3B82F6",
    padding: 8,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 16,
    backgroundColor: "#15202f",
  },
  days: {
    fontWeight: "bold",
    color: "#3B82F6",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  button: {
    backgroundColor: "#ff5656",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#15202f",
    padding: 16,
    width: "100%",
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
    color: "#fff",
  },
  travelText: {
    fontSize: 16,
    color: "#E1E1E1",
    textAlign: "center",
  },
  containerScroll: {
    width: "90%",
    marginTop: 8,
  },
});
