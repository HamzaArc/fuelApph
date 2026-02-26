import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface AddLogModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const AddLogModal: React.FC<AddLogModalProps> = ({ onClose, onSuccess }) => {
    const { t } = useLanguage();
    const [stationName, setStationName] = useState('');
    const [cost, setCost] = useState('');
    const [volume, setVolume] = useState('');
    const [odometer, setOdometer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stationName || !cost || !volume || !odometer) return;

        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase.from('log_entries').insert({
                user_id: user.id,
                station_name: stationName,
                cost: parseFloat(cost),
                volume: parseFloat(volume),
                odometer: parseInt(odometer, 10),
                date: new Date().toISOString()
            });

            if (!error) {
                onSuccess();
            } else {
                console.error('Error inserting log:', error);
            }
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-dark w-full max-w-sm rounded-[2rem] p-6 shadow-2xl border border-white/10 animate-fadeIn">
                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest">
                    {t('vehicleLog.newLog')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                            Station Name
                        </label>
                        <input
                            type="text"
                            value={stationName}
                            onChange={e => setStationName(e.target.value)}
                            className="w-full bg-background-dark border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                            placeholder="e.g. Afriquia Route Nationale"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Cost (DH)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                                className="w-full bg-background-dark border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Volume (L)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={volume}
                                onChange={e => setVolume(e.target.value)}
                                className="w-full bg-background-dark border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                            Odometer (km)
                        </label>
                        <input
                            type="number"
                            value={odometer}
                            onChange={e => setOdometer(e.target.value)}
                            className="w-full bg-background-dark border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                            placeholder="125000"
                            required
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-white/5 rounded-2xl font-black text-slate-300 uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 bg-primary text-background-dark rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Log'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
