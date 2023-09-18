import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useState } from "react";
import { useEffect } from "react";
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
export function AddQuestion({fetchQuestions}) {
  const [open, setOpen] = React.useState(false);
  const [question, setNewQuestion] = useState("");
  
  const token = getLocal();
  const { user_id } = jwtDecode(token);

 
  const handleOpen = () => setOpen(!open);


  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/message/create-questions/`, {
      question: question,
      user: user_id ,
    })
    .then(response => {
      setNewQuestion("");
      handleOpen();  
      fetchQuestions();  
      toast.success('Question submited successfully')
    })
    .catch(error => {
      console.error('Error submitting question:', error);
      toast.error('Error submitting question:', error);
    });
  };


 
  return (

    
    <>
      <Button onClick={handleOpen}>ASk Question</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader></DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmitQuestion}>
        <DialogBody divider>
          <div className="grid gap-6">

            <Textarea label="Ask new Question"  onChange={e => setNewQuestion(e.target.value)}/>
          </div>
  
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" type="submit" onClick={handleOpen}>
            send message
          </Button>
        </DialogFooter>
        <ToastContainer />
        </form>
      </Dialog>
    </>
  );
}