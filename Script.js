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

  const now =
    new Date();

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

const enterInvitationButton =
  document.getElementById(
    "enterInvitationButton"
  );


let cardOpened = false;

let touchStartY = 0;

let touchEndY = 0;


/* Bloquea el scroll al entrar */
document.body.style.overflow =
  "hidden";


function openCard() {

  if (cardOpened) {
    return;
  }

  cardOpened = true;

  cardOpeningScreen.classList.add(
    "opening"
  );

}


/* Click en el sello */
goldSeal.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    openCard();

  }
);


/* También permite tocar el sobre */
cardCover.addEventListener(
  "click",
  openCard
);



/* ======================================================
   DESLIZAR HACIA ARRIBA
====================================================== */

cardOpeningScreen.addEventListener(
  "touchstart",
  (event) => {

    touchStartY =
      event.touches[0].clientY;

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


    if (movement > 45) {

      openCard();

    }


    touchStartY = 0;

    touchEndY = 0;

  }
);



/* ======================================================
   ENTRAR A LA INVITACIÓN
====================================================== */

enterInvitationButton.addEventListener(
  "click",
  () => {

    cardOpeningScreen.classList.add(
      "finished"
    );


    document.body.style.overflow =
      "";


    setTimeout(
      () => {

        cardOpeningScreen.style.display =
          "none";

      },
      1000
    );

  }
);



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
      threshold: .15
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
   REGALOS
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