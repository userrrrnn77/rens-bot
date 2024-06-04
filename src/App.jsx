import React, { useState } from "react";
import "./App.css";
import { reqToGroqAi } from "./utils/groq";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // Mencegah form dari submit secara default
    setIsLoading(true); // Mulai loading
    const content = document.getElementById('content').value;
    try {
      const ai = await reqToGroqAi(content);
      setData(ai);
      // Membersihkan input setelah submit
      document.getElementById('content').value = '';
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Berhenti loading setelah 2 detik
      }, 2000);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Mencegah baris baru ketika menekan Enter
      handleSubmit();
    }
  };

  return (
    <main className="flex flex-col min-h-[80vh]">
      <h1 className="text-4xl text-indigo-500 font-bold">RENS BOT | AI</h1>
      <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="py-2 px-4 text-md rounded-md"
          placeholder="Ketik disini"
          id="content"
          onKeyDown={handleKeyDown}
        />
        <button
          className={`bg-indigo-500 py-2 px-4 font-bold text-white rounded-md hover:bg-indigo-700 ${isLoading ? 'animate-pulse' : ''}`}
          onClick={handleSubmit}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Kirim'}
        </button>
        {isLoading && <div className="loading-overlay">Loading...</div>}
        <div>
          {data ? (
            <SyntaxHighlighter language="swift" style={dracula} wrapLongLines={true}>
              {data}
            </SyntaxHighlighter>
          ) : null}
        </div>
      </form>
    </main>
  );
};

export default App;