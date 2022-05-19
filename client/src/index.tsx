// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";

// import App from "./App";

// //@ts-ignore
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Routes>
//     <Route path="/" element={<div>fsdfds</div>} />
//   </Routes>
// );

import { createRoot } from "react-dom/client";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
