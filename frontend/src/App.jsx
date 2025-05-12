import React, { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import ImageUploader from "./components/ImageUploader";
import NutrientResult from "./components/NutrientResult";

const MainApp = () => {
  const { user, signIn, signOut } = useContext(AuthContext);
  const [nutrients, setNutrients] = useState(null);

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-xl mb-4">Please Sign In</h1>
        {/* implement your signIn UI here */}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Fruit Nutrient Analysis</h1>
      <ImageUploader onResult={setNutrients} />
      <NutrientResult data={nutrients} />
      <button onClick={signOut} className="mt-6">Sign Out</button>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <h1>Hello World</h1>
    <MainApp />
  </AuthProvider>
);

export default App;
