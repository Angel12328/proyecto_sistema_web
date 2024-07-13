/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

let ids = ['img1', 'img2', 'img3', 'img4','img5','img6','img7','img8','img9','img10','img11','img12','img13'];
for (let i = 0; i < ids.length; i++) {
    const image = document.getElementById(ids[i]);
    (function(image){
        image.addEventListener('mousemove', (event) => {
            const boundingRect = image.getBoundingClientRect();
            const mouseX = event.clientX - boundingRect.left;
            const mouseY = event.clientY - boundingRect.top;
            
            const imageWidth = image.offsetWidth;
            const imageHeight = image.offsetHeight;

            const percentX = mouseX / imageWidth;
            const percentY = mouseY / imageHeight;

            // Calcula el factor de oscurecimiento basado en la distancia del mouse al centro de la imagen
            const distanceToCenter = Math.sqrt((percentX - 0.5) ** 2 + (percentY - 0.5) ** 2);
            const darkenAmount = distanceToCenter * 2; // Ajusta este valor para cambiar la intensidad del oscurecimiento

            // Aplica el efecto de oscurecimiento
            image.style.filter = `brightness(${1 - darkenAmount})`;
        });

        // Restaura la imagen a su brillo original cuando el mouse se aleja de ella
        image.addEventListener('mouseleave', () => {
            image.style.filter = 'brightness(1)';
        });
    })(image);
}

