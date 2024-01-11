document.addEventListener('DOMContentLoaded', function() {
    const checkResultLink = document.querySelector('.checkresult');
  
    checkResultLink.addEventListener('click', function(event) {
      event.preventDefault();
      calculateSums();
    });
  
    function calculateSums() {
        const selects = document.querySelectorAll('select[name="points"]');
        const categorySums = {
          Affiliative: 0,
          Coaching: 0,
          Directive: 0,
          Pacesetting: 0,
          Visionary: 0,
          Participative: 0,
        };
      
        selects.forEach((select) => {
          const category = select.parentElement.classList[1];
          const value = parseInt(select.value);
          if (!isNaN(value)) {
            categorySums[category] += value;
          }
        });
      localStorage.setItem('categorySums', JSON.stringify(categorySums));
      window.location.href = 'result.html'; // Redirect to the new page
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    generateCharts();
  });
  
  function generateCharts() {
    const storedCategorySums = JSON.parse(localStorage.getItem('categorySums'));
    console.log('variable',storedCategorySums)
    if (storedCategorySums) {
        const categoryNames = Object.keys(storedCategorySums);
        const categoryValues = Object.values(storedCategorySums);
        const totalSum = categoryValues.reduce((sum, value) => sum + value, 0);
        const percentages = categoryValues.map(value => ((value / totalSum) * 100).toFixed(2));
    
        const pieCtx = document.getElementById('pieChart');
        const pieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: categoryNames,
            datasets: [{
              data: percentages,
              backgroundColor: [
                'tomato', 'cornflowerblue', 'gold', 'orchid', 'green',"#77BFE2"
              ]
            }]
          },
          options: {
            title: {
              display: true,
              text: "Percentage of Leadship Styles"
            },
            responsive: true
          }
      });


      const barCtx = document.getElementById('barChart');
      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: categoryNames,
          datasets: [{
            label: 'Category Values',
            data: categoryValues,
            backgroundColor: [
                'tomato', 'cornflowerblue', 'gold', 'orchid', 'green',"#77BFE2"
            ]
          }]
        },
        options: {
          title: {
            display: true,
            text: "Total Score Per Leadership Style"
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          responsive: true
        }
      });
      

        categoryNames.forEach((category, index) => {
            const labelElement = document.getElementById(`${category.toLowerCase()}-value`);
            if (labelElement) {
                labelElement.textContent = categoryValues[index];
            }
        });

        const grandTotalElement = document.getElementById('grand-total');
        if (grandTotalElement) {
            grandTotalElement.textContent = categoryValues.reduce((total, value) => total + value, 0);
        }
    
  
    }
  }
  