 // Get all the scroll links
 const scrollLinks = document.querySelectorAll('.scroll-link');

 // Add click event listeners to scroll smoothly to the target section
 scrollLinks.forEach(link => {
   link.addEventListener('click', (e) => {
     e.preventDefault();
     const targetId = link.getAttribute('href').substring(1);
     const targetSection = document.getElementById(targetId);

     if (targetSection) {
       targetSection.scrollIntoView({ behavior: 'smooth' });
     }
   });
 });



const myCarouselElement = document.querySelector('#carouselExampleDark')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})


function downloadCV() {
  // Replace 'your_cv.pdf' with the actual filename and extension of your CV.
  var cvFilename = 'Eric Reyes-CV.docx';
  
  // Create an anchor element to trigger the download.
  var downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', cvFilename);
  downloadLink.setAttribute('download', cvFilename);

  // Simulate a click on the anchor element to initiate the download.
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}