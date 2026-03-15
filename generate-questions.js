/**
 * Generates quiz questions from biomarkers.json.
 * Each biomarker gets one question. Options are short answer phrases.
 * Run: node generate-questions.js
 */
const fs = require('fs');

const biomarkers = JSON.parse(fs.readFileSync('biomarkers.json', 'utf8'));

function toShortAnswer(desc, maxLen = 200) {
  // Use first full sentence when possible, otherwise trim to maxLen
  let s = desc.replace(/\s+/g, ' ').trim();
  const period = s.indexOf('.');
  if (period > 0 && period <= maxLen) s = s.slice(0, period + 1);
  else if (s.length > maxLen) s = s.slice(0, maxLen).replace(/\s+\S*$/, '').trim() + '.';
  return s.trim();
}

const questions = [];
const usedWrong = new Set();

for (let i = 0; i < biomarkers.length; i++) {
  const b = biomarkers[i];
  const correctAnswer = toShortAnswer(b.description);
  
  // Pick 3 wrong answers from other biomarkers (spread across the list)
  const wrongSources = [];
  const step = Math.max(1, Math.floor(biomarkers.length / 3));
  for (let j = 0; j < 3; j++) {
    const idx = (i + 1 + j * step) % biomarkers.length;
    if (idx !== i && !wrongSources.includes(idx)) wrongSources.push(idx);
  }
  // Ensure we have 3 distinct
  let k = 0;
  while (wrongSources.length < 3 && k < biomarkers.length) {
    const idx = (i + 1 + k) % biomarkers.length;
    if (idx !== i && !wrongSources.includes(idx)) wrongSources.push(idx);
    k++;
  }
  
  const wrongAnswers = wrongSources.slice(0, 3).map(idx => toShortAnswer(biomarkers[idx].description));
  
  // Avoid duplicate options - if wrong matches correct, replace with another
  const optionsSet = new Set([correctAnswer]);
  const finalWrong = [];
  for (const w of wrongAnswers) {
    let candidate = w;
    let attempts = 0;
    while (optionsSet.has(candidate) && attempts < biomarkers.length) {
      const altIdx = (wrongSources[finalWrong.length] + attempts) % biomarkers.length;
      candidate = toShortAnswer(biomarkers[altIdx].description);
      attempts++;
    }
    if (!optionsSet.has(candidate)) {
      finalWrong.push(candidate);
      optionsSet.add(candidate);
    }
  }
  
  const options = [correctAnswer, ...finalWrong];
  // Shuffle so correct isn't always first
  const correctIndex = 0;
  for (let s = options.length - 1; s > 0; s--) {
    const r = Math.floor(Math.random() * (s + 1));
    [options[s], options[r]] = [options[r], options[s]];
  }
  const answer = options.indexOf(correctAnswer);
  
  questions.push({
    q: `What does ${b.name} measure or describe?`,
    options,
    answer,
    explanation: b.description
  });
}

const js = `// Auto-generated from biomarkers.json - do not edit manually\nconst BIOMARKER_QUESTIONS = ${JSON.stringify(questions, null, 2)};\n`;
fs.writeFileSync('questions.js', js);
console.log(`Generated ${questions.length} questions → questions.js`);
