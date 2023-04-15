import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filters from '../components/Filters';


const Product = styled.div`
    width: 250px;
    height: 300px;
    text-align: center;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    color: black;
    line-height: 2em;
    border-radius: 15px;
    margin: 10px;
    
    &:hover{
      transform: scale(1.1);
      box-shadow: 0px 10px 10px rgb(159 159 159);
    }
`;

const Price = styled.div`
  color: red;
  font-weight: 800;
  font-size: 16px;
`;

const Stars = styled.div`
  color: #e1c100;
  font-weight: bold;
  font-size: 18px;
`;
const Name = styled.div`
  font-weight: 700;
  font-size: 16px;

`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const CategoryPageContainer = styled.div`
  margin: auto 50px;
`;

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
};

const initialFilters = [];

const CategoryPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const url = '/products?category_ids[]=2416';
    const params = { ...filters };
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value.length > 0) {
        searchParams.append(key + '[]', value[0]);
      }
    });

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}&${searchParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;',
          },
        });
        const data = await response.json();
        setCategoryData(data);
        setIsFetched(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filters]);

  const handleFilterChange = (filter, value) => {
    setFilters((filters) => ({
      ...filters,
      [filter]: [value],
    }));
  };


  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const redirectToProduct = (url) => {
    const productUrl = url;
    window.location.href = productUrl;
  }

  if (!isFetched) return null;

  return (
    <CategoryPageContainer>
      <h1>Sports Nutrition</h1>
      <Filters onFilterChange={handleFilterChange} data={categoryData} filters={filters} resetFilters={handleResetFilters} />
      <Wrapper>
        {categoryData.items.map((item) => (
          <Product key={item.id} onClick={() => redirectToProduct(item.product_url)}>
            <img src={item.thumbnail} style={{ width: '55%' }} alt={item.name} />
            <Name>{item.name}</Name>
            <Price>{item.formatted_price}</Price>
            <Stars>{showStars(item.rating_summary)}</Stars>
          </Product>
        ))}
      </Wrapper>
    </CategoryPageContainer>
  );
};

export default CategoryPage;
