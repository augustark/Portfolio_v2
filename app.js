const { children } = document.querySelector('.slides')
const controls = document.querySelectorAll('.btn')

controls.forEach((button) => {
  let active = 0

  button.addEventListener('click', function() {
    if (this.classList.contains('prev')) {
      active > 0 ? active -= 1 : active = children.length - 1
      setSlides(active)
    } else {
      active < 4 ? active += 1 : active = 0
      setSlides(active)
    }
  })
})

function setSlides(active) {
  let prev = active > 0 ? active - 1 : 4
  let next = active < 4 ? active + 1 : 0

  Array.from(children).forEach((child) => {
    child.classList.remove('active')
    child.classList.remove('prev')
    child.classList.remove('next')
  })

  children[active].classList.add('active')
  children[prev].classList.add('prev')
  children[next].classList.add('next')
}

// Array.from(children).forEach((child) => {
//   child.addEventListener('mouseover', function() {
    
//   })
// })

const links = document.querySelector('.links')
const linksHash = document.querySelectorAll('a[name]')
const app = document.querySelector('.app')
const main = document.querySelector('main')

const myObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    if (entry.contentRect.width > 800) {
      Array.from(links.children).forEach((child) => {
        child.removeAttribute('href')
        child.addEventListener('click', viewPage)
      })
    } else {
      Array.from(links.children).forEach((child) => {
        child.setAttribute('href', `#${child.text.toLowerCase()}`)
        child.removeEventListener('click', viewPage)
        main.style.transform = 'translateX(0%)'
      })
    }
  });
});

myObserver.observe(app)

function viewPage() {  
  switch(this.text.toLowerCase()) {
    case 'contact': {
      main.style.transform = `translateX(-${(100/3)*2}%)`
      return 
    } 
    case 'projects': {
      main.style.transform = `translateX(-${100/3}%)`
      return 
    } 
    default: {
      main.style.transform = 'translateX(0%)'    
    }
  }
}

let oldValue = 0
let newValue = 0

window.addEventListener('scroll', hideNav);

function hideNav() {

  newValue = window.pageYOffset;

  if (window.innerWidth < 700) {
    if (oldValue < newValue) {
      links.style.opacity = '0'
    } else if (oldValue > newValue) {
      links.style.opacity = '1'
    }
  }

  oldValue = newValue;
}