import axios from "axios";

//Get video API
export const getAnimation = (stringToTraslate) => {
    return axios.get('https://ok0e1neori.execute-api.us-east-1.amazonaws.com/test/test-lambda-child?files=' + stringToTraslate)
}

export const speechTotext = (uri) => {
    
    const formData = new FormData();
    formData.append('audio_file', {
        uri: uri,
        name: 'audio.m4a',
        type: 'audio/m4a',
    });

    
    return axios.post('http://127.0.0.1:50100/speech-to-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })

    
}