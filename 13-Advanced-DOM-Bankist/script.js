'use strict ';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////

//Selecting,creating and deleting elements
//console.log(document.documentElement);
//console.log(document.body);
//console.log(document.head);
const firstSection = document.querySelector('.section');
const allSections = document.querySelectorAll('.section');
//console.log(firstSection, allSections);
document.getElementById('section--1');
const allButtons = document.querySelectorAll('.btn'); //NodeList
const allButtonsDynamic = document.getElementsByTagName('button'); //HTMLCollection
const allButtonsByClass = document.getElementsByClassName('btn'); //HTMLCollection
//console.log(allButtons, allButtonsByClass);
const header = document.querySelector('.header');
const message = document.createElement('button'); //dom object
message.classList.add('cookie-message'); //css
message.innerHTML =
  'We use cookie to improve our functionality<button class="btn btn--close-cookie">Got it!</button>'; //
header.prepend(message); //add to header as first child. It shows message element in browser!
header.append(message); //add to header as last child.
message.classList.add('hidden');
const openAccountButton = document.querySelector('.nav__link--btn');
//header.append(openAccountButton);//append method can be used to relocate elements.
header.before(message); //add message before header
header.after(message);
const cookieCloseButton = document.querySelector('.btn--close-cookie');
cookieCloseButton.addEventListener('click', function () {
  message.remove();
});

//Styles
/*
message.classList.remove('hidden');
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.width);
console.log(message.style.height);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'; //add 40px to curent height
document.documentElement.style.setProperty('--color-primary', 'orangered'); //change the color-primary property in root(css)
document.documentElement.style.setProperty('--color-primary', '#5ec576');
document.documentElement.style.setProperty(
  'background',
  getComputedStyle(document.querySelector('body')).backgroundColor
);
*/

//Attributes
/*
const logo = document.querySelector('.nav__logo');
console.log(logo.src, logo.getAttribute('src'));
console.log(logo.designer, logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo);
const link = document.querySelector('.twitter-link');
console.log(link.href);
const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href, link2.getAttribute('href'));
console.log(logo.dataset.versionNumber);
*/

//Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
/*
btnScrollTo.addEventListener('click', function (e) {
  const section1Coord = section1.getBoundingClientRect(); //coordinates of section--1
  const btnCoord = e.target.getBoundingClientRect(); //coordinates of element which have event(scroll button)
  console.log(section1Coord);
  console.log(btnCoord);
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset); //difference of distance from head of page to current scrolling location
  console.log(
    'width/height',
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  ); //current height and width of page.
  //window.scrollTo(section1Coord.left, section1Coord.top); //scroll the page with distance from head of page to top of section1Coord(section1Coord top-head of page) and left of page to section1Coord left
  //Solution1:
  /*
  window.scrollTo(
    section1Coord.left + window.pageXOffset,
    section1Coord.top + window.pageYOffset
  );*/
//Better solution:
/*window.scrollTo({
    left: section1Coord.left + window.pageXOffset,
    top: section1Coord.top + window.pageYOffset,
    behavior: 'smooth',
  }); //behaviour:"smooth"=>scroll page slowly
  //Best solution
*/
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Types of events and EventHandlers
/*
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('Event is working');
  setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000); //remove event in 5 seconds after first mouseEnter to h1
};
h1.addEventListener('mouseenter', alertH1);
*/

//Capturing/bubbling
/*
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('nav__link is working', e.target, e.currentTarget); //e.target=>show where first event happened e.currentTarget=>show where current event happening
}); //since this is the child of other two. It inherits them and any change in this element effect also other two
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('nav__links is working', e.target, e.currentTarget);
  //console.log(e.target == this);
}); //parent of nav__link any change effect also its parent
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('nav is working', e.target, e.currentTarget);
}); //parent of nav__links //change color only itself
*/

//Page navigation

//NOT EFFICIENT!!

/*document.querySelectorAll('.nav__link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document
      .querySelector(`#${this.getAttribute('href')}`)
      .scrollIntoView({ behavior: 'smooth' });
  });
});
*/
//BEST SOLUTION
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link'))
    document
      .querySelector(`#${e.target.getAttribute('href')}`)
      .scrollIntoView({ behavior: 'smooth' });
});

//DOM Traversing
/*
const h1 = document.querySelector('h1');
//Childs
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //All staff inside the h1
console.log(h1.children); //only html elements inside h1
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);
//Parents
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header'));
//Siblings
console.log(h1.previousElementSibling, h1.nextElementSibling);
console.log(h1.parentElement.children); //All siblings of h1
[...h1.parentElement.children].forEach(function (el) {
  if (el != h1) el.style.transform = 'scale(0.5)';
});
*/

//Tabbed Component

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    if (!e.target.closest('.operations__tab')) return;
    const tab = e.target.closest('.operations__tab');
    document
      .querySelectorAll('.operations__tab')
      .forEach(el => el.classList.remove('operations__tab--active')); //deleting

    tab.classList.add('operations__tab--active'); //adding

    document
      .querySelectorAll('.operations__content')
      .forEach(el => el.classList.remove('operations__content--active')); //deleting

    document
      .querySelector(`.operations__content--${tab.getAttribute('data-tab')}`)
      .classList.add('operations__content--active'); //adding
  });

//Passing Argument to event handler
const changeOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', changeOpacity.bind(0.5));
nav.addEventListener('mouseout', changeOpacity.bind(1.0));

//Sticky Navigation
/*
window.addEventListener('scroll', function () {
  if (this.window.scrollY > section1.getBoundingClientRect().top)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
//Intersection observer API

new IntersectionObserver(
  function (entries) {
    //callBack start
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  }, //callBack end
  {
    //options start
    root: null, //root:null=>check intersection between header and window Ex: root:section2=>check intersection between header and section2
    threshold: 0, //the intersection ratio that trigger callBack(when there are no intersection between window and header)
    rootMargin: String(-1 * nav.getBoundingClientRect().height) + 'px', //rootMargin:"-90p"
  } //options end
).observe(header); //which element will be observed

//Revealing elements on scroll
const observer = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return; //if we are out of entry section
    entry.target.classList.remove('section--hidden'); //entry.target=>which section observer is dealing
    observer.unobserve(entry.target); //once an section will be observed, not execute observer for this section
  },
  {
    root: null,
    threshold: 0.15,
  }
);

document.querySelectorAll('.section').forEach(function (section) {
  observer.observe(section);
  //section.classList.add('section--hidden');
});

//Lazy Loading Images
const imageObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    imageObserver.unobserve(observer);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  }
);
document.querySelectorAll('.features__img').forEach(function (image) {
  imageObserver.observe(image);
});

//Slider Component-1
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

//change the location of slidess
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

let currSlideIndex = 0;
const maxSlides = slides.length; //3
//scroll slides to right
const nexSlide = function () {
  if (currSlideIndex != maxSlides - 1) currSlideIndex++;
  else currSlideIndex = 0;
  goToSlide(currSlideIndex);
  activeDots(currSlideIndex);
};
//when press right button,
btnRight.addEventListener('click', nexSlide);

//scroll slides to left
const previousSlide = function () {
  if (currSlideIndex == 0) currSlideIndex = maxSlides - 1;
  else currSlideIndex--;
  goToSlide(currSlideIndex);
  activeDots(currSlideIndex);
};
//when press left button
btnLeft.addEventListener('click', previousSlide);

//Slides Component-2
document.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowRight' || e.key == 'ArrowLeft')
    e.key == 'ArrowRight' ? nexSlide() : previousSlide();
});

//DOTS
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activeDots = function (currentDotIndex) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${currentDotIndex}"]`)
    .classList.add('dots__dot--active');
  console.log();
};
dotContainer.addEventListener('click', function (e) {
  //const previousDotIndex = currSlideIndex;
  if (e.target.classList.contains('dots__dot')) {
    //if one of 3 dots be clicked
    const currentDotIndex = Number(e.target.getAttribute('data-slide'));
    goToSlide(currentDotIndex);
    activeDots(currentDotIndex);
  }
});
const defaultSlides = function () {
  goToSlide(0);
  createDots();
  activeDots(0);
};
defaultSlides();

//LifeCycle DOM Events
/*
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
*/
