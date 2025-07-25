import { useState, useRef, useEffect } from "react";
import './Guali.css';
import { useNavigate } from "react-router-dom";

function Guali() {
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
      const response = await fetch(
        "https://api.ai21.com/studio/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AI21_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "jamba-mini",
            messages: [
                { role: "system", content: "Eres un asistente educativo." },
                ...chat,
                { role: "user", content: input }
            ],
            max_tokens: 500, 
            temperature: 0.7,
            top_p: 1.0
            }),
        }
      );

      const data = await response.json();
      // console.log("Respuesta de la api de la IA:",data);
      const aiReply = data.choices?.[0]?.message?.content || "No hay respuesta";
      setChat((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Error al conectar con el modelo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll automático al final del chat
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat, loading]);

   const goToClassBridge = () => {
    navigate(`/`);
  }


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

export default Guali;