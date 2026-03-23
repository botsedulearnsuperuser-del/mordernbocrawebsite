import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';


const ConsumerRights: React.FC = () => {
    const [activeRight, setActiveRight] = useState(0);

    const rights = [
        { title: 'The Right to Information', desc: 'Consumers have the right to be provided with clear, accurate, and timely information about the services they are subscribing to, including pricing, terms of service, and any potential hidden costs.' },
        { title: 'The Right to Choice', desc: 'Every consumer should have access to a variety of services and products at competitive prices, and the right to switch between service providers without unreasonable penalties.' },
        { title: 'The Right to Redress', desc: 'If a communication service falls short of agreed standards, consumers have the right to file formal complaints and receive fair settlement, including compensation or repair where applicable.' },
        { title: 'The Right to Protection', desc: 'Consumers should be protected from deceptive or unfair marketing practices, and their personal data must be handled securely according to national regulations.' },
        { title: 'The Right to be Heard', desc: 'BOCRA ensures that consumer interests are represented in policy-making and regulatory decisions affecting the communications sector.' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
                {/* Rights List */}
                <div className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #eee' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 2rem', color: '#1a1a1a' }}>Your BOCRA Consumer Rights</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {rights.map((right, index) => (
                            <div 
                                key={index} 
                                onClick={() => setActiveRight(index)}
                                style={{ 
                                    padding: '1.5rem', 
                                    background: activeRight === index ? '#FDF2F2' : '#f9f9f9', 
                                    border: `1px solid ${activeRight === index ? '#FFE4E4' : '#eee'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    borderRadius: 0,
                                    borderLeft: activeRight === index ? '4px solid #A80000' : '1px solid #eee'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: activeRight === index ? '#A80000' : '#333' }}>{right.title}</h3>
                                    <ChevronRight size={18} color={activeRight === index ? '#A80000' : '#ccc'} />
                                </div>
                                {activeRight === index && (
                                    <p style={{ margin: '1rem 0 0', fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>
                                        {right.desc}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel Resources */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem', background: '#A80000', color: 'white' }}>
                        <h3 style={{ margin: 0 }}>Consumer Complaints Procedure</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '1.5rem', lineHeight: '1.6' }}>
                            Always try to resolve issues with your service provider first. If you are not satisfied with their response within <b>14 days</b>, escalateto BOCRA.
                        </p>
                        <button style={{ 
                            background: 'white', 
                            color: '#A80000', 
                            border: 'none', 
                            padding: '12px 20px', 
                            marginTop: '1.5rem', 
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderRadius: 0
                        }}>
                           View Filing Steps
                        </button>
                    </div>

                    <div className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #eee' }}>
                         <h3 style={{ borderBottom: '2px solid #A80000', paddingBottom: '10px', display: 'inline-block' }}>Need Legal Guidance?</h3>
                         <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                             <div style={{ display: 'flex', gap: '15px' }}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ color: '#A80000' }}>
                                    <rect width="24" height="24" fill="none"/>
                                    <path fill="currentColor" d="M14.82 4c-.41-1.16-1.51-2-2.82-2s-2.4.84-2.82 2H2v2h2.56l-2.49 6.65c-.04.11-.06.23-.06.35c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.12-.02-.24-.06-.35L7.46 6H9.2c.3.85.97 1.51 1.82 1.82V20H2v2h20v-2h-9V7.82c.85-.3 1.51-.97 1.82-1.82h1.74l-2.49 6.65c-.04.11-.06.23-.06.35c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.12-.02-.24-.06-.35L19.46 6h2.56V4h-7.18ZM4.07 13L6 7.85L7.93 13zm12 0L18 7.85L19.93 13zM12 6c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"/>
                                 </svg>
                                 <div>
                                     <h4 style={{ margin: 0 }}>Communications Act</h4>
                                     <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#666' }}>Download the legislative document.</p>
                                 </div>
                             </div>
                             <div style={{ display: 'flex', gap: '15px' }}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ color: '#A80000' }}>
                                    <rect width="24" height="24" fill="none"/>
                                    <path fill="currentColor" fillRule="evenodd" d="M1 2.333v17.411l10 3V9.251l2-.6v14.093l10-3V2.334l-1.735-1.157L12 3.956l-9.265-2.78zm18 4.523l-4 1.2v2.088l4-1.2z" clipRule="evenodd"/>
                                 </svg>
                                 <div>
                                     <h4 style={{ margin: 0 }}>Cyber Resilience Guide</h4>
                                     <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#666' }}>Consumer-friendly data security manual.</p>
                                 </div>
                             </div>
                         </div>

                    </div>

                     <div className="card" style={{ padding: '2rem', background: '#f9f9f9', border: '1px solid #eee' }}>
                         <h3 style={{ margin: '0 0 1rem' }}>Contact Consumer Affairs</h3>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" style={{ color: '#A80000' }}>
                                    <rect width="20" height="20" fill="none"/>
                                    <path fill="currentColor" d="M17.256 12.253c-.096-.667-.611-1.187-1.274-1.342c-2.577-.604-3.223-2.088-3.332-3.734C12.193 7.092 11.38 7 10 7s-2.193.092-2.65.177c-.109 1.646-.755 3.13-3.332 3.734c-.663.156-1.178.675-1.274 1.342l-.497 3.442C2.072 16.907 2.962 18 4.2 18h11.6c1.237 0 2.128-1.093 1.953-2.305zM10 15.492c-1.395 0-2.526-1.12-2.526-2.5s1.131-2.5 2.526-2.5s2.526 1.12 2.526 2.5s-1.132 2.5-2.526 2.5M19.95 6c-.024-1.5-3.842-3.999-9.95-4C3.891 2.001.073 4.5.05 6s.021 3.452 2.535 3.127c2.941-.381 2.76-1.408 2.76-2.876C5.345 5.227 7.737 4.98 10 4.98s4.654.247 4.655 1.271c0 1.468-.181 2.495 2.76 2.876C19.928 9.452 19.973 7.5 19.95 6"/>
                                 </svg>
                                 211 / +267 368 5500
                             </div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ color: '#A80000' }}>
                                    <rect width="24" height="24" fill="none"/>
                                    <path fill="currentColor" d="M5 17V3h18v14zm-4 4V6.5h2V19h16.5v2zm13-8.725l7-4.85V5l-7 4.85L7 5v2.425z"/>
                                 </svg>
                                 consumer@bocra.org.bw
                             </div>
                         </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConsumerRights;
