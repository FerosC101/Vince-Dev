import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Recognition from "./pages/Recognition.jsx";
import Log from "./pages/Log.jsx";
import Graveyard from "./pages/Graveyard.jsx";
import Project from "./pages/Project.jsx";
import WorkIndex from "./pages/WorkIndex.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="recognition" element={<Recognition />} />
          <Route path="log" element={<Log />} />
          <Route path="graveyard" element={<Graveyard />} />
          <Route path="work" element={<WorkIndex />} />
          <Route path="work/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
