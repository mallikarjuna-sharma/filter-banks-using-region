import React,{useState,useEffect} from 'react';
import {Paper,Grid,Typography} from '@material-ui/core';
import SelectCity from './SelectCity.js'
import SelectCategory from './SelectCategory.js'
import SearchTable from './SearchTable.js'
import BankTable from './BankTable.js'
import getBanksForCity from './services.js'





function PaperComponent(props){

    const [tableData,setTableData ] = useState([]);
    const [selectedCity,setSelectedCity ] = useState('MUMBAI');
    const [selectedCategory,setSelectedCategory ] = useState("Bank");
    const [searchString,setSearchString ] = useState('');
    const [filteredData,setFilteredData ] = useState([]);
    const [ resetField, setResetField ] = useState(false);
    const [ showLoader, setShowLoader ] = useState(false);



    useEffect(()=>  {
        getBanksForCity(selectedCity).then(res =>  setTableData( res.data) )
    } ,[])

    useEffect(()=>  {
        setShowLoader(true)
        getBanksForCity(selectedCity).then(res =>  {setTableData( res.data);setShowLoader(false)} );
        setFilteredData([])
        setSelectedCategory("Bank")
        setSearchString("")
        setResetField(true)
    } ,[selectedCity])

    useEffect(()=>  {
        setFilteredData([])
        setSearchString("")
        setResetField(true)
    } ,[selectedCategory])


    const getKeys = () => {
        switch(selectedCategory){
            case "Bank": return "bank_name";
            case "IFSC": return "ifsc";
            case "Branch": return "branch";
            case "Bank ID": return "bank_id";
            case "Address": return "address";
            default : return "";
        }
    } 

    useEffect(()=>  {
        
       console.log(searchString,'searchString')
       console.log(selectedCity,'selectedCity')
       console.log(selectedCategory,'selectedCategory')

       if(searchString && tableData){

        const keys = getKeys();

        const filteredData = tableData.filter(values => {
            return (values[keys].toString().toUpperCase().indexOf(searchString.toString().toUpperCase()) > -1 )
        })

        console.log(filteredData,'filteredData')

        setFilteredData(filteredData)

       }
       else{
        setFilteredData([])
       }


    } ,[searchString])


    

    return (
      <Grid item lg={12} md={12} style={{ width:"100%",height:"100%"}}>
        <Paper style={{ width: "100%",padding:"1%" }}>
          <Grid container style={{ width: "100%",margin:"1%" }}>
            <Grid item md={4} lg={4}>
              <Typography variant="h4">
                  Banks
                </Typography>
            </Grid>
            <Grid item md={2} lg={2}>
              <SelectCity setSelectedCity={e => setSelectedCity(e.toUpperCase()) }/>
            </Grid>
            <Grid item md={2} lg={2}>
              <SelectCategory setSelectedCategory={e => setSelectedCategory(e)} />
            </Grid>
            <Grid item md={4} lg={4}>
              <SearchTable 
              mode={props.mode}
              showLoader ={showLoader}
              selectedCategory={selectedCategory} 
              setSearchString={e => setSearchString(e) } 
              setResetField={e => setResetField(e)} 
              resetField={resetField}/>
            </Grid>
          </Grid>
  

          <Grid item md={12} lg={12}>
              <BankTable rows={(filteredData && filteredData.length) ? filteredData :  tableData}  mode={props.mode}/>
            </Grid>


        </Paper>
      </Grid>
    );

}


export default PaperComponent;