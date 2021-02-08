// @refresh reset
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TextInput, View, Button } from "react-native";
import firebaseConfig from '../firebaseConfig'
import { usuarioRandom } from "../helpers/auth";
import { sendPushNotification } from "../helpers/notificationConfig";

export default function Chat({mascotaId, notification}) {
  const chatsRef = firebaseConfig().collection(mascotaId);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    (async ()=> {
      await readUser();
    })();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
  
  async function handlePress() {
   
    const user = await usuarioRandom()
    if(user) setUser(user);
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
    sendPushNotification(notification, 'alguien vio tu perrito!!', messages[0].text);
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={name}
          onChangeText={setName}
        />
        <Button onPress={() => handlePress()} title="Enter the chat" />
      </View>
    );
  }
  return <GiftedChat messages={messages} user={user} onSend={handleSend}  />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
});
