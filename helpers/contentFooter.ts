import {URL_BASE} from '../constants'

export const useGetTermsOfUse = async () => {
    const data = await fetch(URL_BASE+`/terms-of-use`)
    return data.json()
}

export const useGetAboutUs = async () => {
    const data = await fetch(URL_BASE+`/about-us`)
    return data.json()
}
export const useUrlSocial = async () => {
    const data = await fetch(URL_BASE+`/url-social`)
    return data.json()
}