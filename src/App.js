import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";
import NWA from "./context/NWA";

import "./App.css";

function App() {
  return (
    <NWA>
      <Router>
        <Layout />
      </Router>
    </NWA>
  );
}

export default App;
