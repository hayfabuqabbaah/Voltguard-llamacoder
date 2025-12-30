import React, { useState } from 'react';
import { UploadCloud, Check } from 'lucide-react';

interface InputGridProps {
  values: number[];
  onChange: (values: number[]) => void;
  disabled?: boolean;
}

export function InputGrid({ values, onChange, disabled = false }: InputGridProps) {
  const [pasteText, setPasteText] = useState('');
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    const numValue = parseFloat(value) || 0.0;
    newValues[index] = numValue;
    onChange(newValues);
  };

  const handlePaste = () => {
    if (!pasteText.trim()) {
      alert('الرجاء لصق بيانات صالحة');
      return;
    }
    
    // Parse the pasted text
    const numbers = pasteText.match(/-?\d+\.?\d*/g);
    if (!numbers) {
      alert('لم يتم العثور على قيم رقمية صالحة');
      return;
    }
    
    const parsedValues = numbers.map(n => parseFloat(n)).slice(0, 128);
    
    if (parsedValues.length < 128) {
      alert(`تم استخراج ${parsedValues.length} قيمة فقط. سيتم ملء الباقي بقيم 0.0`);
    }
    
    const newValues = Array(128).fill(0.0);
    for (let i = 0; i < parsedValues.length; i++) {
      newValues[i] = parsedValues[i];
    }
    
    onChange(newValues);
    setPasteText('');
    setPasteSuccess(true);
    
    setTimeout(() => setPasteSuccess(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 max-h-96 overflow-y-auto pr-2">
        {values.map((value, index) => (
          <div key={index} className="relative group">
            <input
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              disabled={disabled}
              className="w-full h-8 text-xs text-center rounded transition-all font-mono disabled:opacity-50"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: value !== 0 ? '#ffffff' : '#94a3b8',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f0a500';
                e.target.style.boxShadow = '0 0 0 3px rgba(240, 165, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="0.0"
            />
            <span 
              className="absolute -top-6 left-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ color: '#64748b' }}
            >
              Col{index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Paste Area */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm" style={{ color: '#94a3b8' }}>
          <UploadCloud className="w-4 h-4" />
          لصق البيانات (CSV, مسافات, أو أسطر جديدة)
        </label>
        <div className="relative">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="لصق 128 قيمة هنا..."
            disabled={disabled}
            className="w-full h-24 p-3 rounded-lg font-mono text-sm resize-none disabled:opacity-50"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#f0a500';
              e.target.style.boxShadow = '0 0 0 3px rgba(240, 165, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {pasteSuccess && (
            <div className="absolute top-2 right-2" style={{ color: '#10b981' }}>
              <Check className="w-5 h-5" />
            </div>
          )}
        </div>
        <button
          onClick={handlePaste}
          disabled={disabled || !pasteText.trim()}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'rgba(240, 165, 0, 0.2)',
            border: '1px solid rgba(240, 165, 0, 0.5)',
            color: '#f0a500'
          }}
        >
          {pasteSuccess ? <Check className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
          تحليل ولصق البيانات
        </button>
      </div>
    </div>
  );
}