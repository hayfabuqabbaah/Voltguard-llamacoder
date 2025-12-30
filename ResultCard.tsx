import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { PredictionResult } from '../App';

interface ResultCardProps {
  result: PredictionResult;
  values: number[];
  isLoading?: boolean;
}

export function ResultCard({ result, values, isLoading = false }: ResultCardProps) {
  const chartData = values.map((value, index) => ({
    index: index,
    value: parseFloat(value.toFixed(3)),
  }));

  const isNormal = result.class === 'إشارة سليمة';
  const confidenceColor = result.confidence >= 80 ? '#10b981' : 
                         result.confidence >= 60 ? '#f59e0b' : '#ef4444';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div 
          className="rounded-lg p-2 text-xs"
          style={{
            backgroundColor: '#0a2a4f',
            border: '1px solid rgba(240, 165, 0, 0.3)'
          }}
        >
          <p style={{ color: '#ffffff' }}>نقطة: {payload[0].payload.index + 1}</p>
          <p style={{ color: '#f0a500' }}>القيمة: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Prediction Result Card */}
      <div 
        className="rounded-2xl p-6"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">نتائج التحليل</h3>
          <div className="flex items-center gap-2">
            {isNormal ? (
              <CheckCircle className="w-6 h-6" style={{ color: '#10b981' }} />
            ) : (
              <AlertTriangle className="w-6 h-6" style={{ color: '#f59e0b' }} />
            )}
            <span 
              className="text-sm font-medium"
              style={{ color: isNormal ? '#10b981' : '#f59e0b' }}
            >
              {isNormal ? 'طبيعي' : 'يحتاج انتباه'}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1" style={{ color: '#94a3b8' }}>فئة جودة الطاقة</p>
            <p className="text-2xl font-bold" style={{ color: '#f0a500' }}>{result.class}</p>
          </div>
          
          <div>
            <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>مستوى الثقة</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-full h-3 overflow-hidden relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div 
                  className="h-full transition-all duration-1000 relative"
                  style={{
                    width: `${result.confidence}%`,
                    background: result.confidence >= 80 ? 
                      'linear-gradient(to right, #10b981, #34d399)' :
                      result.confidence >= 60 ? 
                      'linear-gradient(to right, #f59e0b, #fbbf24)' :
                      'linear-gradient(to right, #ef4444, #f87171)'
                  }}
                ></div>
              </div>
              <span 
                className="text-lg font-semibold min-w-[60px] text-right"
                style={{ color: confidenceColor }}
              >
                {result.confidence.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="text-center">
              <p className="text-xs" style={{ color: '#94a3b8' }}>الحد الأقصى</p>
              <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>{Math.max(...values).toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs" style={{ color: '#94a3b8' }}>الحد الأدنى</p>
              <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>{Math.min(...values).toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs" style={{ color: '#94a3b8' }}>المتوسط</p>
              <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>
                {(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waveform Chart */}
      <div 
        className="rounded-2xl p-6"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: '#f0a500' }} />
            مخطط الموجة الكهربائية
          </h3>
          <span className="text-xs" style={{ color: '#94a3b8' }}>128 نقطة</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f0a500"
                strokeWidth={2}
                dot={false}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}