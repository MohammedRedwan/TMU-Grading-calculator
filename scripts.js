document.getElementById('gradeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const courseName = document.getElementById('courseName').value;
  const grade = parseFloat(document.getElementById('grade').value);
  
  if (grade < 0 || grade > 100) {
      alert('Please enter a valid grade between 0 and 100.');
      return;
  }

  // Store data in localStorage
  const grades = JSON.parse(localStorage.getItem('grades')) || [];
  grades.push({ courseName, grade });
  localStorage.setItem('grades', JSON.stringify(grades));
  
  displayResults();
  calculateAverage();
});

function displayResults() {
  const grades = JSON.parse(localStorage.getItem('grades')) || [];
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = grades.map(g => `<p>Course: ${g.courseName} - Grade: ${g.grade}%</p>`).join('');
}

function calculateAverage() {
  const grades = JSON.parse(localStorage.getItem('grades')) || [];
  if (grades.length === 0) {
      document.getElementById('average').innerHTML = '';
      return;
  }

  const total = grades.reduce((sum, g) => sum + g.grade, 0);
  const average = total / grades.length;

  document.getElementById('average').innerHTML = `<p>Average Grade: ${average.toFixed(2)}%</p>`;
}

// Display results on page load
window.onload = function() {
  displayResults();
  calculateAverage();
};
