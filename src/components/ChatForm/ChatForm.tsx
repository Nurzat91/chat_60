import {ChangeEvent, useState} from 'react';

const ChatForm = () => {
  const [postMessage, setPostMessage] = useState('');
  const [authorName] = useState('Sun');
  const url = 'http://146.185.154.90:8000/messages';
  const sendMessage = async () =>{
   try {
     const data = new URLSearchParams();
     data.set('message', postMessage);
     data.set('author', authorName);

     await fetch(url, {
       method: 'post',
       body: data,
     });

     setPostMessage('');
   } catch (error) {
     console.error("Error:", error);
   }
  };
  const inputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setPostMessage(e.target.value);
  };


  return (
    <div className="my-3">
      <h3>author: {authorName}</h3>
      <form className="d-flex my-3">
        <input
          className="form-control"
          type="text"
          value={postMessage}
          onChange={inputChange}
        />
        <button className="btn btn-outline-success ms-3" type="button" onClick={sendMessage} >Send</button>
      </form>
    </div>
  );
};
export default ChatForm;