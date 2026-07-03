(function () {
  "use strict";

  var envelopeScreen = document.getElementById("envelopeScreen");
  var envelope        = document.getElementById("envelope");
  var waxSeal          = document.getElementById("waxSeal");
  var invite           = document.getElementById("invite");

  var opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    envelope.classList.add("is-open");

    // reveal the invitation shortly after the flap starts opening
    window.setTimeout(function () {
      invite.classList.add("is-visible");
      invite.removeAttribute("aria-hidden");
    }, 420);

    // fully hide the envelope screen once the animation settles
    window.setTimeout(function () {
      envelopeScreen.classList.add("is-open");
    }, 950);
  }

  waxSeal.addEventListener("click", function (e) {
    e.stopPropagation();
    openEnvelope();
  });

  envelope.addEventListener("click", openEnvelope);

  waxSeal.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });

  /* ---------------- Countdown ---------------- */
  var countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    var target = new Date(countdownEl.getAttribute("data-target"));
    var daysEl    = document.getElementById("cd-days");
    var hoursEl   = document.getElementById("cd-hours");
    var minutesEl = document.getElementById("cd-minutes");
    var secondsEl = document.getElementById("cd-seconds");

    function pad(n) { return String(n).padStart(2, "0"); }

    function tick() {
      var diff = target.getTime() - Date.now();

      if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
      }

      var totalSeconds = Math.floor(diff / 1000);
      var days    = Math.floor(totalSeconds / 86400);
      var hours   = Math.floor((totalSeconds % 86400) / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;

      daysEl.textContent    = pad(days);
      hoursEl.textContent   = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    tick();
    setInterval(tick, 1000);
  }
})();
