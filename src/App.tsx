import { Route, Routes } from "react-router-dom";
import Inicio from "./Inicio";
import Dashboard from "./Dashboard";



function App() {

  return (
    <Routes>
      <Route path="/" element={<Inicio></Inicio>} />
      <Route path="/dashboard" element={<Dashboard></Dashboard>} />
    </Routes>
  );  
}

export default App;
