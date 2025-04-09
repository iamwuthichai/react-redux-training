import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { IndexPage as ActorIndexPage } from "./modules/ModuleActor/pages/IndexPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actors" element={<ActorIndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
