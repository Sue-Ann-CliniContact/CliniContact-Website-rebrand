import { define, injectCSS } from '../../core/mount.js';
import { PILLARS_PAGE } from './pillars.data.js';
import css from './pillars.css';

/**
 * "Why a partner, not a vendor" band. Five aligned-incentive proof points plus
 * the forecasting add-on, rendered as a light section between the dark hero and
 * the product bands. Data lives in pillars.data.js.
 */
function mount(el) {
  injectCSS('pillars', css);
  el.classList.add('cc-pillars');

  const p = PILLARS_PAGE;

  el.innerHTML = `
    <div class="cc-fullbleed ccpl-band">
      <div class="ccpl-inner">
        <div class="ccpl-head">
          <p class="ccpl-kicker reveal">${p.kicker}</p>
          <h2 class="ccpl-h1 reveal">${p.heading}</h2>
          <p class="ccpl-sub reveal">${p.sub}</p>
        </div>

        <div class="ccpl-grid">
          ${p.items
            .map(
              (it, i) => `
            <div class="ccpl-card reveal">
              <span class="ccpl-n">${i + 1}</span>
              <h3>${it.title}</h3>
              <p>${it.body}</p>
            </div>`
            )
            .join('')}
        </div>

        <div class="ccpl-forecast reveal">
          <span class="fe">${p.forecast.eyebrow}</span>
          <h3>${p.forecast.title}</h3>
          <p>${p.forecast.body}</p>
          <div class="ccpl-tags">${p.forecast.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>
  `;

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  el.setAttribute('data-reveal', '');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  el.querySelectorAll('.reveal').forEach((r) => io.observe(r));
}

define('pillars', mount);
