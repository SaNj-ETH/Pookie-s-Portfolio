import React from 'react';
import { motion } from 'framer-motion';

export function NavBar({ onSectionChange, activeSection }) {
    const sections = ['Home', 'About', 'Experience', 'Skills', 'Projects'];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000
            }}
        >
            <div style={{
                display: 'flex',
                gap: '10px',
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(15px)',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => onSectionChange(section.toLowerCase())}
                        style={{
                            background: activeSection === section.toLowerCase() ? 'rgba(0, 255, 204, 0.1)' : 'transparent',
                            border: 'none',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            color: activeSection === section.toLowerCase() ? '#00ffcc' : '#ffffff',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {section}
                        {activeSection === section.toLowerCase() && (
                            <motion.div
                                layoutId="active-glow"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '30px',
                                    boxShadow: '0 0 20px rgba(0, 255, 204, 0.3)',
                                    zIndex: -1
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
