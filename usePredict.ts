import { useState, useCallback } from 'react';

export function usePredict() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (data: number[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate data
      if (!data || data.length !== 128) {
        throw new Error('البيانات غير صالحة: يجب أن تحتوي على 128 قيمة');
      }

      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'فشل الاتصال بالخدمة');
      }
      
      const result = await response.json();
      
      // Validate response
      if (!result.class || typeof result.confidence !== 'number') {
        throw new Error('استجابة غير صالحة من الخادم');
      }
      
      setResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateTest = useCallback(async (): Promise<number[] | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/generate_test');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'فشل توليد العينة');
      }
      
      const result = await response.json();
      
      // Validate response
      if (!result.raw_data || !Array.isArray(result.raw_data) || result.raw_data.length !== 128) {
        throw new Error('بيانات العينة غير صالحة');
      }
      
      return result.raw_data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل توليد العينة';
      setError(errorMessage);
      console.error('Generate test error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    predict,
    generateTest,
    clearError,
    clearResult,
    isLoading,
    result,
    error,
  };
}