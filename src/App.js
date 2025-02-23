import React, { useState, useEffect } from "react";
import "./App.css"; // Külső CSS fájl
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "DZvNvWjsAqcKFkUYTILjSg==TSLj89uVII6HTNYM"; // Cseréld ki a saját API kulcsodra!

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // API hívás idézet lekérésére
  const fetchQuote = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { "X-Api-Key": API_KEY },
      });
      const data = await response.json();

      if (data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      }
    } catch (error) {
      console.error("An error occured while callin API:", error);
    }
  };

  // Első render után betölt egy idézetet
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container text-center mt-5">
      <div className="card p-4 shadow-lg quote-card">
        <h1 className="mb-4">Quote</h1>
        <blockquote className="blockquote">
          <p className="quote-text">"{quote}"</p>
          <footer className="blockquote-footer author-text">- {author}</footer>
        </blockquote>
        <button className="btn btn-primary mt-3" onClick={fetchQuote}>
          Új idézet
        </button>
      </div>
    </div>
  );
}

export default App;
