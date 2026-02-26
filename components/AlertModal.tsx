import React from 'react';

interface AlertModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    type?: 'error' | 'success' | 'info';
    onClose: () => void;
    confirmText?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    title,
    message,
    type = 'info',
    onClose,
    confirmText = 'OK'
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'error': return <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>;
            case 'success': return <span className="material-symbols-outlined text-green-500 text-5xl mb-4">check_circle</span>;
            default: return <span className="material-symbols-outlined text-primary text-5xl mb-4">info</span>;
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 animate-fadeIn">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-surface-dark border border-white/10 p-8 rounded-[2rem] shadow-2xl w-full max-w-sm flex flex-col items-center text-center animate-slide-up">
                {getIcon()}
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-300 mb-8 leading-relaxed font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-primary text-background-dark font-black text-sm uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
};
