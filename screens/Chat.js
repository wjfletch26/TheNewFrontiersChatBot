import { View, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useTheme } from "../themes/ThemeProvider";
import { fireStoreDB } from "../utils/firebaseHelper";
import { collection, addDoc } from "firebase/firestore";
import { OPENAI_KEY } from "@env";

// Thanks for watching...
const Chat = ({ navigation }) => {
  const [inputMessage, setInputMessage] = useState("");
  //   console.log(inputMessage);
  //   console.log("these are the end users messages");

  const [outputMessage, setOutputMessage] = useState("");
  //   console.log("these are WHIPPYS messages");
  //   console.log(outputMessage);

  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([]);
  const { colors } = useTheme();

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.primary,
                marginRight: 12,
                marginVertical: 12,
              },
            }}
            textStyle={{
              right: {
                color: COLORS.white,
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={images.avatar}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginLeft: 8,
            }}
          />
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.secondaryWhite,
                marginLeft: 12,
              },
            }}
            textStyle={{
              left: {
                color: COLORS.black,
              },
            }}
          />
        </View>
      );
    }
  };

  // Implementing chat generation using gpt-3.5-turbo model
  const generateText = () => {
    setIsTyping(true);
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createAt: new Date(),
      user: { _id: 1 },
    };

    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, [message])
    );

    /**
     * Always put your api key in an environment file
     */

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: inputMessage,
          },
        ],
      }),
    })
      // if successful return response from OpenAI, then... take the response and...
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        // clear user's question in the state
        setInputMessage("");

        // set whippys answer in the state (so we can do something with it)
        setOutputMessage(data.choices[0].message.content.trim());

        // Format whippys(ChatGPT's) answer and store in the FireStoreDB
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: data.choices[0].message.content.trim(),
          createAt: new Date(),
          user: { _id: 2, name: "ChatGPT" },
        };

        // take WHIPPYs message and store in the messages collection in firestore
        addDoc(collection(fireStoreDB, "messages"), {
          message: message,
        });
        console.log(message);

        setIsTyping(false);
        setMessages((previousMessage) =>
          GiftedChat.append(previousMessage, [message])
        );
      });
  };

  const submitHandler = () => {
    generateText();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          height: 60,
          backgroundColor: colors.background,
          position: "absolute",
          top: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 22,
          width: SIZES.width,
          zIndex: 9999,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Save chat")}>
          <Ionicons name="bookmark-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{ _id: 1 }}
          minInputToolbarHeight={0}
          renderMessage={renderMessage}
          isTyping={isTyping}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.background,
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            backgroundColor: colors.background,
            paddingVertical: 8,
            marginHorizontal: 12,
            borderRadius: 12,
            borderColor: colors.text,
            borderWidth: 0.2,
          }}
        >
          <TextInput
            value={inputMessage}
            onChangeText={(e) => setInputMessage(e)}
            placeholder="Enter your question"
            placeholderTextColor={colors.text}
            style={{
              color: colors.text,
              flex: 1,
              paddingHorizontal: 10,
            }}
          />

          <TouchableOpacity
            onPress={submitHandler}
            style={{
              padding: 6,
              borderRadius: 8,
              marginHorizontal: 12,
              zIndex: 9999,
            }}
          >
            <FontAwesome
              name="arrow-circle-right"
              color={COLORS.primary}
              size={60}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
