/* ======================================================
   FECHA DEL MATRIMONIO
====================================================== */

const weddingDate =
  new Date("2027-03-06T16:00:00");


const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


function updateCountdown() {

  const now = new Date();

  const difference =
    weddingDate.getTime() -
    now.getTime();


  if (difference <= 0) {

    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;

  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        difference /
        (1000 * 60 * 60)
      ) % 24
    );


  const minutes =
    Math.floor(
      (
        difference /
        (1000 * 60)
      ) % 60
    );


  const seconds =
    Math.floor(
      (
        difference / 1000
      ) % 60
    );


  daysElement.textContent =
    String(days).padStart(3, "0");


  hoursElement.textContent =
    String(hours).padStart(2, "0");


  minutesElement.textContent =
    String(minutes).padStart(2, "0");


  secondsElement.textContent =
    String(seconds).padStart(2, "0");

}


/* Ejecutar contador */

updateCountdown();

setInterval(
  updateCountdown,
  1000
);



/* ======================================================
   APERTURA DEL SOBRE
====================================================== */

const cardOpeningScreen =
  document.getElementById(
    "cardOpeningScreen"
  );

const cardCover =
  document.getElementById(
    "cardCover"
  );

const goldSeal =
  document.getElementById(
    "goldSeal"
  );


let cardOpened = false;

let touchStartY = 0;

let touchEndY = 0;


/* Bloquear scroll mientras está el sobre */

document.body.style.overflow =
  "hidden";


/* ======================================================
   ABRIR SOBRE
====================================================== */

function openCard() {

  if (cardOpened) {
    return;
  }


  cardOpened = true;


  /*
    Activa la animación CSS
    del sobre
  */

  cardOpeningScreen.classList.add(
    "opening"
  );


  /*
    Después de la animación
    desaparece la pantalla inicial
    y entramos directamente
    a la invitación.
  */

  setTimeout(() => {

    cardOpeningScreen.classList.add(
      "finished"
    );


    /* permitir scroll */

    document.body.style.overflow =
      "";


    /*
      quitar completamente
      la pantalla del sobre
    */

    setTimeout(() => {

      cardOpeningScreen.style.display =
        "none";

    }, 900);


  }, 1100);

}



/* ======================================================
   CLICK EN EL SELLO
====================================================== */

if (goldSeal) {

  goldSeal.addEventListener(
    "click",
    (event) => {

      /*
        Evita que también se ejecute
        el click del cardCover
      */

      event.stopPropagation();

      openCard();

    }
  );

}



/* ======================================================
   CLICK EN TODO EL SOBRE
====================================================== */

if (cardCover) {

  cardCover.addEventListener(
    "click",
    openCard
  );

}



/* ======================================================
   DESLIZAR HACIA ARRIBA EN CELULAR
====================================================== */

if (cardOpeningScreen) {

  cardOpeningScreen.addEventListener(
    "touchstart",
    (event) => {

      touchStartY =
        event.touches[0].clientY;

      touchEndY =
        touchStartY;

    },
    {
      passive: true
    }
  );


  cardOpeningScreen.addEventListener(
    "touchmove",
    (event) => {

      touchEndY =
        event.touches[0].clientY;

    },
    {
      passive: true
    }
  );


  cardOpeningScreen.addEventListener(
    "touchend",
    () => {

      const movement =
        touchStartY -
        touchEndY;


      /*
        Si deslizó más de
        45 píxeles hacia arriba
      */

      if (movement > 45) {

        openCard();

      }


      touchStartY = 0;
      touchEndY = 0;

    }
  );

}



/* ======================================================
   ANIMACIONES AL HACER SCROLL
====================================================== */

const elementsToAnimate =
  document.querySelectorAll(
    ".section-title, " +
    ".countdown, " +
    ".child-card, " +
    ".timeline-item, " +
    ".location-section .container, " +
    ".dress-image-container, " +
    ".gift-section .container"
  );


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );


            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.15
    }

  );


elementsToAnimate.forEach(
  (element) => {

    element.classList.add(
      "reveal"
    );


    observer.observe(
      element
    );

  }
);



/* ======================================================
   LISTA DE REGALOS
====================================================== */

const giftButton =
  document.getElementById(
    "giftButton"
  );


if (giftButton) {

  giftButton.addEventListener(
    "click",
    () => {

      alert(
        "Nuestra lista de regalos estará disponible próximamente ♡"
      );

    }
  );

}