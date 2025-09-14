import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardShop from "./components/CardShop";
import AquaWindow from "./components/AquaWindow";
import "./index.css";

// import { enableDebugTool } from "@webspatial/react-sdk";
// enableDebugTool();

function App() {
  const isAVP = import.meta.env.XR_ENV === "avp";

  return (
    <Router basename={__XR_ENV_BASE__}>
      <div className="min-h-screen w-full">
        {isAVP ? (
          // Spatial version - no window chrome
          <CardShop />
        ) : (
          // Desktop version - with Aqua window
          <AquaWindow title="WARLOK TCG - Card Shop">
            <CardShop />
          </AquaWindow>
        )}
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/card/:id" element={<div>Card Detail View (TODO)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
