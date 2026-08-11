import { useState, useRef, useEffect } from 'react';
import { X, Send, Video, Phone, Mic, MicOff, VideoOff, PhoneOff, Paperclip, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function ClientLawyerWorkspaceModal({ appointment, lawyer, onClose }) {
  const counselName = appointment?.lawyerName || lawyer?.name || 'Barrister Counsel';
  const counselTitle = appointment?.lawyerTitle || lawyer?.title || 'Legal Practitioner';

  const [activeTab, setActiveTab] = useState('chat');
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: `Encrypted Legal Workspace session initialized with ${counselName}. All communications are covered under Attorney-Client Privilege.`,
      timestamp: 'Just now'
    },
    {
      id: 2,
      sender: 'counsel',
      text: `Good day. I am ${counselName}. I have reviewed your legal matter intake notes. How may I best assist you today?`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call timer
  useEffect(() => {
    let timer;
    if (isVideoActive || isAudioActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isVideoActive, isAudioActive]);

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'client',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Counsel simulated response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'counsel',
          text: `Understood. Regarding this aspect, under Nigerian law, we can prepare an urgent affidavit or legal notice to safeguard your legal standing.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="admin-page-container" style={{ backgroundColor: 'rgba(5, 8, 15, 0.95)' }}>
      <div className="admin-page-content" style={{ maxWidth: '1000px', width: '94vw', height: '88vh', display: 'flex', flexDirection: 'column' }}>
        {/* Workspace Topbar Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--blue-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
              ⚖️
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: '600' }}>{counselName}</h3>
                <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1px 6px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: '600' }}>
                  🟢 Attorney Online
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>{counselTitle} • Attorney-Client Privilege Encrypted</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setIsAudioActive(true);
                setIsVideoActive(false);
              }}
              style={{ backgroundColor: isAudioActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent', color: isAudioActive ? '#60a5fa' : 'var(--text-secondary)' }}
            >
              <Phone size={16} />
              <span>Audio Call</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setIsVideoActive(true);
                setIsAudioActive(false);
              }}
              style={{ backgroundColor: isVideoActive ? 'rgba(59, 130, 246, 0.2)' : 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', fontWeight: '600' }}
            >
              <Video size={16} />
              <span>Start Video Session</span>
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close workspace">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* WORKSPACE BODY */}
        <div style={{ display: 'flex', flex: 1, gap: '16px', overflow: 'hidden' }}>
          {/* VIDEO / AUDIO OVERLAY MODE */}
          {(isVideoActive || isAudioActive) ? (
            <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '12px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
              {/* Duration Counter */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '20px', color: '#fff', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                <span>REC • {formatDuration(callDuration)}</span>
              </div>

              {isVideoActive ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--blue-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 16px', border: '3px solid var(--gold-primary)' }}>
                    ⚖️
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>{counselName} (Video Call Active)</h4>
                  <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>WebRTC HD Encrypted Stream Active</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Phone size={48} style={{ color: 'var(--gold-primary)', marginBottom: '16px' }} />
                  <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>Voice Consultation with {counselName}</h4>
                  <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>Secure Audio Channel Active</p>
                </div>
              )}

              {/* Call Control Bar */}
              <div style={{ position: 'absolute', bottom: '24px', display: 'flex', gap: '16px', backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: '12px 24px', borderRadius: '30px', border: '1px solid var(--border-light)' }}>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: isMuted ? '#ef4444' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                {isVideoActive && (
                  <button
                    type="button"
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: isVideoMuted ? '#ef4444' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isVideoMuted ? <VideoOff size={20} /> : <Video size={20} />}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsVideoActive(false);
                    setIsAudioActive(false);
                  }}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <PhoneOff size={20} />
                </button>
              </div>
            </div>
          ) : (
            /* CHAT MESSAGING WORKSPACE */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(17, 24, 39, 0.5)', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.sender === 'client' ? 'flex-end' : m.sender === 'system' ? 'center' : 'flex-start',
                      maxWidth: m.sender === 'system' ? '90%' : '75%',
                      backgroundColor: m.sender === 'client' ? 'var(--blue-primary)' : m.sender === 'system' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: m.sender === 'system' ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid var(--border-light)',
                      color: m.sender === 'system' ? 'var(--gold-primary)' : '#fff',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      lineHeight: '1.45'
                    }}
                  >
                    <div>{m.text}</div>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'block', textAlign: 'right', marginTop: '4px' }}>{m.timestamp}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type confidential message to counsel..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ flex: 1, borderRadius: '8px', height: '40px', padding: '0 14px', fontSize: '0.86rem' }}
                />
                <button type="submit" className="btn-secondary" style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', padding: '0 16px', fontWeight: '600' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
