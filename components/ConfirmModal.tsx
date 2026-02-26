import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 animate-fadeIn">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onCancel} />
            <div className="relative bg-surface-dark border border-white/10 p-8 rounded-[2rem] shadow-2xl w-full max-w-sm flex flex-col items-center text-center animate-slide-up">
                <span className="material-symbols-outlined text-orange-500 text-5xl mb-4">help_center</span>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-300 mb-8 leading-relaxed font-medium">{message}</p>
                <div className="flex gap-4 w-full">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-4 bg-surface-darker text-white font-black text-sm uppercase tracking-widest rounded-2xl active:scale-95 transition-all outline outline-1 outline-white/10"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 bg-primary text-background-dark font-black text-sm uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
