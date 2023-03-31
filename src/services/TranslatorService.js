import axios from "axios";

export const getAnimation = (stringToTraslate) => {
    return axios.get('https://ok0e1neori.execute-api.us-east-1.amazonaws.com/test/test-lambda-child?files=' + stringToTraslate)
}