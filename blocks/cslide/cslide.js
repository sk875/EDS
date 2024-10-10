import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

const placeholders = await fetchPlaceholders(getMetadata('locale'));
const { btnNxt, btnPre } = placeholders;

export default function decorate(block) {
  console.log('placeholders ---> ', placeholders, btnNxt, btnPre);
  const rows = Array.from(block.children);

  rows.forEach((row, r) => {
    if (r === 0) {
      const nextbtn = document.createElement('button');
      nextbtn.classList.add('btn', 'btn-next');

      const node = document.createTextNode(btnNxt);
      nextbtn.appendChild(node);
      row.replaceWith(nextbtn);
    } else if (r === rows.length - 1) {
      const prebtn = document.createElement('button');
      prebtn.classList.add('btn', 'btn-prev');

      const node = document.createTextNode(btnPre);
      prebtn.appendChild(node);
      row.replaceWith(prebtn);
    } else {
      row.classList.add('slide');

      Array.from(row.children).forEach((col, c) => {
        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  const slides = document.querySelectorAll('.slide');

  // Loop through slides and set each slide's translateX
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  // Select next slide button
  const nextSlide = document.querySelector('.btn-next');

  // Current slide counter
  let curSlide = 0;

  // Maximum number of slides
  const maxSlide = slides.length - 1;

  // Add event listener and navigation functionality for the next button
  nextSlide.addEventListener('click', () => {
    curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;

    // Move slides by -100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // Select previous slide button
  const prevSlide = document.querySelector('.btn-prev');

  // Add event listener and navigation functionality for the previous button
  prevSlide.addEventListener('click', () => {
    curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;

    // Move slides by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}