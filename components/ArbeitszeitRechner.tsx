'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArbeitszeitRechner = () => {
  const [startTime, setStartTime] = useState('');
  const [showLunchInput, setShowLunchInput] = useState(false);
  const [lunchBreak, setLunchBreak] = useState<number | ''>('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeSubmit = () => {
    if (startTime) {
      setShowLunchInput(true);
    }
  };

  const calculateEndTime = () => {
    if (!startTime || lunchBreak === '') return;

    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);

    // Füge 8 Stunden 30 Minuten + Mittagspause hinzu
    const endDate = new Date(startDate.getTime() + (8 * 60 + 30 + Number(lunchBreak)) * 60000);
    
    // Formatiere die Endzeit
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
    
    setEndTime(`${endHours}:${endMinutes}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Arbeitszeit-Rechner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!showLunchInput ? (
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Wann hast du angefangen? (HH:mm)
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="p-2 border rounded"
                />
              </div>
              <Button
                onClick={handleStartTimeSubmit}
                disabled={!startTime}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
              >
                Weiter
              </Button>
            </>
          ) : (
            <>
              <div className="text-sm mb-4">
                Start um {startTime} Uhr
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Wie viele Minuten Mittagspause machst du?
                </label>
                <input
                  type="number"
                  value={lunchBreak}
                  onChange={(e) => setLunchBreak(Number(e.target.value))}
                  min="0"
                  max="120"
                  className="p-2 border rounded"
                />
              </div>
              <Button
                onClick={calculateEndTime}
                disabled={lunchBreak === ''}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
              >
                Berechnen
              </Button>
            </>
          )}

          {endTime && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Start: {startTime} Uhr | Pause: {lunchBreak} Minuten
              </p>
              <p className="text-xl font-semibold">
                Tagesarbeitszeit (8:30h) erreicht um {endTime} Uhr
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArbeitszeitRechner;
