import React from 'react';
import { Activity, Shuffle } from 'lucide-react';

interface PredictButtonProps {
  onAnalyze: () => void;
  onGenerateSample: () => void;
  isLoading: boolean;
  hasData: boolean;
}

export function PredictButton({ onAnalyze, onGenerateSample, isLoading, hasData }: PredictButtonProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onAnalyze}
        disabled={isLoading || !hasData}
        className="flex-1 px-6 py-3 font-bold rounded-xl transition-all transform flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        style={{
          backgroundColor: '#f0a500',
          color: '#0a2a4f'
        }}
        onMouseEnter={(e) => {
          if (!isLoading && hasData) {
            e.currentTarget.style.backgroundColor = '#d49400';
            e.currentTarget.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f0a500';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isLoading ? (
          <>
            <div 
              className="w-5 h-5 rounded-full animate-spin"
              style={{
                border: '2px solid #0a2a4f',
                borderTopColor: 'transparent'
              }}
            />
            جاري التحليل...
          </>
        ) : (
          <>
            <Activity className="w-5 h-5" />
            تحليل شكل الموجة
          </>
        )}
      </button>
      
      <button
        onClick={onGenerateSample}
        disabled={isLoading}
        className="px-6 py-3 font-medium rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff'
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <Shuffle className="w-5 h-5" />
        عينة عشوائية
      </button>
    </div>
  );
}