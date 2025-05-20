import { useState, useRef, useEffect } from "react";
import './Guali.css';
import { useNavigate } from "react-router-dom";

function GualiFace() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = [...chat, userMessage];
      const prompt = history
        .map((msg) => `${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.content}`)
        .join("\n") + "\nAsistente:";

      const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-2b-it", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            return_full_text: false
          }
        }),
      });

      const data = await response.json();
      console.log("Respuesta del modelo de Hugging Face:", data);

      const aiReply = data?.[0]?.generated_text?.replace(prompt, "").trim() || "No hay respuesta.";
      setChat((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("Error al conectar con Hugging Face:", error);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Error al conectar con el modelo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const goToClassBridge = () => {
    navigate(`/`);
  };

  return (
    <div className="guali-container">
      <div className="guali-chatBox" ref={chatBoxRef}>
        {chat.length === 0 ? (
          <div className="guali-logo-placeholder">
            <div onClick={goToClassBridge} className="menu-header">
              <img id='nav-logo' src="/assets/images/logos/logo.png" alt="Logo" />
              <h2 id="nav-text-header">class-bridge</h2>
            </div>
          </div>
        ) : (
          <>
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`guali-message ${msg.role === "user" ? "guali-user" : "guali-assistant"}`}
              >
                <strong>{msg.role === "user" ? "Tú" : "guali"}:</strong> {msg.content}
              </div>
            ))}
            {loading && (
              <div className="guali-typing">
                Pensando...
              </div>
            )}
          </>
        )}
      </div>

      <div className="guali-inputBar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Haz tu pregunta..."
          className="guali-input"
          disabled={loading}
        />
        <button onClick={sendMessage} className="guali-button" disabled={loading || !input.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default GualiFace;
