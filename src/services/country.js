import axios from "axios";

const baseUrl ='https://restcountries.com/v3.1/all';

const getAll = async () =>{
    const {data} = await axios.get(baseUrl)
    return data;

}

export default {getAll}