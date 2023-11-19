import {useState} from 'react';

const ChatForm = () => {
  const [postMessage, setPostMessage] = useState('');
  const url = 'http://146.185.154.90:8000/messages';
  const postRequest = async () =>{
   try {
     const data = new URLSearchParams();
     data.set('message', 'Sun');
     data.set('author', 'John Doe');

     const response = await fetch(url, {
       method: 'post',
       body: data,
     });
     console.log(response);
   } catch (error) {
     console.error("Error:", error);
   }
  }


  return (
    <form className=" container d-flex my-3">
      <input
        className="form-control"
        type="text"
        value={postMessage}

      />
      <button className="btn btn-outline-success ms-3" type="button" onClick={postRequest} >Send</button>
    </form>
  );
};
export default ChatForm;