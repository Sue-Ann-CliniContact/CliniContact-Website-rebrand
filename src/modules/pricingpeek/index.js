import { define, injectCSS } from '../../core/mount.js';
import { PRINCIPLE, MODELS } from '../pricing/pricing.data.js';
import css from './pricingpeek.css';

/**
 * Homepage pricing reflection.
 *
 * The homepage had no pricing story, so the two-models-one-principle framing on
 * the Pricing page dead-ended until a visitor clicked the tab. This band mirrors
 * it. It imports PRINCIPLE and MODELS straight from pricing.data.js, so the
 * homepage and the Pricing page can never drift.
 */
const PRICING_URL = 'https://www.clinicontact.com/pricing';

function mount(el) {
  injectCSS('pricingpeek', css);
  el.classList.add('cc-ppk');

  el.innerHTML = `
    <div class="cc-fullbleed ccppk-band">
      <div class="ccppk-inner">
        <div class="ccppk-copy">
          <p class="ccppk-kicker reveal">Pricing</p>
          <h2 class="ccppk-h1 reveal">${PRINCIPLE}</h2>
          <p class="ccppk-sub reveal">A fast, fixed-term rescue when the study has to move now, or an ongoing partnership across the whole study. We plan the right one with you.</p>
          <a class="ccppk-btn reveal" href="${PRICING_URL}">See how pricing works <span aria-hidden="true">→</span></a>
        </div>
        <div class="ccppk-models reveal">
          ${MODELS.map(
            (m) => `
            <div class="ccppk-model${m.featured ? ' featured' : ''}">
              <span class="ccppk-tag">${m.tag}</span>
              <h3 class="ccppk-name">${m.name}</h3>
              <p class="ccppk-short">${m.short}</p>
            </div>`
          ).join('')}
        </div>
      </div>
    </div>
  `;

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  el.setAttribute('data-reveal', '');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  el.querySelectorAll('.reveal').forEach((r) => io.observe(r));
}

define('pricingpeek', mount);
