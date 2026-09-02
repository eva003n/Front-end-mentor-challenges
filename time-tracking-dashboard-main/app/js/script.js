
const requestUrl = '../../data.json';
const request = new Request(requestUrl);

 getTimeData(renderHtml)
function getTimeData(func, period = 'weekly') {
    fetch(request)
    .then((response) => {
        if(!response.ok) {
            throw Error('Failed to fetch!');
           
        }
        return response.json();
    })
    .then((data) => {
        func(data, period)

    })
    .catch((error) => {
        console.log(error.message);

    });
}
document.querySelectorAll(".period").forEach((button) => {
    
    button.addEventListener('click', () => {
        const {period} = button.dataset;
        getTimeData(renderHtml, period);
            
        document.querySelectorAll('.period').forEach((btn) => {
            if(btn.classList.contains('active')) {
                btn.classList.remove('active');
                
            }else {
                document.querySelector(`.js-period-${period}`).classList.add('active');
            }
         


        });

    });
});

function renderHtml(timeData, period) {
    let weekData;
    let time;
    // period = period

    let html = '';
    if(period.slice(0, 4) === 'week' ) {
        time = 'Last week';

    }
    else if(period.slice(0, 5) === 'month' ) {
        time = 'Last month';

    }else {
        time = 'Yesterday'
    }
    
    timeData.forEach((timeDataItem) => {
        if(timeDataItem.timeframes[period]) {
            weekData = timeDataItem.timeframes[period];
            
      
        



        }
        html += `
          <section class="exercise">
        <div class="container">
          <div class="activity flex wrapper">
            <h4>${timeDataItem.title}</h4>
            <button>
              <img src="images/icon-ellipsis.svg" alt="ellipsis icon" />
            </button>
          </div>
          <div class="duration flex wrapper">
            <p class="time">${weekData.current}hrs</p>
            <p>${time} - ${weekData.previous}hrs</p>
          </div>
        </div>
      </section>
        
        `



    })
 document.querySelector('.js-time-analysis').innerHTML =  html;

  
    
}
