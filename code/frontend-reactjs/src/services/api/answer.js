import { instance } from "../instance";

export async function createAnswers(answers) {
    const response = await instance.post("/client/answers", answers)
    return response.data
}