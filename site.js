const CONTACT_EMAIL = "";

(function () {
  var brief = [
    "Brief for Benjamin Lopez Snyder",
    "",
    "Your name:",
    "Organization:",
    "Work you want: public voice, sales conduct, or support design",
    "What you say in public now:",
    "What should change:",
    "Reply time you can keep:",
    "How to reach you:"
  ].join("\n");

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.left = "0";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (err) {
        ok = false;
      }
      document.body.removeChild(area);
      if (ok) {
        resolve();
      } else {
        reject(new Error("copy failed"));
      }
    });
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  onReady(function () {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.querySelector("[data-nav-panel]");

    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var open = panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          var first = panel.querySelector("a");
          if (first) {
            first.focus();
          }
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && panel.classList.contains("is-open")) {
          panel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    }

    var shown = document.querySelector("[data-brief]");
    if (shown) {
      shown.textContent = brief;
    }

    var button = document.querySelector("[data-copy-brief]");
    var status = document.querySelector("[data-copy-status]");
    if (button) {
      button.addEventListener("click", function () {
        copyText(brief).then(function () {
          if (status) {
            status.textContent = "Copied. Paste it into your own note and fill the lines.";
          }
        }).catch(function () {
          if (status) {
            status.textContent = "Select the brief above and copy it from the page.";
          }
        });
      });
    }

    var mail = document.querySelector("[data-mailto]");
    var email = String(CONTACT_EMAIL || "").trim();
    if (mail) {
      if (validEmail(email)) {
        var subject = "Brief for Benjamin Lopez Snyder";
        mail.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(brief);
        mail.hidden = false;
        mail.removeAttribute("hidden");
      } else {
        mail.remove();
      }
    }
  });
})();
