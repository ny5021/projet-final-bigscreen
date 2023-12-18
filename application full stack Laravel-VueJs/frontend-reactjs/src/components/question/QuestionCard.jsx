import Input from "../forms/Input"
import style from "./questionCard.module.css"

const QuestionCard = ({question, total}) => {
    return (
        <div className="card p-4 position-relative">
            <p className={`text-white ${style.questionNum} p-2`}>Question {question.question_number} / {total}</p>
            <p className="mt-5 mb-4 h3">{question.question_body}</p>
            <div className="row">
                <div className="col-md-8 ps-4">
                    <Input type={question.question_type} isEmail={question.is_email} options={question.propositions} 
                    name={"q"+question.id} max={question.max_val}></Input>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard