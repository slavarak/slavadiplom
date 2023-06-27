// slider ------------------------------------------------------------------------------

const slides = document.querySelectorAll('.promo-slider__item')
const sliderBlock = document.querySelector('.promo')

const sliderFunc = () => {
   
    const timeInterval = 3000
    
    let countSlider = 0
    let interval
    
    const prevSlide = (elems, index, strClass) => {
        elems[index].classList.remove(strClass)
    }
    
    const nextSlide = (elems, index, strClass) => {
        elems[index].classList.add(strClass)
    }
    
    const autoSLide = () => {
        prevSlide(slides, countSlider, 'promo-slider__item--active')

        countSlider++

        if(countSlider >= slides.length) {
            countSlider = 0
        }

        nextSlide(slides, countSlider, 'promo-slider__item--active')
    }
    
    const startSlide = (timer = 3000) => {
        interval = setInterval(autoSLide, timer)
    }
    
    const stopSlide = () => {
        clearInterval(interval)
    }

    sliderBlock.addEventListener('click', (e) => {   
        e.preventDefault()
    
        if(!e.target.matches('.promo-slider__button')) {
            return
        }
    
        prevSlide(slides, countSlider, 'promo-slider__item--active')
    
        if (e.target.matches('#arrow-right')) {
            countSlider++
        } else if (e.target.matches('#arrow-left')) {
            countSlider--
        }
    
        if(countSlider >= slides.length) {
            countSlider = 0
        }
        if(countSlider < 0) {
            countSlider = slides.length-1
        }
    
        nextSlide(slides, countSlider, 'promo-slider__item--active')
    })    

    sliderBlock.addEventListener('mouseenter', (e) => {
        if (e.target.matches('.promo-slider__button')) {
        stopSlide()
    }
    }, true)
    sliderBlock.addEventListener('mouseleave', (e) => {
            if (e.target.matches('.promo-slider__button')) {
            startSlide(timeInterval)
        }
    }, true)


    startSlide(timeInterval)
}

sliderFunc()

// end Slider ------------------------------------------------------------------------

// modal

const buttonClose = document.querySelector('.close-img')
const buttonsOpen = document.querySelectorAll('.button-promo')
const modal = document.querySelector('.modal')

const modalOpener = () => {
    buttonsOpen.forEach(buttonOpen => {
        buttonOpen.addEventListener('click', () => {
            modal.classList.add('active')
        })
    });
}

const modalCloser = () => {
    buttonClose.addEventListener('click', () => {
        modal.classList.remove('active')
    })
}

modalOpener()
modalCloser()

// modal

// form validate

const formName = document.querySelectorAll('[name="name"]')

formName.forEach(formName =>
    formName.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^а-яА-Я\^a-zA-Z\s]/g, "") 
}))

// form validate

// timer

document.addEventListener('DOMContentLoaded', function() {
    const deadline = new Date(2023, 9, 2);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
      $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
      $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
      $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
  });