import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { PredictionResult } from '../App';

interface ResultCardProps {
  result: PredictionResult;
  values: number[];
}

export function ResultCard({ result, values }: ResultCardProps) {
  const chartData = values.map((value, index) => ({
    index: index,
    value: value,
  }));

  const isNormal = result.class.toLowerCase() === 'normal';

  return (
    <div className="space-y-6">
      {/* Prediction Result Card */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">نتائج التحليل</h3>
          {isNormal ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">فئة جودة الطاقة</p>
            <p className="text-2xl font-bold text-[#f0a500]">{result.class}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">مستوى الثقة</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#f0a500] to-orange-400 transition-all duration-500"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <span className="text-lg font-semibold min-w-[60px] text-right">
                {result.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Waveform Chart */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">مخطط الموجة الكهربائية</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f0a500" 
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}