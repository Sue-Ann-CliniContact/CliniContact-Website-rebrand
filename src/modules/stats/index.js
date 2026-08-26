import { define, injectCSS } from '../../core/mount.js';
import css from './stats.css';

/**
 * "The recruitment problem" counters.
 *
 * Replaces the old volume counters (132+ conditions, 284M patients reached),
 * which were uncited and are exactly the volume comparison our positioning tells
 * us to drop. These are widely reported clinical-trial recruitment benchmarks,
 * attributed to the industry rather than to our own studies, and they set up why
 * a budget-careful partner matters.
 *
 * NOTE: figures are directional and MUST have their exact numbers and citations
 * finalized before this goes public.
 *
 * Everything here is scoped to .cc-stats (the original embed leaked its navy
 * palette onto :root and forced !important overrides elsewhere).
 */

export const STATS = [
  { value: 80, suffix: '%', label: 'of clinical trials fail to finish on time, most often because of recruitment' },
  { value: 30, suffix: '%', label: "of a trial's timeline is spent on patient recruitment" },
  { value: 19, suffix: '%', label: 'of trials are terminated for failing to enroll enough participants' },
  { value: 11, suffix: '%', label: 'of study sites enroll zero patients' },
];

export const STATS_KICKER = 'The recruitment problem';
export const STATS_SOURCE = 'Widely reported clinical-trial recruitment benchmarks (industry sources to be finalized before publication).';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function animate(el, target, suffix, reduced) {
  if (reduced) {
    el.textContent = `${target}${suffix}`;
    return;
  }
  const duration = 1150;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = `${Math.round(target * easeOutCubic(p))}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function mount(el) {
  injectCSS('stats', css);
  el.classList.add('cc-stats');

  el.innerHTML = `
    <div class="ccs-inner">
      <div class="ccs-header"><div class="ccs-kicker">${STATS_KICKER}</div></div>
      <div class="ccs-grid" role="list">
        ${STATS.map(
          (s) => `
          <div class="ccs-stat" role="listitem">
            <div class="ccs-value"><span class="ccs-count" data-target="${s.value}" data-suffix="${s.suffix}">0</span></div>
            <div class="ccs-label">${s.label}</div>
          </div>`
        ).join('')}
      </div>
      <p class="ccs-source">${STATS_SOURCE}</p>
    </div>
  `;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let started = false;

  function start() {
    if (started) return;
    started = true;

    el.querySelectorAll('.ccs-stat').forEach((card, i) => {
      if (reduced) card.classList.add('is-visible');
      else setTimeout(() => card.classList.add('is-visible'), i * 90);
    });

    el.querySelectorAll('.ccs-count').forEach((c) => {
      animate(c, Number(c.dataset.target || 0), c.dataset.suffix || '', reduced);
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
  } else {
    start();
  }
}

define('stats', mount);
