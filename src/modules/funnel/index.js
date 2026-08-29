import { define, injectCSS } from '../../core/mount.js';
import css from './funnel.css';

/**
 * "The one story" funnel band.
 *
 * Positioning (corrected): the whole journey runs in Vision, our portal, and
 * that is the thing we lead with, not a boundary. Reach, qualify, engage, refer
 * and capture all happen in one place. Vision is the system we recommend and the
 * one most clients stay in. The integration is a POSITIVE flexibility win for
 * clients committed to their own system of record, not a "we hand off / we do
 * not own your data" disclaimer. Data is always captured in Vision first, then
 * pushed to REDCap / Qualtrics / a CTMS on request. Coordinators enroll from a
 * fully prepared record (enrollment stays the site's clinical step, framed as a
 * strength: they get a prepared participant, not a contact card).
 *
 * Do NOT reintroduce "where our work ends" or an ours-vs-yours split: it reads as
 * what we do not do and pushes clients away from the product we want them on.
 */
const STAGES = [
  { stage: 'Reach', product: 'Horizon + Bridge', note: 'Digital campaigns and community referral pathways, two lanes into one pipeline.' },
  { stage: 'Qualify', product: 'Smart Screener', note: 'Your I/E criteria applied before a coordinator is ever involved.' },
  { stage: 'Engage', product: 'Vision', note: 'Automated messaging, one comms timeline, and scheduling built in.' },
  { stage: 'Refer', product: 'Vision', note: 'A fully prepared record your coordinators act on and enroll from.' },
  { stage: 'Capture', product: 'Vision', note: 'Every message, outcome and status captured on the participant record.' },
];

const stepCard = (s, i) => `
  <div class="ccfn-step">
    <span class="ccfn-stage">${s.stage}</span>
    <span class="ccfn-product">${s.product}</span>
    <p class="ccfn-note">${s.note}</p>
  </div>${i < STAGES.length - 1 ? '<span class="ccfn-arw" aria-hidden="true">›</span>' : ''}`;

function mount(el) {
  injectCSS('funnel', css);
  el.classList.add('cc-funnel');

  el.innerHTML = `
    <div class="cc-fullbleed ccfn-band">
      <div class="ccfn-inner">
        <div class="ccfn-head">
          <p class="ccfn-kicker reveal">One portal, end to end</p>
          <h2 class="ccfn-h1 reveal">The whole recruitment journey, run in one place.</h2>
          <p class="ccfn-sub reveal">Reach, qualify, engage, refer and capture: every step lives in Vision, the portal your team works in. Your coordinators enroll from a participant who arrives fully prepared, and the whole record is captured as it happens.</p>
        </div>

        <div class="ccfn-flow reveal">
          ${STAGES.map(stepCard).join('')}
        </div>

        <div class="ccfn-flex reveal">
          <span class="ccfn-flex-tag">Your system of record is welcome too</span>
          <p class="ccfn-flex-body">Vision is the portal we recommend, and the one most clients stay in. Set on your own system? Vision captures everything first, then integrates and pushes it straight into REDCap, Qualtrics or your CTMS. Use Vision, keep your system, or both.</p>
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

define('funnel', mount);
