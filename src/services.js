import axios from 'axios';


async function getBanksForCity(cityName){

    // let cityName = 'MUMBAI'

     let result =  await axios.get('https://vast-shore-74260.herokuapp.com/banks?city='+cityName)

     return result;
}

export default getBanksForCity;