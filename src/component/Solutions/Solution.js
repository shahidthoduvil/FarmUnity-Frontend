import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { AddQuestion } from "./AddQuestion";
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { faTrashAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Solution = () => {
  const [questions, setQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [answer, setNewAnswer] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const token = getLocal();
  const { user_id } = jwtDecode(token);
  
  const navigate=useNavigate()
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
    }
  }, []);

  const fetchQuestions = () => {
    axios.get(`${BASE_URL}/message/questions/`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };
  

  useEffect(() => {

    fetchQuestions();
  }, []);

  useEffect(() => {

    questions.forEach(question => {
      axios.get(`${BASE_URL}/message/${question.id}/solutions/`)
        .then(response => {
          setSolutions(prevSolutions => [...prevSolutions, ...response.data]);
        })
        .catch(error => {
          console.error('Error fetching solutions:', error);
          toast.error('Error fetching solutions')

        });
    });
  }, [questions]);



  const handleSubmitSolution = (questionId) => {
    // Make a POST request to submit the answer
    axios.post(`${BASE_URL}/message/create-solutions/`, {
      answer: answer,
      quest: questionId,
      user: user_id,
    })
      .then(response => {
        // Update the solutions state with the new answer

        setNewAnswer("");
        fetchQuestions();
        toast.success('solution submited successfully')
       
       
      })
      
      .catch(error => {
        console.error('Error submitting solution:', error);
        toast.error('Error submitting solution')
      });
  };


  const handleDeleteQuestion = (questionId) => {
    axios.delete(`${BASE_URL}/message/${questionId}/question-delete/`)
      .then(response => {
        if (response.status === 204) {

          fetchQuestions();
          toast.success('Question deleted successfully')
        }
      })
      .catch(error => {
        console.error('Error deleting question:', error);
        toast.error('Error deleting question')
      });
  };


  const handleDeleteSolution = (solutionId) => {
    axios.delete(`${BASE_URL}/message/solution-delete/${solutionId}`)
      .then(response => {
        if (response.status === 204) {

          fetchQuestions();
 
        }
        fetchQuestions();
        toast.success('Solution deleted successfully')
      })
      .catch(error => {

        console.error('Error deleting solution:', error);
        toast.error('Error deleting Solution')

      });
  };

  

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSolutions([]); 
    }
  };



  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Explore Questions and Answers</h2>
        <AddQuestion fetchQuestions={fetchQuestions} />
        {questions.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px", // You can adjust the height as needed
              color: "red", // Change the color to your desired color
            }}
          >
            <p>No questions available.</p>
          </div>
        ) : (
        <div className="grid gap-6">
          {questions.map(question => (
            <div key={question.id} className="bg-white shadow rounded p-6">
              <div className="flex items-center mb-4">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={question.user.pic}
                  alt={`${question.user.username}'s profile`}
                />
                <p className="text-sm text-gray-500">{question.user.username}</p>
              </div>
              <p className="text-lg font-semibold mb-4">
                <FontAwesomeIcon icon={faQuestion} className="mr-2 text-blue-500" />
                {question.question}
              </p>
              {question.user.id === user_id && (
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
              <div className="border-t mt-4 pt-4">
                <h3 className="text-md font-semibold mb-2">Answers:</h3>
                <ul className="space-y-2">
                  {solutions
                    .filter(solution => solution.quest === question.id)
                    .map(solution => (
                      <li key={solution.id} className="pl-4 py-2 border-l">
                        <div className="flex items-center">
                          <img
                            className="w-8 h-8 rounded-full mr-2"
                            src={solution.user.pic}

                          />
                          <p className="text-sm text-gray-500">{solution.user.username}</p>
                          {solution.user.id === user_id && (
                            <button
                              onClick={() => handleDeleteSolution(solution.id)}
                              className="text-red-500 hover:text-red-600 focus:outline-none"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3 m-3" />
                            </button>
                          )}
                          
                        </div>
                        {solution.answer}
                       
                      </li>
                    ))}
                </ul>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();

                  handleSubmitSolution(question.id);

                }}
                className="mt-4"
              >
                <textarea
                  name="answer"
                  className="w-full border rounded p-2 resize-none"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={e => setNewAnswer(e.target.value)}
                ></textarea>
                <button
                  type="submit"

                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Submit Answer
                </button>
              </form>
            </div>
          ))}
        </div>
        )}
        <div className="flex justify-center mt-6">
          {/* <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
            disabled={currentPage === totalPages}
          >
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Solution;
