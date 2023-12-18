import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useClientFetchData from '../../../hook/useClientFetchData'
import AnwserCard from '../../../components/answer/AnwserCard'
import style from "./answer.module.css"

const AnswerView = () => {
    // récupération du token en paramètre
    const {token} = useParams()
    // récupération des réponses
    const answers = useClientFetchData(`/client/answers/${token}`, null)
    const survey = useClientFetchData(`/client/surveys/survey/${token}`, null)

    useEffect(() => {
        // fetch des données
        answers.fetch(`/client/answers/${token}`)
        survey.fetch(`/client/surveys/survey/${token}`)
        return () => {
            answers.abortController?.abort();
            survey.abortController?.abort();
        };
    }, [])
    return (
        <div className="px-3">
            <div className="d-flex justify-content-center pt-4">
                <div className={`mb-5 ${style.answerCtnr}`}>
                {(answers.errors?.response?.data || survey.errors?.response?.data ) && 
                    <div className={`card p-4 ${style.noAnswerCard}`}>
                        <p className={"text-center lead"}>Nous n'avons pas pu récupérer vos réponses.</p>
                        <p className={"text-center lead"}>Merci de retourner à <Link to={"/"}>l'accueil</Link> ou de nous contacter !</p>
                    </div>  
                }
                {(survey.isLoading || answers.isLoading) && <p>Chargment en cours</p>}
                {
                    (survey.data?.data && answers.data?.data) && 
                    <div>
                        <div className={`card p-4 ${style.header}`}>
                            <h1 className="text-white">{survey.data.data.title}</h1>
                            <p className={`text-white ${style.description}`}>Merci d'avoir répondu au sondage <br/> Voici vos réponses</p>
                        </div>
                        <div>
                            {
                                answers.data.data.map((answer) => (
                                    <AnwserCard key={answer.id} answer={answer} />
                                ))
                            }
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default AnswerView