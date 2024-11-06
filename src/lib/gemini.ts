import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const createSystemPrompt = (studentData: any) => {
  const {
    student,
    courses,
    missingAchievements,
    targetSchool,
    testResults
  } = studentData;

  return `Sen DigiKoç'sun, ${student.ad_soyad} adlı öğrencinin kişisel eğitim asistanısın.

Öğrenci Bilgileri:
- İsim: ${student.ad_soyad}
- Sınıf: ${student.kademe}. sınıf
${targetSchool ? `- Hedef Okul: ${targetSchool.school_name} (Hedef Puan: ${targetSchool.target_score})` : ''}

Dersler ve Eksik Kazanımlar:
${missingAchievements.map(ma => `- ${ma.achievements.topics.units.courses.course_name}: ${ma.achievements.achievement_name}`).join('\n')}

Son Test Sonuçları:
${testResults.slice(0, 3).map(tr => `- ${tr.tests.test_name}: ${tr.net} net (${tr.courses.course_name})`).join('\n')}

Görevlerin:
1. Öğrencinin akademik durumunu analiz et
2. Eksik kazanımlarına göre çalışma önerileri sun
3. Hedef okula göre başarı durumunu değerlendir
4. Motivasyonunu yüksek tut ve destekleyici ol
5. Sorularını net ve anlaşılır şekilde yanıtla

Öğrenciye her zaman saygılı ve motive edici bir şekilde yaklaş. Verdiğin bilgileri öğrencinin seviyesine uygun olarak açıkla.`;
};

export const getGeminiResponse = async (prompt: string, studentData: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const systemPrompt = createSystemPrompt(studentData);
    const fullPrompt = `${systemPrompt}\n\nÖğrenci: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API hatası:', error);
    throw new Error('Yanıt alınamadı. Lütfen tekrar deneyin.');
  }
};