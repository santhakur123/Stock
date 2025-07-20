
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import axios from "axios";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
  axios
    .get("http://localhost:3002/api/auth/check-session", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.authenticated) {
        setIsAuthenticated(true);
      } else {
        // 🔁 Redirect to frontend login (port 3000)
        window.location.href = "http://localhost:3000/login";
      }
    })
    .catch(() => {
      window.location.href = "http://localhost:3000/login";
    });
}, []);


  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
}

