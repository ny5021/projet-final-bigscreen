import React from 'react'
import style from "./answer.module.css"
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";

const AnwserCard = ({answer}) => {
    let result = ""
    if(answer.question.question_type == 'A'){
        result = <>
            {answer.question.propositions.map((option) => (
                (option.proposition == answer.value)? <p key={option.id} className={style.answer}><IoMdRadioButtonOn /> {option.proposition}</p> : <p key={option.id} className={style.answer}><IoMdRadioButtonOff /> {option.proposition}</p>
            ))}
        </>
    }else{
        result = <p className={style.answer}>{answer.value}</p>
    }
    return (
        <div className="card p-4 position-relative">
            <div>
                <p className={`text-white ${style.questionNum} p-2`}>Question {answer.question.question_number}</p>
                <p className="mt-5 mb-4 h3">{answer.question.question_body}</p>
            </div>
            <div className="ps-4">
                {result}
            </div>
        </div>
    )
}

export default AnwserCard