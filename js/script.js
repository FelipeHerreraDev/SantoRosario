const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  const $modalCarta = d.getElementById("miModal");
  const $modalMetodos = d.getElementById("modal-metodos");

  const $btnAbrirCarta = d.getElementById("abrir-modal-btn");
  const $btnAbrirMetodos = d.querySelectorAll(".btn-misterios");

  const $spanCerrarModal = $modalCarta.querySelector(".cerrar");
  const $spanCerrarMetodos = $modalMetodos.querySelector(".cerrar");

  let misterioSeleccionado = null;

  d.addEventListener("click", (e) => {
    if(e.target === $btnAbrirCarta) {
      $modalCarta.style.display = 'block'
    }

    if(e.target === $spanCerrarModal) {
      $modalCarta.style.display = 'none'
    }

    $btnAbrirMetodos.forEach(btn => {
      if (e.target === btn) {
        e.preventDefault();
        misterioSeleccionado = btn.getAttribute("data-misterio"); // Guardar el misterio seleccionado
        $modalMetodos.style.display = 'block';
      }
    });

    if(e.target === $spanCerrarMetodos) {
      $modalMetodos.style.display = 'none'
    }
  });

  window.onclick = function(e) {
    if (e.target == $modalCarta) {
      $modalCarta.style.display = 'none';
    }

    if (e.target == $modalMetodos) {
      $modalMetodos.style.display = 'none';
    }
  };

  const opcionesRezo = document.querySelectorAll(".opcion-rezo");
  opcionesRezo.forEach(opcion => {
    opcion.addEventListener("click", () => {
      if (misterioSeleccionado) {
        window.location.href = `/views/misterios-${misterioSeleccionado}/metodo-${opcion.dataset.opcion}.html`;
      }
    });
  });
});
