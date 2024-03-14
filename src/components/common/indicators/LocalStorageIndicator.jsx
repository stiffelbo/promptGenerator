import React, { useState, useEffect } from 'react';

const LocalStorageIndicator = () => {
    const [storageUsed, setStorageUsed] = useState(0);

    useEffect(() => {
        const calculateStorageUsed = () => {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    try {
                        // Assuming all values are stored as strings
                        const value = localStorage.getItem(key);
                        total += key.length + value.length;
                    } catch (e) {
                        console.error('Error calculating storage size for key:', key, e);
                    }
                }
            }
            // Assuming 5MB limit, as localStorage is typically limited to 5MB
            const maxStorage = 5 * 1024 * 1024; // 5MB in bytes
            const usedPercentage = total ? (total / maxStorage) * 100 : 0; // Avoid division by zero
            setStorageUsed(usedPercentage);
        };

        calculateStorageUsed();
        // Optional: Update storage usage every 10 seconds or on specific events
        const interval = setInterval(calculateStorageUsed, 10000);

        return () => clearInterval(interval);
    }, []);

    const getBackgroundColor = () => {
        if (storageUsed < 50) return 'bg-green-200';
        if (storageUsed < 80) return 'bg-amber-200';
        if (storageUsed < 98) return 'bg-orange-200';
        return 'bg-orange-200 animate-pulse';
    };

    return (
        <div className={`rounded-lg text-center p-1 ${getBackgroundColor()}`}>
            <p className="text-sm text-zinc-300">{storageUsed.toFixed(2)}%</p>
        </div>
    );
};

export default LocalStorageIndicator;
