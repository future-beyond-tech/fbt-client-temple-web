import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import TempleDonation from "./temple-donation/TempleDonation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TempleDonation />
    <Analytics />
  </React.StrictMode>
);
