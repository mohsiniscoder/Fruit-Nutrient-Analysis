// src/pages/Home.js
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import NutrientResult from '../components/NutrientResult';

const Home = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>Fruit Nutrient Analysis</h1>
      <ImageUploader onResult={setResult} />
      <NutrientResult data={result} />
    </div>
  );
};

export default Home;
