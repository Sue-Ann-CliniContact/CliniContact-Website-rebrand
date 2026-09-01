import { define, injectCSS } from '../../core/mount.js';
import css from './hero.css';

/**
 * Homepage hero.
 *
 * Three constraints shape the copy:
 *
 * 1. No enrollment promise. CliniContact delivers prescreened, verified
 *    referrals; the site consents and enrolls. Headlining "enrolled" commits to
 *    an outcome outside their control, which is both a commercial risk and
 *    something sponsors will push on. The endpoint is the site handoff.
 * 2. No competitor reference. Naming a rival on your own homepage reads
 *    defensively and gives them oxygen.
 * 3. No volume metrics; scale is the comparison CliniContact loses. Lead with
 *    being a recruitment partner that plans the strategy around the study's
 *    needs. The two commercial models (a fast fixed-term rescue, or the ongoing
 *    transparent-ad-spend partnership) are differentiated only at Pricing, never
 *    pushed as the homepage thesis.
 */

/**
 * `accent` is a bright variant of each product's signature colour (the product
 * sections use darker, text-safe versions of the same hues on white). Bright is
 * needed here because the badges sit on the dark navy hero.
 */
const STAGES = [
  {
    stage: 'Startup & digital recruitment',
    name: 'Horizon',
    desc: 'The recruitment engine: a package built, then campaigns we plan and run to your ad spend.',
    href: '#horizon',
    accent: '#4ba0f8',
  },
  {
    stage: 'Community pathways',
    name: 'Bridge',
    desc: 'Community relationships that keep referring, study after study.',
    href: '#bridge',
    accent: '#2dd4bf',
  },
  {
    stage: 'Prescreening',
    name: 'Smart Screener',
    desc: 'Your I/E criteria applied before a coordinator is involved.',
    href: '#smart-screener',
    accent: '#a78bfa',
  },
  {
    stage: 'The recruitment portal',
    name: 'Vision',
    desc: 'Automated messaging, one timeline, scheduling and your integrations built in.',
    href: '#vision',
    accent: '#fb923c',
  },
];

const PILLS = ['HIPAA & GDPR aligned', '21 CFR Part 11 aware workflows', 'Central & local IRB', 'Decentralized and site-based'];

function mount(el) {
  injectCSS('hero', css);
  el.classList.add('cc-hero');

  el.innerHTML = `
    <div class="cc-fullbleed">
      <div class="cch-bg">
        <div class="cch-inner">
          <span class="cch-kicker"><span class="cch-dot"></span>Clinical trial recruitment, run as a partnership</span>

          <h1 class="cch-h1">A recruitment partner who plans the whole strategy around <span class="accent">your study</span>.</h1>

          <p class="cch-sub">
            We plan the recruitment strategy around your protocol, your sites and your population, then run it
            end to end: digital outreach and real community relationships, together. Whether your study needs a
            fast rescue or a partner for its full length, we shape the engagement to what it actually needs, and
            manage it from protocol to prescreened referral.
          </p>

          <!--
            CTA ladder, lowest friction first. "Request a quote" asks for scope,
            not calendar time — it converts better than "book a demo" because
            nobody has to commit to a call to find out what this costs.
          -->
          <div class="cch-actions">
            <button type="button" class="cch-btn primary" data-cc-contact>Request a quote</button>
            <a class="cch-btn" href="#horizon">See the platform <span aria-hidden="true">&darr;</span></a>
          </div>

          <div class="cch-spine">
            ${STAGES.map(
              (s, i) => `
              <a class="cch-step" href="${s.href}" style="--accent:${s.accent}">
                <span class="cch-step-n">${i + 1}</span>
                <span class="cch-step-stage">${s.stage}</span>
                <span class="cch-step-name">${s.name}</span>
                <p class="cch-step-desc">${s.desc}</p>
              </a>`
            ).join('')}
          </div>

          <div class="cch-pills">
            ${PILLS.map((p) => `<span class="cch-pill">${p}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Smooth-scroll the in-page product links.
  el.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

define('hero', mount);
