document.addEventListener('DOMContentLoaded', function() {
  // Selecciona los botones de navegación
  const siguienteBtn = document.getElementById('siguiente-btn');
  const anteriorBtn = document.getElementById('anterior-btn');
  
  // Selecciona todas las oraciones
  const oraciones = document.querySelectorAll('.oracion');
  
  // Variable que almacena el índice de la oración actual (inicializado en 0)
  let currentOracion = 0;

  // Deshabilita el botón "Anterior" al principio (en la primera oración)
  anteriorBtn.disabled = true;
  
  // Actualiza el texto del botón "Siguiente" con el título de la siguiente oración o "Rosario Completo" si no hay más oraciones
  siguienteBtn.textContent = oraciones[currentOracion + 1]?.querySelector('h3').textContent || 'Rosario Completo';

  // Función para actualizar la visualización de la oración actual y el estado de los botones
  function updateOracion() {
      // Activa la oración actual y desactiva las demás
      oraciones.forEach((oracion, index) => {
          oracion.classList.toggle('active', index === currentOracion);
      });

      // Actualiza los textos de los botones "Siguiente" y "Anterior"
      siguienteBtn.textContent = oraciones[currentOracion + 1]?.querySelector('h3').textContent || 'Rosario Completo';
      anteriorBtn.textContent = oraciones[currentOracion - 1]?.querySelector('h3').textContent || 'Inicio';

      // Deshabilita el botón "Anterior" si estamos en la primera oración, y "Siguiente" si estamos en la última
      anteriorBtn.disabled = currentOracion === 0;
      siguienteBtn.disabled = currentOracion === oraciones.length - 1;
  }

  // Evento para avanzar a la siguiente oración
  siguienteBtn.addEventListener('click', () => {
      // Si no estamos en la última oración
      if (currentOracion < oraciones.length - 1) {
          currentOracion++;  // Aumenta el índice de la oración actual
          updateOracion();   // Actualiza la oración actual
          updateProgressBar();  // Actualiza la barra de progreso
          updateBackgroundOpacity();  // Actualiza la opacidad del fondo
      }
  });

  // Evento para retroceder a la oración anterior
  anteriorBtn.addEventListener('click', () => {
      // Si no estamos en la primera oración
      if (currentOracion > 0) {
          currentOracion--;  // Disminuye el índice de la oración actual
          updateOracion();   // Actualiza la oración actual
          updateProgressBar();  // Actualiza la barra de progreso
          updateBackgroundOpacity();  // Actualiza la opacidad del fondo
      }
  });

  // Llamada inicial para mostrar la primera oración correctamente
  updateOracion();

  // Selecciona la barra de progreso y calcula el total de oraciones
  const progressBar = document.getElementById('progress-bar');
  const totalOraciones = oraciones.length;

  // Función para actualizar el ancho de la barra de progreso
  function updateProgressBar() {
    const progressPercentage = (currentOracion + 1) / totalOraciones * 100;  // Calcula el porcentaje de progreso
    progressBar.style.width = `${progressPercentage}%`;  // Ajusta el ancho de la barra
  }

  // Llama a la función de la barra de progreso al cargar la página
  updateProgressBar();

  // Selecciona el elemento principal y el título de la página
  const mainElement = document.querySelector('main');
  const titleElement = document.querySelector('h1');
  
  // Selecciona todos los enlaces (links) en la página
  const linkElements = document.querySelectorAll('a'); 

  // Función para actualizar la opacidad del fondo y el color del título y enlaces
  function updateBackgroundOpacity() {
    // Si es la última oración
    if (currentOracion === oraciones.length - 1) {
      mainElement.classList.add('main-clear-bg');  // Añade la clase para hacer el fondo transparente
      titleElement.classList.add('final-title-color');  // Cambia el color del título
      linkElements.forEach(link => link.classList.add('final-link-color'));  // Cambia el color de todos los enlaces
    } else {
      mainElement.classList.remove('main-clear-bg');  // Restaura el fondo
      titleElement.classList.remove('final-title-color');  // Restaura el color del título
      linkElements.forEach(link => link.classList.remove('final-link-color'));  // Restaura el color de los enlaces
    }
  }

  // Llama a la función de actualización de opacidad al cargar la página
  updateBackgroundOpacity();

  // Selecciona el botón del menú hamburguesa y el panel del menú
  const menuBtn = document.querySelector('.menu-btn');
  const panel = document.querySelector('.panel');

  // Evento para abrir/cerrar el menú cuando se hace clic en el botón
  menuBtn.addEventListener('click', () => {
    panel.classList.toggle('is-active');  // Alterna la visibilidad del panel
    menuBtn.classList.toggle('is-active');  // Cambia la apariencia del botón
  });

  // Agrega eventos para cada enlace del menú
  document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');  // Obtiene el href del enlace
      
      // Si el enlace es "Home", no se previene el comportamiento por defecto
      if (href === '/index.html' || href === '#') {
        return;
      }

      e.preventDefault();  // Evita el comportamiento por defecto de otros enlaces

      // Obtiene el ID del destino del enlace
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      // Oculta todas las oraciones y muestra solo la seleccionada
      oraciones.forEach(oracion => oracion.classList.remove('active'));
      targetElement.classList.add('active');
      
      // Actualiza el índice de la oración actual
      currentOracion = Array.from(oraciones).indexOf(targetElement);

      // Actualiza el estado de la oración, barra de progreso y opacidad del fondo
      updateOracion();
      updateProgressBar();
      updateBackgroundOpacity();

      // Cierra el panel del menú y cambia el estado del botón
      panel.classList.remove('is-active');
      menuBtn.classList.remove('is-active');
    });
  });
});
