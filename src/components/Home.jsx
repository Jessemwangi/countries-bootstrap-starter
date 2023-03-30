import React from 'react';
import HomeDirection from './HomeDirection';


const Home = () => {
  return (

    <div>
      
      <div>
        <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>
      </div>
      <HomeDirection/>

                
    </div>

  );
};

export default Home;
