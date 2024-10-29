import { useEffect, useState, useContext } from "react";
import Register from "./components/Register";
import Header from "./components/Header";
import { UserContext } from "./context/UserContex";
import Login from "./components/Login";
import Table from "./components/Table";

function App() {
  const [message, setMessage] = useState("");
  const [fetched, setFetched] = useState(false);
  const [token] = useContext(UserContext);  // Use useContext to access the context value

  const getWelcomeMessage = async () => {
    if (fetched) return; // Avoid extra fetch if already fetched
    try {
      const response = await fetch("/api", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      setFetched(true); // Set fetched to true to avoid another request
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);
  
  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Register /> <Login />
            </div>
          ) : (
            <Table />
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
}

export default App;
