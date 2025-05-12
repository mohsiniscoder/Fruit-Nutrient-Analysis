import React from "react";

const NutrientResult = ({ data }) => {
  if (!data) return null;
  return (
    <div className="mt-4">
      <h2 className="font-semibold">Nutrient Breakdown:</h2>
      <ul className="list-disc ml-5">
        {Object.entries(data).map(([nutrient, val]) => (
          <li key={nutrient}>
            {nutrient}: {val}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutrientResult;
