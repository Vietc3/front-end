import { URL_BASE } from '../constants'

const URL_BASE_SUBCRIBER = URL_BASE + '/subscriber'

export const useUpdateSubcriber = async (email: string) => {
    if (email === "" || !email) {
        return
    }
    else {
        const data = await fetch(URL_BASE_SUBCRIBER)
        const result = await data.json();
        result.Email.email.push(email)
        const response = await fetch(URL_BASE_SUBCRIBER, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })     
        return response.status
    }
}