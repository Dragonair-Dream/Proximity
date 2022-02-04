import React from 'react';

const ChatMessages = (props) => {
  const { text, uid, photoUrl } = props.message;
  // console.log(props.message.getRef());
  return <div>{text}</div>;
};

export default ChatMessages;
