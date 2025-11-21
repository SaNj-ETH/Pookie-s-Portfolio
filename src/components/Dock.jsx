import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, FileText, UserPlus } from 'lucide-react';

export function Dock({ data }) {
    const items = [
        { icon: Linkedin, label: 'LinkedIn', href: data.linkedin, color: '#0077b5' },
        { icon: Mail, label: 'Email', href: `mailto:${data.email}`, color: '#ea4335' },
        { icon: UserPlus, label: 'Hire Me', href: `mailto:${data.email}?subject=Hiring Inquiry`, color: '#00ffcc' },
        { icon: FileText, label: 'Resume', href: data.resumeUrl, color: '#ffffff' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '20px',
            padding: '15px 25px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }}>
            {items.map((item, index) => (
                <DockItem key={index} item={item} />
            ))}
        </div>
    );
}

function DockItem({ item }) {
    return (
        <motion.a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -10, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                color: item.color,
                textDecoration: 'none',
                position: 'relative'
            }}
        >
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${item.color}66`,
                boxShadow: `0 0 15px ${item.color}44`
            }}>
                <item.icon size={24} />
            </div>
            <span style={{
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.8)',
                opacity: 0,
                position: 'absolute',
                bottom: '-20px',
                whiteSpace: 'nowrap'
            }} className="dock-label">
                {item.label}
            </span>
            <style>{`
        a:hover .dock-label {
          opacity: 1;
          transition: opacity 0.2s ease;
        }
      `}</style>
        </motion.a>
    );
}
