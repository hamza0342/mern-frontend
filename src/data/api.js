import axios from 'axios'

const apiURL ='http://localhost:8080/'

export const singleFileUpload = async (data,progress) => {
    try{
        await axios.post(apiURL+ 'singleFile', data, progress)
    }catch(error){
        throw error
    }
}

export const getSingleFile = async () => {
    try {
        const {data} = await axios.get(apiURL+ `getSingleFile`)
        
        return data
    } catch (error) {
        console.log(error)
    }
}

export const multipleFileUpload = async(data,progress) => {
    try {
        await axios.post(apiURL+ 'multipleFiles', data,progress)
        console.log("done")
    } catch (error) {
        console.log(error)
    }
}

export const getMultipleFiles = async () => {
    try {
        const {data} = await axios.get(apiURL+ `getMultipleFiles`)
        return data
    } catch (error) {
        console.log(error)
    }
}