import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Snippet from "./components/Snippet";
import ViewSnippet from "./components/ViewSnippet";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snippets" element={<Snippet />} />
        <Route path="/snippets/:id" element={<ViewSnippet />} />
      </Routes>
    </>
  );
};

export default App;
