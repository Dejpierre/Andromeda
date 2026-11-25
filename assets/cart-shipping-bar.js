/*
  Barre « livraison offerte » du panier : animations GSAP.
  - à l'ouverture du panier, la barre se remplit depuis zéro ;
  - quand le panier change, elle glisse vers sa nouvelle valeur et les chiffres du montant défilent ;
  - un reflet passe régulièrement sur la partie remplie ;
  - au seuil, le rond du bout se remplit et la phrase entière apparaît en fondu.
  GSAP n'est chargé que si une barre est affichée (panier non vide et ouvert).
  Sans GSAP, ou si le visiteur a demandé à réduire les animations, la barre
  affiche directement son état final (rendu par Liquid).
*/
(function () {
  if (window.__cartShippingBarInit) return;
  window.__cartShippingBarInit = true;

  var GSAP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  var SELECTOR = '[data-cart-shipping-bar]';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var states = new WeakMap();

  /* Même contrat que snippets/vendor-gsap.liquid : une seule Promise partagée. */
  function loadGsap() {
    if (window.gsap) return Promise.resolve();
    if (!window.__gsapReady) {
      window.__gsapReady = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = GSAP_URL;
        s.dataset.vendorSrc = GSAP_URL;
        s.onload = function () {
          s.dataset.loaded = 'true';
          resolve();
        };
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    return window.__gsapReady;
  }

  /* Reprend le format monétaire rendu par Liquid (ex. « €23,01 ») pour le décompte. */
  function makeFormatter(finalText) {
    var match = finalText.match(/\d[\d\s.,  ]*/);
    if (!match) return null;
    var numeric = match[0].trim();
    var decimals = numeric.match(/([.,])\d{2}$/);
    return function (cents) {
      var value = Math.max(0, cents) / 100;
      var text = decimals ? value.toFixed(2).replace('.', decimals[1]) : String(Math.round(value));
      return finalText.replace(numeric, text);
    };
  }

  function read(bar) {
    return {
      progress: Math.max(0, Math.min(100, parseFloat(bar.dataset.progress) || 0)),
      remaining: Math.max(0, parseInt(bar.dataset.remaining, 10) || 0),
    };
  }

  function paint(bar, st) {
    bar.style.setProperty('--csb-shown', st.shown.toFixed(3));
    var amount = bar.querySelector('[data-csb-amount]');
    if (amount && st.format && st.tweening) {
      /* N'écrit que si le texte change : évite de réveiller l'observateur pour rien. */
      var text = st.format(st.cents);
      if (amount.textContent !== text) amount.textContent = text;
    }
  }

  function startShine(bar, st) {
    var fill = bar.querySelector('.cart-shipping-bar__fill');
    if (!fill || st.shine) return;
    st.shine = window.gsap.fromTo(
      fill,
      { backgroundPosition: '130% 0' },
      { backgroundPosition: '-40% 0', duration: 1.3, ease: 'power1.inOut', repeat: -1, repeatDelay: 1.9, delay: 0.9 }
    );
  }

  /* La phrase apparaît lettre par lettre, comme le prix
     du bouton d'ajout au panier , en plus doux (fondu lent). Les mots restent entiers
     pour ne pas être coupés en fin de ligne. */
  function animateMessage(message, st) {
    /* progress(1) avant kill : force l'exécution de l'onComplete en attente
       (qui remet le HTML d'origine), pour ne jamais laisser le texte coincé
       à mi-fondu si une animation précédente est interrompue en plein vol. */
    if (st.letters) {
      st.letters.progress(1);
      st.letters.kill();
    }
    if (!message || !window.gsap) return;
    var original = message.innerHTML;
    var walker = document.createTreeWalker(message, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var letters = [];
    nodes.forEach(function (node) {
      var parts = node.textContent.split(/(\s+)/);
      var fragment = document.createDocumentFragment();
      /* Dans <em> (police manuscrite), on anime le mot entier : découper en
         lettres casserait les liaisons et le crénage, d'où un saut visible
         quand le texte d'origine est remis en fin d'animation. */
      var wholeWords = !!(node.parentElement && node.parentElement.closest('em'));
      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(' '));
          return;
        }
        var word = document.createElement('span');
        word.style.cssText = 'display:inline-block;white-space:nowrap';
        if (wholeWords) {
          word.textContent = part;
          letters.push(word);
          fragment.appendChild(word);
          return;
        }
        part.split('').forEach(function (ch) {
          var letter = document.createElement('span');
          letter.style.cssText = 'display:inline-block';
          letter.textContent = ch;
          word.appendChild(letter);
          letters.push(letter);
        });
        fragment.appendChild(word);
      });
      node.parentNode.replaceChild(fragment, node);
    });
    if (!letters.length) return;
    var split = message.innerHTML;
    st.letters = window.gsap.fromTo(
      letters,
      { opacity: 0, y: -4 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.022,
        ease: 'power2.out',
        /* Pas de calque 3D : le texte garde le même rendu pendant et après l'animation. */
        force3D: false,
        onComplete: function () {
          /* On remet le HTML d'origine, sauf si le panier a changé entre-temps. */
          if (document.contains(message) && message.innerHTML.replace(/ style="[^"]*"/g, '') === split.replace(/ style="[^"]*"/g, '')) {
            message.innerHTML = original;
          }
        },
      }
    );
  }

  /* Le montant défile comme un compteur de machine à sous : chaque chiffre est
     une petite colonne qui glisse de l'ancien chiffre au nouveau par le chemin
     le plus court, de gauche à droite. Le reste (€, virgule) ne bouge pas. */
  function rollAmount(amount, st, intro) {
    if (st.letters) {
      st.letters.progress(1);
      st.letters.kill();
    }
    if (!amount || !window.gsap) return;
    var finalText = amount.textContent.trim();
    var previous = intro ? '' : (st.amountText || '').replace(/\D/g, '');
    st.amountText = finalText;
    var digitCount = finalText.replace(/\D/g, '').length;
    var extra = previous ? previous.length - digitCount : 0;
    var reels = [];
    var seen = 0;

    /* Une colonne de chiffres dans une fenêtre un peu plus haute que la ligne,
       pour que les chiffres ne soient jamais rognés ; les bords s'estompent. */
    function addReel(sizer, cells, forward, resize) {
      var reel = document.createElement('span');
      reel.style.cssText =
        'display:inline-block;position:relative;vertical-align:baseline;padding:0.3em 0;margin:-0.3em 0;' +
        'clip-path:inset(0 -1px);' +
        '-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 22%,#000 78%,transparent 100%);' +
        'mask-image:linear-gradient(to bottom,transparent 0,#000 22%,#000 78%,transparent 100%)';
      var ghost = document.createElement('span');
      ghost.style.visibility = 'hidden';
      ghost.textContent = sizer;
      var column = document.createElement('span');
      column.style.cssText = 'position:absolute;left:0;top:0.3em;white-space:nowrap';
      cells.forEach(function (text) {
        var cell = document.createElement('span');
        cell.style.display = 'block';
        cell.textContent = text === '' ? ' ' : text;
        column.appendChild(cell);
      });
      reel.appendChild(ghost);
      reel.appendChild(column);
      amount.appendChild(reel);
      reels.push({ reel: reel, column: column, steps: cells.length - 1, forward: forward, resize: resize });
    }

    amount.textContent = '';
    finalText.split('').forEach(function (ch) {
      if (!/\d/.test(ch)) {
        amount.appendChild(document.createTextNode(ch));
        return;
      }
      /* Le montant a perdu des chiffres (19 → 9) : ils s'en vont par le haut
         pendant que leur place se referme. */
      if (seen === 0 && extra > 0) {
        previous
          .slice(0, extra)
          .split('')
          .forEach(function (gone) {
            addReel(gone, [gone, ''], true, 'close');
          });
      }
      var fromRight = digitCount - 1 - seen;
      var old = previous.charAt(previous.length - 1 - fromRight);
      var to = parseInt(ch, 10);
      seen++;
      /* Le montant a gagné un chiffre (9 → 19) : il arrive pendant que sa place s'ouvre. */
      if (previous && old === '') {
        addReel(ch, ['', ch], true, 'open');
        return;
      }
      /* À l'ouverture du panier, on part de trois chiffres avant, jamais de zéro. */
      var from = old === '' ? (to + 7) % 10 : parseInt(old, 10);
      /* Un chiffre inchangé ne bouge pas ; les autres prennent le chemin le plus court. */
      var up = (to - from + 10) % 10;
      if (up === 0) {
        amount.appendChild(document.createTextNode(ch));
        return;
      }
      var forward = up <= 5;
      var steps = forward ? up : 10 - up;
      var first = forward ? from : to;
      var cells = [];
      for (var i = 0; i <= steps; i++) cells.push(String((first + i) % 10));
      addReel(ch, cells, forward, null);
    });
    if (!reels.length) {
      amount.textContent = finalText;
      return;
    }
    var rolling = amount.innerHTML;
    var timeline = window.gsap.timeline({
      onComplete: function () {
        /* On remet le texte simple, sauf si le panier a changé entre-temps. */
        if (document.contains(amount) && amount.innerHTML.replace(/ style="[^"]*"/g, '') === rolling.replace(/ style="[^"]*"/g, '')) {
          amount.textContent = finalText;
        }
      },
    });
    var moving = 0;
    reels.forEach(function (r) {
      var end = (-100 * r.steps) / (r.steps + 1);
      var at = r.resize ? 0 : moving++ * 0.07;
      timeline.fromTo(
        r.column,
        { yPercent: r.forward ? 0 : end },
        { yPercent: r.forward ? end : 0, duration: 0.9, ease: 'power2.inOut', force3D: false },
        at
      );
      if (r.resize) {
        var width = r.reel.getBoundingClientRect().width;
        timeline.fromTo(
          r.reel,
          { width: r.resize === 'close' ? width : 0 },
          { width: r.resize === 'close' ? 0 : width, duration: 0.9, ease: 'power2.inOut' },
          at
        );
      }
    });
    st.letters = timeline;
  }

  function animateTo(bar, st, target, intro) {
    var gsap = window.gsap;
    var amount = bar.querySelector('[data-csb-amount]');
    var finalText = amount ? amount.textContent.trim() : '';
    st.format = null; /* le montant est animé par rollAmount */
    st.target = target.progress;

    var willReach = target.progress >= 100;
    var wasReached = st.shown >= 100;
    if (willReach && !wasReached) {
      bar.dataset.reached = 'false';
    }

    /* Quand le montant change, ses chiffres défilent ; la phrase entière ne
       s'anime que lorsqu'elle change vraiment (seuil atteint, ou retour dessous). */
    if (willReach !== wasReached || !amount) {
      st.amountText = amount ? amount.textContent.trim() : '';
      animateMessage(bar.querySelector('.cart-shipping-bar__message'), st);
    } else {
      rollAmount(amount, st, intro);
    }
    st.tweening = true;
    paint(bar, st);

    if (st.tween) {
      st.tween.progress(1);
      st.tween.kill();
    }
    st.tween = gsap.to(st, {
      shown: target.progress,
      cents: target.remaining,
      duration: intro ? 1.25 : 0.9,
      ease: intro ? 'power3.out' : 'power2.out',
      onUpdate: function () {
        paint(bar, st);
      },
      onComplete: function () {
        st.tweening = false;
        st.shown = target.progress;
        st.cents = target.remaining;
        if (willReach) {
          bar.dataset.reached = 'true';
          if (!wasReached) {
            var goal = bar.querySelector('.cart-shipping-bar__goal');
            if (goal) gsap.fromTo(goal, { scale: 0.86 }, { scale: 1, duration: 0.7, ease: 'back.out(3)', force3D: false, clearProps: 'transform' });
          }
        }
      },
    });

  }

  function sync(bar) {
    var target = read(bar);
    var st = states.get(bar);

    if (!st) {
      st = { shown: target.progress, cents: target.remaining, target: target.progress, visible: false, played: false };
      states.set(bar, st);
      visibility.observe(bar);
      return;
    }

    if (reduceMotion.matches || !window.gsap || !st.visible) {
      /* Pas d'animation : on s'aligne simplement sur l'état rendu par Liquid. */
      if (st.tween) st.tween.kill();
      st.shown = target.progress;
      st.cents = target.remaining;
      st.target = target.progress;
      st.tweening = false;
      bar.style.removeProperty('--csb-shown');
      return;
    }

    if (st.target !== target.progress || !st.played) {
      var intro = !st.played;
      if (intro) {
        st.shown = 0;
        var threshold = parseInt(bar.dataset.threshold, 10);
        st.cents = target.progress >= 100 || !threshold ? target.remaining : threshold;
        st.played = true;
      }
      animateTo(bar, st, target, intro);
    } else if (st.tweening) {
      /* Le thème vient de réécrire le HTML pendant une animation : on réapplique l'état courant. */
      paint(bar, st);
    }
  }

  var visibility = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var bar = entry.target;
        var st = states.get(bar);
        if (!st) return;
        st.visible = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (reduceMotion.matches) return;
          loadGsap()
            .then(function () {
              if (!document.contains(bar) || !st.visible) return;
              sync(bar);
              startShine(bar, st);
            })
            .catch(function () {});
        } else {
          /* Panier refermé : l'ouverture suivante rejouera le remplissage.
             progress(1) avant kill pour que l'onComplete en attente restaure
             le texte/montant propre, même si l'animation est coupée en vol. */
          if (st.tween) {
            st.tween.progress(1);
            st.tween.kill();
          }
          if (st.letters) {
            st.letters.progress(1);
            st.letters.kill();
          }
          if (st.shine) {
            st.shine.kill();
            st.shine = null;
          }
          var now = read(bar);
          st.played = false;
          st.tweening = false;
          st.shown = now.progress;
          st.cents = now.remaining;
          st.target = now.progress;
          bar.style.removeProperty('--csb-shown');
        }
      });
    },
    { threshold: 0.2 }
  );

  function scan() {
    document.querySelectorAll(SELECTOR).forEach(sync);
  }

  new MutationObserver(scan).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-progress'],
  });

  scan();
})();
