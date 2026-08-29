import { define, injectCSS } from '../../core/mount.js';
import css from './funnel.css';

/**
 * "The one story" funnel band.
 *
 * Speaks the market's funnel language (recruitment, engagement, enrollment, data
 * capture) so a buyer shopping for recruitment recognizes us, then lands the
 * differentiator the all-in-one platforms cannot: we run the FRONT of the funnel
 * and hand a verified referral into the systems the client already uses. We do
 * not own their enrollment or their data, and that is the point (no lock-in).
 *
 * Ownership is the whole message, so it is encoded in the markup: `ours` stages
 * are solid and accented, `yours` stages are dashed and muted, with the verified
 * referral pinned as the commit point between them.
 */
const OURS = [
  { stage: 'Reach', product: 'Horizon + Bridge', note: 'Digital campaigns and community referral pathways, two lanes into one pipeline.' },
  { stage: 'Qualify', product: 'Smart Screener', note: 'Your I/E criteria applied before a coordinator is ever involved.' },
  { stage: 'Engage', product: 'Vision', note: 'Automated messaging, one comms timeline, scheduling built in.' },
  { stage: 'Verified referral', product: 'What we commit to', note: 'The handoff. Where our work ends and our promise sits.', pin: true },
];
const YOURS = [
  { stage: 'Enrollment', note: 'Consent and enrollment stay your site’s call.' },
  { stage: 'Data capture', note: 'Into REDCap, Qualtrics or your CTMS. Your system of record, not ours.' },
];

const ourCard = (s, i) => `
  <div class="ccfn-step ours${s.pin ? ' pin' : ''}">
    <span class="ccfn-tag">We run this</span>
    <span class="ccfn-stage">${s.stage}</span>
    <span class="ccfn-product">${s.product}</span>
    <p class="ccfn-note">${s.note}</p>
  </div>${i < OURS.length - 1 ? '<span class="ccfn-arw" aria-hidden="true">›</span>' : ''}`;

const yourCard = (s, i) => `
  <div class="ccfn-step yours">
    <span class="ccfn-tag">Yours</span>
    <span class="ccfn-stage">${s.stage}</span>
    <p class="ccfn-note">${s.note}</p>
  </div>${i < YOURS.length - 1 ? '<span class="ccfn-arw muted" aria-hidden="true">›</span>' : ''}`;

function mount(el) {
  injectCSS('funnel', css);
  el.classList.add('cc-funnel');

  el.innerHTML = `
    <div class="cc-fullbleed ccfn-band">
      <div class="ccfn-inner">
        <div class="ccfn-head">
          <p class="ccfn-kicker reveal">The one story</p>
          <h2 class="ccfn-h1 reveal">We run the front of the funnel, and hand it clean into your systems.</h2>
          <p class="ccfn-sub reveal">The market calls it recruitment, engagement, enrollment, then data capture. We run the front of it, across digital and community, and hand you a verified referral straight into the tools you already use. You get the continuity without migrating onto anyone’s platform.</p>
        </div>

        <div class="ccfn-flow reveal">
          ${OURS.map(ourCard).join('')}
          <span class="ccfn-handoff" aria-hidden="true">⇢</span>
          ${YOURS.map(yourCard).join('')}
        </div>

        <p class="ccfn-foot reveal">Everything up to the verified referral is ours to run and prove. Consent, enrollment and your clinical data stay yours, in the systems you already trust.</p>
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
