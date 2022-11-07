import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {App} from "../../App";
import {useQuizQuestions} from "../../../services/hooks";

const Quiz = ({data}) => {

  const [questions, setQuestions] = useState({})

  useEffect(() => {
    let obj = {}
    data.forEach(question => {
      obj = {
        ...obj,
        [question.caption]: {
          userAnswers: [],
          correctAnswers: question.options.filter(option => option.is_answer).map(option => option.caption)
        }
      }
    })

    setQuestions(obj)

  }, [])

  const answer = (question, answer) => {
    const previousQuestion = questions[question]
    setQuestions({
      ...questions,
      [question]: {
        ...previousQuestion,
        userAnswers: [answer]
      }
    })

    console.log(questions)
  }

  const isOptionSelected = (question, option) => {
    const questionData = questions[question]

    if (questionData && questionData.userAnswers.includes(option)) {
      return true
    }

    return false
  }

  const verifyAnswers = question => {
    const questionData = questions[question]
    if (!questionData || questionData.userAnswers.length === 0) {
      return {
        selectedAnswers: false
      }
    }

    const incorrectAnswers = []
    for (const userAnswer of questionData.userAnswers) {
      if (!questionData.correctAnswers.includes(userAnswer)) {
        incorrectAnswers.push(userAnswer)
      }
    }

    return {
      selectedAnswers: true,
      incorrectAnswers: incorrectAnswers
    }
  }

  return <div style={{width: '100%'}}>
    <div style={{fontWeight: 'bold'}}>QUIZ!</div>
    <div style={{backgroundColor: '#f8f8f8', width: '100%', borderRadius: '6px 6px 6px 6px'}}>
      <div style={{padding: '10px'}}>
        {data.map(question => {
          const verifiedAnswers = verifyAnswers(question.caption)

          return <div>
          <div style={{fontSize: '22px', fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>
            <img src="https://cdn-icons-png.flaticon.com/128/3341/3341505.png" width={24} height={24} style={{marginRight: '5px'}} />
            {question.caption}
          </div>
          <div>
            {verifiedAnswers.selectedAnswers && verifiedAnswers.incorrectAnswers.length > 0 && <div>
              Wrong! Try again
            </div>}
            {verifiedAnswers.selectedAnswers && verifiedAnswers.incorrectAnswers.length === 0 && <div>
              Well done!
            </div>}
          </div>
          <div style={{listStyleType: 'none', marginLeft: '10px'}}>
            <form>
              {question.options.map(option => <div key={option.caption}>
                <input type="radio"
                       id={option.caption}
                       name={question.caption}
                       onClick={() => answer(question.caption, option.caption)}
                       checked={isOptionSelected(question.caption, option.caption)}
                />
                <span>{option.caption}</span>
                <div>
                  {verifiedAnswers.selectedAnswers && verifiedAnswers.incorrectAnswers.includes(option.caption) && <div>
                    {option.explanation}
                  </div>}
                </div>
              </div>)}
            </form>
          </div>
          <div style={{backgroundColor: '#e8e8e8', height: '1px', width: '100%', margin: '0 auto'}}/>
        </div>})}
      </div>
    </div>

  </div>
}

const sampleData = [
  {
    "caption": "What year did Second World War started?",
    "options": [
      {
        "caption": "It started in any year, but really in 1939",
        "is_answer": false
      },
      {
        "caption": "I'm just testing long options. Let's try something even longer, just to see if it renders correctly",
        "is_answer": false
      },
      {
        "caption": "Wednesday",
        "is_answer": true,
        "explanation" : "kk"
      }
    ]
  },
  {
    "caption": "What day is today?",
    "options": [
      {
        "caption": "Monday",
        "is_answer": false
      },
      {
        "caption": "Tuesday",
        "is_answer": false
      },
      {
        "caption": "Wednesday",
        "is_answer": true,
        "explanation" : "kk"
      }
    ]
  }
]

const selectedContainers = document.querySelectorAll('[data-render-id^="quiz"]');
for (const container of selectedContainers) {

  const fetchData = async () => {
    const type = container.dataset['quizType']
    const questionIdsAsString = container.dataset['quizQuestions'].replace("[", "").replace("]", "")
    const questionIds = Array.from(questionIdsAsString.split(","))

    console.log(type)
    console.log(questionIds)

    const questions = await useQuizQuestions(type, questionIds)
    console.log(questions)
    return {
      data: sampleData
    }
  }

  const root = ReactDOM.createRoot(container);
  root.render(<App component={Quiz} fetchData={fetchData} />)
}
