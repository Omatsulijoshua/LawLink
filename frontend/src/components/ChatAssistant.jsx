import { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';

export function ChatAssistant({ messages, onSendMessage, onClearChat, isGenerating, onSuggestionClick, currentUser, onStartOnboarding }) {
  const [input, setInput] = useState('');
  const [thinkingText, setThinkingText] = useState('Searching legal database...');
  const chatContainerRef = useRef(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = currentUser ? currentUser.name.split(' ')[0] : 'Advocate';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* Scrollable messages container */}
      <div className="chat-container" ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className="welcome-screen">
            <div className="welcome-logo" style={{ marginBottom: '12px' }}>
              <img src="/lawlink_logo.png" alt="LawLink Logo" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'contain' }} />
            </div>
            
            <h1 className="welcome-title">
              {getGreeting()}, <span>{userName}</span>
            </h1>
            <p style={{ color: 'var(--gold-primary)', fontWeight: '600', fontSize: '1.05rem', marginTop: '4px', marginBottom: '6px' }}>
              "The right lawyer. Right when you need one."
            </p>
            <p className="welcome-desc" style={{ maxWidth: '640px' }}>
              LawLink connects you with verified Nigerian lawyers and provides instant AI legal intake & statutory intelligence.
            </p>

            {/* Main Intake CTA Button */}
            <div style={{ margin: '16px 0 20px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={onStartOnboarding}
                style={{
                  backgroundColor: 'var(--blue-primary)',
                  borderColor: 'var(--blue-accent)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '30px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🚀 What legal help do you need? (Start Intake)</span>
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '24px', maxWidth: '680px' }}>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onSuggestionClick("Find a verified lawyer for my case in Lagos/Nigeria")}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                🔍 Find a Lawyer
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onSuggestionClick("I need emergency legal help for police arrest or urgent detention")}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#fca5a5', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                🚨 Emergency Legal Help
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onSuggestionClick("Show my active legal cases and updates")}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                📂 My Cases
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onSuggestionClick("Book a lawyer consultation appointment")}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                📅 Appointments
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onSuggestionClick("Open client-lawyer messaging workspace")}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                💬 Messages
              </button>
            </div>

            <div className="suggestion-grid">
              {suggestions.map((s, idx) => (
                <button 
                  key={idx} 
                  className="suggestion-card"
                  onClick={() => onSuggestionClick(s.query)}
                >
                  <div className="suggestion-headline">{s.headline}</div>
                  <div className="suggestion-body">{s.body}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.role}`}>
              <div className={`avatar ${msg.role}`}>
                {msg.role === 'user' ? (currentUser ? currentUser.avatar : 'U') : 'LL'}
              </div>
              <div className="message-content">
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {/* Simplistic renderer for bolding, bullet points and blockquotes */}
                  {msg.content.split('\n').map((line, lIdx) => {
                    if (line.startsWith('> ')) {
                      return <blockquote key={lIdx}>{line.replace('> ', '')}</blockquote>;
                    }
                    if (line.startsWith('• ')) {
                      return <li key={lIdx} style={{ marginLeft: '16px' }}>{line.replace('• ', '')}</li>;
                    }
                    
                    // Simple inline bold formatting **text**
                    const parts = line.split('**');
                    if (parts.length > 1) {
                      return (
                        <p key={lIdx} style={{ margin: '6px 0' }}>
                          {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} style={{ color: 'var(--gold-primary)' }}>{part}</strong> : part)}
                        </p>
                      );
                    }

                    return <p key={lIdx} style={{ margin: '6px 0' }}>{line}</p>;
                  })}
                </div>
              </div>
            </div>
          ))
        )}

        {isGenerating && (
          <div className="message-bubble assistant">
            <div className="avatar assistant">LL</div>
            <div className="message-content" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '10px' }}>{thinkingText}</span>
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div />
      </div>

      {/* Input panel at bottom */}
      <div className="input-panel">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="input-wrapper">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your legal issue or ask a question..."
              disabled={isGenerating}
            />
            <div className="action-buttons">
              {messages.length > 0 && (
                <button
                  type="button"
                  className="icon-btn"
                  onClick={onClearChat}
                  title="Clear conversation"
                  disabled={isGenerating}
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button
                type="submit"
                className="icon-btn send-btn"
                disabled={input.trim() === '' || isGenerating}
                title="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </form>
        <div style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          marginTop: '10px',
          lineHeight: '1.4'
        }}>
          Disclaimer: LawLink AI provides general legal information and intake classification. It does not constitute formal legal representation.
        </div>
      </div>
    </div>
  );
}
