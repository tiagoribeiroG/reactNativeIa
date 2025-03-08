
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Platform,
  ImageBackground,
  Pressable,
  ScrollView
} from "react-native";
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import Slider from "@react-native-community/slider";

const statusBarHeight = StatusBar.currentHeight;

export default function App() {
  const [stayDuration, setStayDuration] = useState(10);
  const [loading, setLoading ] = useState(true)
  const [travel, setTravel] = useState()

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
          />
          
          <Text style={styles.label}>
            Tempo de estadia: <Text style={styles.days}> {stayDuration} </Text> dias
          </Text>
          
          <Slider
            style={{  }}
            minimumValue={1}
            maximumValue={30}
            step={1}
            value={stayDuration}
            onValueChange={(value) => setStayDuration(value)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Gerar Roteiros</Text>
            <MaterialIcons name="travel-explore" size={24} color="#fff" />
        </Pressable>
        <ScrollView contentContainerStyle={{ paddingBottom: 16, marginTop: 4, }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <Text style={styles.title}>Roteiro da sua Viagem 🤞</Text>
                <Text style={styles.title}>Aqui vai ser o roteiro completo..</Text>

            </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Escurece a imagem de fundo para melhorar contraste
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
    backgroundColor: "#1E293B", // Azul moderno escuro
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
    borderColor: "#3B82F6", // Azul moderno para realce
    padding: 8,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 16,
    backgroundColor: "#15202f",
  },
  days: {
    fontWeight: "bold",
    color: "#3B82F6", // Azul moderno para destaque
  },
  button:{
    backgroundColor: '#ff5656',
    width: "90%",
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,


  },
  buttonText:{
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',

  },
  content:{
   backgroundColor: '#15202f',
   padding: 16,
   width: '100%',
   marginTop: 16,
   borderRadius: 8,


  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
    color: '#fff',

  },
  containerScroll:{
    width: '90%',
    marginTop: 8,

  }
});
