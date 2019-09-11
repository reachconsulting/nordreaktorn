// ANIMATE ON SCROLL
AOS.init({once: true, disable: 'mobile'});

// Smooooth Scroll
var scroll = new SmoothScroll('a[href*="#"]');

// COUNTDOWN TIMER
const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      countdownDiv = document.querySelector('.countdown');
      
let countDown = new Date(countdownDiv.dataset.date).getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById('days').innerText = Math.floor(distance / (day)),
        document.getElementById('days').innerText = document.getElementById('days').innerText.padStart(2, "0"),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('hours').innerText = document.getElementById('hours').innerText.padStart(2, "0"),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('minutes').innerText = document.getElementById('minutes').innerText.padStart(2, "0"),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second),
        document.getElementById('seconds').innerText = document.getElementById('seconds').innerText.padStart(2, "0");
        
      //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'DU KOM FÖRSENT!;
      //}

    }, second)