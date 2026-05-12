import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import Header from './Header'

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! Ask me anything about Python or web development.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e) => {
    if (e) e.preventDefault()

    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await client.post('/ai/chat', { message: text })

      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: res.data.reply || res.data.answer }
      ])
    } catch (err) {
      const detail =
        err.response?.data?.detail || 'Something went wrong. Please try again.'

      setError(detail)

      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Error: ${detail}` }
      ])
    } finally {
      setLoading(false)
    }
  }

  const resetChat = async () => {
    try {
      await client.delete('/ai/chat/reset')
    } catch {}

    setMessages([
      { role: 'ai', text: 'Conversation reset. What would you like to know?' }
    ])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <Header />

      <main className="sma-main">
        <div className="ai-page">
          <div className="ai-page-header">
            <Link to="/students" className="sma-back-link">
              ← Back to Students
            </Link>

            <h2 className="ai-page-title">AI Study Assistant</h2>

            <p className="ai-page-subtitle">
              Ask any question about Python or full stack development — powered by Google Gemini
            </p>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <h2 className="chat-title">AI Assistant</h2>

              <button className="chat-reset-btn" onClick={resetChat}>
                Reset
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
                  <span className="chat-role">
                    {msg.role === 'user' ? 'You' : 'AI'}
                  </span>

                  <p className="chat-text">{msg.text}</p>
                </div>
              ))}

              {loading && (
                <div className="chat-bubble chat-bubble--ai">
                  <span className="chat-role">AI</span>

                  <p className="chat-text chat-thinking">Thinking...</p>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {error && (
              <div className="sma-alert sma-alert-error">
                {error}
              </div>
            )}

            <div className="chat-input-row">
              <textarea
                className="chat-input"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question... (Enter to send, Shift+Enter for new line)"
                disabled={loading}
                maxLength={1000}
              />

              <button
                className="sma-btn sma-btn-primary chat-send-btn"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                {loading ? 'Thinking...' : 'Send'}
              </button>
            </div>

            <div className="ai-char-count">
              {input.length} / 1000
            </div>
          </div>
        </div>
      </main>
    </>
  )
}