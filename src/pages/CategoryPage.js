import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Collapse, Select } from 'antd';
const { Panel } = Collapse;

const Product = styled.div`
    width: 300px;
    text-align: center;
    padding: 15px;
    background-color: rgb(255, 255, 255);
    color: black;
`;

const Price = styled.div`
   color: red;
   font-weight: bold;
`;

const Stars = styled.div`
   color: #e1c100;
   font-weight: bold;
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;
    justify-content: space-between;

`;

const collapseStyle = {
    margin: 'auto',
    border: 'none',
    backgroundColor: 'transparent',
  };

const showStars = (value) => {
    const filledStars = Math.round(value / 20);
    const emptyStars = 5 - filledStars;
    let stars = '';
    for (let i = 0; i < filledStars; i++) {
      stars += '★';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    return stars;
  }


const CategoryPage = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [gender, setGender] = useState([]);

    const BaseUrl = '/products?category_ids[]=2416'; 
    const FilteredUrl = '/products?category_ids[]=2416&gender_segmentation[]=5308'

    const ApiUrl = gender !== '5308' ? BaseUrl : FilteredUrl

    useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(ApiUrl, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json;',
           }
         });
         const data = await response.json();
         setCategoryData(data);
         setIsFetched(true);
       } catch (error) {
         console.error(error);
       }
     };
     fetchData();
   }, [gender]);



    const onCollapseChange = (key) => {
        console.log(key);
      };


    const handleChange = (value) => {
        setGender(value);
    };
      

const genderOptions = isFetched && categoryData.filters.find(item => item.name === 'Gender segmentation').options
.map(option => {return {label:option.name, value: option.value}}) 

if (!isFetched) return null;
    return (
    <div>
        <Collapse style={collapseStyle} onChange={onCollapseChange}>
            <Panel header="Show Filters">
                <Select 
                style={{
                    width: 150
                }}
                placeholder="Select a gender"
                options={genderOptions}
                onChange={handleChange}/>
            </Panel>
        </Collapse>
        <Wrapper>
        {categoryData.items.map(item => 
        <Product key={item.id}>
            <img src={item.thumbnail} style={{width: '50%'}}/>
            <div>{item.name}</div> 
            <Price>{item.formatted_price}</Price>
            <Stars>{showStars(item.rating_summary)}</Stars> 
            </Product> )}     
        </Wrapper>
    </div>
    )
}

export {CategoryPage}