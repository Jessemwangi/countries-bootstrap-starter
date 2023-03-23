import axios from "axios";

const baseUrl ='https://restcountries.com/v3.1/all';

export const getAll = async () =>{
    const {data} = await axios.get(baseUrl)
    return data;

}