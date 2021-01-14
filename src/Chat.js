import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import "./chat.css";
import db from "./firebase";

//icons
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId); //selects the current channel id
  const channelName = useSelector(selectChannelName); //selects the current channel name
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //gets fired off once

    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(
          (snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())) //gets data
        ); //gets the specific doc for the channel
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault(); //stops it from refreshing!!!

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //get server timestamp
      message: input,
      user: user,
    });

    setInput(""); //set input to empty
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          //maps through each message and renders it out
          <Message
            timestamp={message.timestamp}
            user={message.user}
            message={message.message} //sends in 3 props
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Messages
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
