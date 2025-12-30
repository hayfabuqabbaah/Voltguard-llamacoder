# VoltGuard - لوحة تحكم جودة الطاقة

نظام متقدم لتحليل وتوقع جودة الطاقة الكهربائية باستخدام الذكاء الاصطناعي.

## 🚀 النشر على Render

### الخطوات:

1. **رفع المشروع إلى GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **إعداد حساب Render**
   - سجل في [Render.com](https://render.com)
   - اربط حساب GitHub الخاص بك

3. **إنشاء Static Site**
   - من لوحة تحكم Render: "New +" → "Static Site"
   - اختر مستودع GitHub
   - اضبط الإعدادات:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
     - **Node Version**: `18` أو أحدث

4. **متغيرات البيئة (Environment Variables)**
   ```
   NODE_ENV=production
   VITE_API_URL=https://your-api-domain.com
   ```

5. **النشر التلقائي**
   - Render سينشر المشروع تلقائياً عند كل push إلى main
   - يمكنك تفعيل/تعطيل النشر التلقائي من إعدادات الخدمة

### 📋 متطلبات النشر

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Build**: Vite + TypeScript
- **Static Files**: تم تحسينها للنشر

### 🔧 الإعدادات المتقدمة

يمكنك تخصيص `render.yaml` للتحكم الكامل في إعدادات النشر:
- Custom domains
- SSL certificates
- Build hooks
- Auto-deploy rules

### 🌐 الوصول إلى التطبيق

بعد النشر، سيكون التطبيق متاحاً على:
`https://your-app-name.onrender.com`

## 🛠️ التطوير المحلي
