import React, { useState, useCallback } from 'react';
import { Zap } from 'lucide-react';
import { InputGrid } from './components/InputGrid';
import { PredictButton } from './components/PredictButton';
import { ResultCard } from './components/ResultCard';

export interface PredictionResult {
  class: string;
  confidence: number;
  waveform_img?: string;
}

export default function VoltGuard() {
  const [values, setValues] = useState<number[]>(Array(128).fill(0.0));
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValuesChange = useCallback((newValues: number[]) => {
    setValues(newValues);
  }, []);

  const handleAnalyze = useCallback(async () => {
    const hasValidData = values.some(v => v !== 0);
    if (!hasValidData) {
      setError('يرجى إدخال بيانات صالحة أو توليد عينة عشوائية');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const classes = ['إشارة سليمة', 'توافقية ثالثة', 'توافقية خامسة', 'انخفاض الجهد', 'اضطراب عابر'];
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      const confidence = 60 + Math.random() * 40;
      
      setResult({
        class: randomClass,
        confidence: confidence,
        waveform_img: ''
      });
      setIsLoading(false);
    }, 2000);
  }, [values]);

  const handleGenerateSample = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const sampleData = Array.from({ length: 128 }, () => 
        Math.sin(Math.random() * Math.PI * 2) * 100 + (Math.random() - 0.5) * 20
      );
      setValues(sampleData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a2a4f', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 animate-pulse" style={{ color: '#f0a500' }} />
            <h1 
              className="text-4xl md:text-5xl font-bold"
              style={{
                background: 'linear-gradient(to right, #f0a500, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              VoltGuard
            </h1>
          </div>
          <p style={{ color: '#94a3b8' }} className="text-lg">لوحة تحكم متقدمة لتوقع جودة الطاقة</p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div 
              className="rounded-2xl p-6"
              style={{
                backdropFilter: 'blur(12px)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <h2 
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: '#f0a500' }}
              >
                <span 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#f0a500' }}
                ></span>
                إدخال بيانات الجهد (128 نقطة)
              </h2>
              <InputGrid 
                values={values} 
                onChange={handleValuesChange}
                disabled={isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PredictButton 
                onAnalyze={handleAnalyze} 
                isLoading={isLoading}
                onGenerateSample={handleGenerateSample}
                hasData={values.some(v => v !== 0)}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div 
                className="rounded-xl p-4"
                style={{
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <p className="text-center flex items-center justify-center gap-2" style={{ color: '#f87171' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f87171' }}></span>
                  {error}
                </p>
              </div>
            )}

            {/* Data Status */}
            <div 
              className="rounded-xl p-3"
              style={{
                backdropFilter: 'blur(12px)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <p style={{ color: '#94a3b8' }} className="text-sm">
                الحالة: {values.filter(v => v !== 0).length}/128 قيمة محددة
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result && (
              <ResultCard 
                result={result} 
                values={values}
                isLoading={isLoading}
              />
            )}
            
            {!result && !isLoading && (
              <div 
                className="rounded-2xl p-12 text-center"
                style={{
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(240, 165, 0, 0.1)' }}
                >
                  <Zap className="w-12 h-12" style={{ color: '#f0a500' }} />
                </div>
                <p style={{ color: '#94a3b8' }} className="text-lg mb-2">جاهز للتحليل</p>
                <p style={{ color: '#64748b' }} className="text-sm">أدخل البيانات واضغط على "تحليل شكل الموجة" لعرض النتائج</p>
              </div>
            )}

            {isLoading && (
              <div 
                className="rounded-2xl p-12 text-center"
                style={{
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full animate-spin"
                  style={{
                    border: '4px solid #f0a500',
                    borderTopColor: 'transparent'
                  }}
                ></div>
                <p style={{ color: '#f0a500' }} className="text-lg">جاري تحليل البيانات...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}