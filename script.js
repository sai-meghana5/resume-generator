document.getElementById('resumeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.toUpperCase();
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const location = document.getElementById('location').value;
  const dob = document.getElementById('dob').value;
  const experience = document.getElementById('experience').value;
  let summary = document.getElementById('summary').value;
  let skills = document.getElementById('skills').value;
  const achievements = document.getElementById('achievements').value;
  const linkedin = document.getElementById('linkedin').value;
  const github = document.getElementById('github').value;
  const portfolio = document.getElementById('portfolio').value;
  const jobDescription = document.getElementById('jobDescription').value.toLowerCase();

  // 📌 Auto-optimize Summary & Skills for ATS
  const keywords = extractKeywords(jobDescription);
  summary += ' Experienced in ' + keywords.join(', ') + '.';
  skills += ', ' + keywords.join(', ');

  const resumeHTML = `
    <div class="resume-content">
      <h2 class="name">${fullName}</h2>
      <p class="summary"><em>${summary}</em></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Date of Birth:</strong> ${dob}</p>
      <p><strong>Experience:</strong> ${experience}</p>
      <p><strong>Skills:</strong> ${skills}</p>
      <p><strong>Achievements:</strong> ${achievements}</p>
      <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
      <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
      <p><strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a></p>
    </div>
  `;

  document.getElementById('outputContent').innerHTML = resumeHTML;
  document.getElementById('resumeOutput').classList.remove('hidden');
});

// ✅ Simple keyword extractor (based on word frequency)
function extractKeywords(text) {
  const stopWords = ["and", "the", "for", "with", "from", "that", "this", "you", "your", "are", "will", "have"];
  const words = text.match(/\b[a-zA-Z]{4,}\b/g) || [];
  const freqMap = {};

  words.forEach(word => {
    if (!stopWords.includes(word)) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }
  });

  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(entry => entry[0]); // top 6 keywords
}
function extractKeywords(text) {
  const stopWords = ["and", "the", "for", "with", "from", "that", "this", "you", "your", "are", "will", "have"];
  const words = text.match(/\b[a-zA-Z]{4,}\b/g) || [];
  const freqMap = {};
  words.forEach(word => {
    const lower = word.toLowerCase();
    if (!stopWords.includes(lower)) {
      freqMap[lower] = (freqMap[lower] || 0) + 1;
    }
  });
  return Object.entries(freqMap).sort((a, b) => b[1] - a[1]).slice(0, 6).map(entry => entry[0]);
}

function customizeSummary() {
  const jd = document.getElementById('jobDesc').value;
  const keywords = extractKeywords(jd);
  const tailoredSummary = `Computer Science student with strong backend and problem-solving skills. Experienced in ${keywords.join(', ')}. Passionate about innovation and customer-focused development.`;
  document.getElementById('summary').innerText = tailoredSummary;
}

function downloadPDF() {
  const element = document.getElementById("resume-content");
  html2pdf().from(element).save("Resume_Mummadi_Sai_Meghana.pdf");
}
