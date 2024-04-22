import axios from 'axios';
import React, {useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import image from './Gemini.png'

const Chat = () => {
  const [question, setQuestion] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatResponse,setChatResponse]=useState('')

  const sendMessage = () => {
    if (inputValue.trim() === '') return;
    setQuestion(inputValue)
    gemini();
    setInputValue('')
  };
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const gemini = async () => {
    
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC9IhchGDyUjcrIItScgnqURrs0W5B9gBg`,
        method: "post",
        data: {"contents":[{"parts":[{"text":inputValue}]}]},
      });
      const mybot= await response.data?.candidates[0]?.content?.parts[0].text;
      setChatResponse(mybot);
  };
  
 

  return (
   <>
   <div className="flex h-screen">
   <div className="bg-gray-200 w-1/6 p-4 flex justify-centre">
    <img src={image} className='w-10 h-10 border-2 rounded-full border-gray-800' alt="" />
    <h2 className='font-bold ml-3 text-xl'>Gemini</h2>
    </div>

  <div className="flex flex-col w-full justify-center">
    <div className="flex-1 overflow-y-auto p-4">
    <div className="flex justify-end w-full items-center">
      <FontAwesomeIcon icon={faUser} className="text-xl text-blue-600" />
      {question && (
      <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
        {question}
      </div>
)}

    </div>

    <div className="max-w-1/2 flex flex-row items-center">
          <img src={image} className='w-14 h-10' alt="" />
        </div>
    <div className="flex justify-start w-2/3">
    {chatResponse && (
            <div className='bg-blue-200 text-gray-800 rounded-lg m-2 p-2'>
           {chatResponse}
            </div>
          )}
    </div>
      
    </div>
    
    
    <div className="flex items-center p-4 border-t ">
      <input type="text" className="flex-1 px-4 py-2 mr-2 border rounded-full focus:outline-none focus:border-blue-500" placeholder="Type a message..." value={inputValue} onChange={handleInputChange} />
      <button className="px-4 py-2 text-white bg-blue-500 rounded-full" onClick={sendMessage}>
        Send
      </button>
    </div>
  </div>
</div>

   </>
  );
};

export default Chat;
