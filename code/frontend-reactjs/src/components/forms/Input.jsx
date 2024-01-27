import { ErrorMessage, Field } from "formik";
import style from "./input.module.css"

const Input = ({type, isEmail, options, name, max}) => {
    // contruction des attributs de l'objet input
    let input = {
        name: name,
        type: null,
    }

    switch (type) {
        case "B": // cas champ de texte
            input.type = isEmail? "email" : "text"
            break;
        case "A": // cas bouton radio
            input.type = "radio"
            break;
        default:
            break;
    }

    let result, optionList = ""

    if (type == 'A') { // cas choix parmi plusieurs (radio)
        result = <div role="group" aria-labelledby="my-radio-group">
            {
                options.map((option, index) => (
                    <div key={index} className="form-check">
                        <label className="form-check-label" style={{color: "black"}}>
                            <Field type={input.type} name={input.name} value={option.proposition} className="form-check-input" />
                            {option.proposition}
                        </label> 
                    </div>))
            }
            <div className={`invalid-feedback ${style.invalidFeedback}`}>
                <ErrorMessage name={input.name} />
            </div>
        </div>
    }
    if(type == 'B'){ // cas champ de texte ou email
        result = <>
            <Field name={input.name} type={input.type} className="form-control form-control-lg"></Field>
            <div className={`invalid-feedback ${style.invalidFeedback}`}>
                <ErrorMessage name={input.name} />
            </div>
        </>
    }
    if(type == 'C'){ // cas choix numérique de 1 à max
        optionList = Array.from({length:max}, (_, x) => x + 1)
        result = <>
            <Field name={input.name} as="select" className="form-select">
                <option value={0}>&nbsp;</option>
                {optionList.map(option => <option value={option} key={option}>{option}</option>)}
            </Field>
            <div className={`invalid-feedback ${style.invalidFeedback}`}>
                <ErrorMessage name={input.name} />
            </div>
        </>
    }
    return result
}

export default Input