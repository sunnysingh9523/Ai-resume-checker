import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [atsScore, setAtsScore] = useState(50);
  const [skills, setSkills] = useState('');
  const [strength, setStrength] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [sections, setSections] = useState('');
  const [skillsScore, setSkillsScore] = useState(0);
const [projectsScore, setProjectsScore] = useState(0);
const [educationScore, setEducationScore] = useState(0);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const analyzeResume = async () => {

    if (!selectedFile) {
      alert('Please select a resume first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {

      const response = await axios.post(
        'http://localhost:8081/resume/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setResumeText(response.data.resumeText);
      setAtsScore(response.data.score);
      setSkills(response.data.skills);
      setSections(response.data.sections);
      setSkillsScore(response.data.skillsScore);
      setProjectsScore(response.data.projectsScore);
      setEducationScore(response.data.educationScore);
      if(response.data.score >= 90){

  setStrength("🟢 Excellent Resume");
}
else if(response.data.score >= 75){
  setStrength("🔵 Good Resume");
}
else if(response.data.score >= 60){
  setStrength("🟡 Average Resume");
}
else{
  setStrength("🔴 Needs Improvement");
}

if(response.data.score >= 90){
  setSuggestion(
    "Excellent resume. ATS friendly and well structured."
  );
}
else if(response.data.score >= 75){
  setSuggestion(
    "Good resume. Add certifications and achievements."
  );
}
else if(response.data.score >= 60){
  setSuggestion(
    "Add more projects and technical skills."
  );
}
else{
  setSuggestion(
    "Resume needs improvement. Add projects, skills and experience."
  );
}
    } catch (error) {

      console.error(error);

      if (error.response) {
        alert("Server Error: " + error.response.status);
      } else if (error.request) {
        alert("No response from backend");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="app">

      <div className="hero">

        <h1>AI Resume Checker</h1>
        <p>Analyze your resume and improve ATS score with AI</p>

        <div className="upload-card">

          <h2>Upload Resume</h2>

          <div className="drop-zone">
            <p>📄 Drag & Drop Resume Here</p>
            <span>or Click to Upload</span>

            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
            />
          </div>

          {fileName && (
            <div className="preview-card">
              <h3>📄 {fileName}</h3>
              <p>✅ Ready For Analysis</p>
            </div>
          )}

          <button onClick={analyzeResume}>
            Analyze Resume
          </button>

        </div>

        <div className="score-card">
          <h3>ATS Score</h3>
          <div className="suggestions">

  <h2>Skills Detected</h2>

  <div className="suggestion-card">
    <pre>{skills}</pre>
  </div>

</div>

<div className="suggestions">

  <h2>Resume Sections</h2>

  <div className="suggestion-card">
    <pre>{sections}</pre>
  </div>

</div>

<div className="suggestions">

  <h2>Score Breakdown</h2>

  <div className="suggestion-card">
    Skills Score : {skillsScore}%
  </div>

  <div className="suggestion-card">
    Projects Score : {projectsScore}%
  </div>

  <div className="suggestion-card">
    Education Score : {educationScore}%
  </div>

</div>

          <div className="score-ring">
            <div className="score-inner">
              {atsScore}%
            </div>
          </div>
        </div>

        <h3 style={{marginTop:"15px"}}>
  {strength}
</h3>

        {resumeText && (
          <div className="preview-card">
            <h2>Extracted Resume Text</h2>
            <p>{resumeText.substring(0, 1000)}</p>
          </div>
        )}

        <div className="stats">

          <div className="stat-card">
            <h2>12+</h2>
            <p>Checks Performed</p>
          </div>

          <div className="stat-card">
            <h2>95%</h2>
            <p>ATS Accuracy</p>
          </div>

          <div className="stat-card">
            <h2>AI</h2>
            <p>Powered Analysis</p>
          </div>

        </div>

        <div className="suggestions">

  <h2>AI Suggestions</h2>

  <div className="suggestion-card">
    {suggestion}
  </div>

</div>

        <div className="history">

          <h2>Resume History</h2>

          <div className="history-card">
            Java Developer Resume - ATS Score 85%
          </div>

          <div className="history-card">
            Spring Boot Resume - ATS Score 78%
          </div>

          <div className="history-card">
            Full Stack Resume - ATS Score 91%
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;