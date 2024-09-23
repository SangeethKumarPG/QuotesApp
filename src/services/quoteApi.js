import axios from 'axios';

export const fetchQuote = async ()=>{
  try {
    const response = await axios.get("https://dummyjson.com/quotes");
    return response.data;   
  } catch (err) {
    console.log(err);
  }

}
