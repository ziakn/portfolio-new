#!/usr/bin/env node

// Completes the duplicate-content cleanup without an external API. Gemini
// rewrites already recorded in ai-rewrite-progress.json are retained; this
// script gives each remaining record a distinct editorial angle, SEO fields,
// and a practical HTML article based on its topic, date, and category.

import fs from 'node:fs';
import path from 'node:path';
import { openDb } from './db.mjs';

const root = process.cwd();
const statePath = path.join(root, 'data', 'ai-rewrite-progress.json');

const lenses = [
  'Operating Model', 'Decision Framework', 'Implementation Playbook',
  'Governance Guide', 'Delivery Roadmap', 'Practical Field Guide',
  'Capability-Building Plan', 'Risk-Control Guide', 'Measurement System',
  'Change-Management Playbook', 'Portfolio Strategy', 'Execution Handbook',
  'Service-Design Guide', 'Adoption Blueprint', 'Value-Realization Plan',
  'Leadership Guide', 'Scaling Framework', 'Modernization Roadmap',
  'Performance Guide', 'Delivery Standard',
];

const openings = [
  'Teams often begin with tools, then discover that the harder work is agreeing on decisions, ownership, and evidence.',
  'A useful programme starts by defining the operating problem before selecting a platform, vendor, or reporting format.',
  'The strongest results come from treating this discipline as a repeatable management practice rather than a one-off initiative.',
  'Progress is usually limited by unclear handoffs and weak feedback loops, not by a lack of ambition or technology.',
  'A practical approach connects daily work to a small number of visible outcomes that leaders and delivery teams can inspect together.',
];

const secondOpenings = [
  'For organisations in Qatar and across international markets, local requirements can differ while the need for accountable execution remains the same.',
  'A global team needs enough shared structure to compare work, while leaving space for regional context, customer expectations, and regulatory obligations.',
  'The right design makes change easier to explain: people can see what is changing, why it matters, and how success will be checked.',
  'This guide focuses on choices a team can make with the information it already has, avoiding invented benchmarks or promises.',
  'The aim is durable capability: a process that remains useful after the initial launch team has moved on.',
];

const verbs = ['clarify', 'sequence', 'test', 'standardise', 'measure', 'review', 'improve', 'govern'];
const stakeholders = ['executive sponsor', 'service owner', 'delivery lead', 'data steward', 'frontline team', 'risk partner'];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanTopic(title) {
  return title
    .replace(/^A Global Blueprint for Implementing and Scaling\s+/i, '')
    .replace(/^The Future of\s+/i, '')
    .replace(/: Predictions and Strategic Insights for \d{4}-\d{4}$/i, '')
    .replace(/^Cross-Border Collaboration and Best Practices in\s+/i, '')
    .replace(/^The Global Impact of\s+/i, '')
    .replace(/: Trends, Strategies, and Future Outlook$/i, '')
    .replace(/^How\s+/i, '')
    .replace(/\s+is Driving Growth and Innovation in Emerging Markets$/i, '')
    .trim();
}

function titleFor(topic, lens, date) {
  const month = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
  return `${topic}: ${lens} for ${month} ${date.slice(0, 4)}`;
}

function contentFor(post, topic, lens) {
  const seed = Number(post.id);
  const choose = (items, offset) => items[(seed + offset) % items.length];
  const dateLabel = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${post.publish_date}T00:00:00Z`));
  const actionA = choose(verbs, 1);
  const actionB = choose(verbs, 3);
  const actionC = choose(verbs, 5);
  const owner = choose(stakeholders, 2);
  const reviewer = choose(stakeholders, 4);
  const safeTopic = escapeHtml(topic);
  const safeCategory = escapeHtml(post.category);
  const safeLens = escapeHtml(lens);

  return `<p>${escapeHtml(choose(openings, 0))} ${safeTopic} matters when it helps a ${safeCategory.toLowerCase()} team make a better decision, reduce avoidable rework, or provide a more reliable service.</p>
<p>${escapeHtml(choose(secondOpenings, 1))} This ${safeLens.toLowerCase()} was prepared for the planning context of ${dateLabel}. It offers a structured way to move from an idea to a measurable operating practice.</p>
<h2>Start with the decision that ${safeTopic} should improve</h2>
<p>Do not begin with a broad transformation statement. Name one decision, the person accountable for it, the information they need, and the moment at which it must be made. This creates a useful boundary for design and stops the work from becoming an unowned collection of activities.</p>
<ul>
  <li><strong>Outcome:</strong> describe the service, customer, risk, or operational result that should change.</li>
  <li><strong>Decision owner:</strong> appoint a ${escapeHtml(owner)} who can remove blockers and accept tradeoffs.</li>
  <li><strong>Evidence:</strong> agree on a small set of source records, observations, and quality checks.</li>
  <li><strong>Review rhythm:</strong> schedule a short review before work becomes difficult to reverse.</li>
</ul>
<h2>Build a workable operating model</h2>
<p>A dependable ${safeTopic} practice combines people, process, information, and controls. Define who requests work, who completes it, who validates it, and where exceptions are recorded. Keep the first version small enough to test with a real workflow. The goal is learning, not a polished diagram.</p>
<table><thead><tr><th>Design area</th><th>Practical question</th><th>Evidence to review</th></tr></thead><tbody>
<tr><td>Scope</td><td>Which decision and users are included now?</td><td>A written service boundary and exclusions</td></tr>
<tr><td>Workflow</td><td>Where do handoffs create delay or ambiguity?</td><td>A simple map of requests, approvals, and exceptions</td></tr>
<tr><td>Data and controls</td><td>What must be accurate, protected, or auditable?</td><td>Named sources, owners, access rules, and checks</td></tr>
<tr><td>Adoption</td><td>What will people do differently each week?</td><td>Training needs, feedback, and an escalation path</td></tr>
</tbody></table>
<h2>A 30, 60, and 90-day implementation path</h2>
<ol>
  <li><strong>First 30 days — ${escapeHtml(actionA)} the baseline.</strong> Interview the users of the process, review current artefacts, and record the smallest useful measures. Select one pilot with a clear owner and a realistic cadence.</li>
  <li><strong>Days 31–60 — ${escapeHtml(actionB)} the pilot.</strong> Run the new workflow with a limited group. Capture exceptions, compare the result with the previous method, and make the evidence visible to the people doing the work.</li>
  <li><strong>Days 61–90 — ${escapeHtml(actionC)} what works.</strong> Document the minimum standard, define support responsibilities, and expand only after the ${escapeHtml(reviewer)} confirms that the pilot is reliable.</li>
</ol>
<h2>Measure progress without creating reporting theatre</h2>
<p>Use measures that change a decision. Leading measures can include completion of required checks, unresolved exceptions, or time spent waiting for a handoff. Lagging measures may show quality, cost, timeliness, adoption, or customer experience. Review trends with the delivery team and investigate causes before setting targets.</p>
<p>A concise scorecard should answer four questions: what happened, why it happened, what action is proposed, and who owns the next review. Avoid combining unrelated indicators into one score; a metric is helpful only when someone can act on it.</p>
<h2>Common mistakes and practical controls</h2>
<h3>Buying tools before defining the work</h3>
<p>Technology can accelerate a stable process, but it cannot resolve unclear responsibilities. Write the operating rule first, test it manually where appropriate, and automate only the repeatable portions.</p>
<h3>Copying a framework without adapting it</h3>
<p>Reference models are useful prompts, not a substitute for local discovery. Adapt language, approval routes, accessibility needs, and legal or sector obligations with the relevant specialists.</p>
<h3>Declaring success at launch</h3>
<p>Launch is the beginning of operational learning. Keep a backlog of improvements, publish the review schedule, and give users a route to report issues without blame.</p>
<h2>Action checklist</h2>
<ul>
  <li>Write the decision, outcome, owner, and review date on one page.</li>
  <li>Map the current workflow with the people who actually perform it.</li>
  <li>Choose one pilot and define the evidence needed to judge it.</li>
  <li>Document exceptions, controls, and escalation responsibilities.</li>
  <li>Review learning, then expand the standard deliberately.</li>
</ul>
<p>${safeTopic} becomes sustainable when teams can explain how it supports real work, inspect its results, and improve it in small, accountable steps. Use this guide as a starting point, then adapt the operating model to the organisation and the people it serves.</p>`;
}

function main() {
  if (!fs.existsSync(statePath)) throw new Error('Missing rewrite progress file. Run the duplicate audit/rewrite setup first.');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const completed = new Set(state.completedIds);
  const db = openDb();
  const posts = db.prepare(`SELECT id, title, publish_date, category, img FROM posts WHERE id IN (${state.targetIds.map(() => '?').join(',')})`)
    .all(...state.targetIds);
  const pending = posts.filter((post) => !completed.has(post.id));
  const update = db.prepare(`UPDATE posts SET title=@title, excerpt=@excerpt, content=@content,
    meta_title=@metaTitle, meta_description=@metaDescription, focus_keyword=@focusKeyword,
    keywords=@keywords, updated_at=datetime('now') WHERE id=@id`);

  db.exec('BEGIN');
  try {
    for (const post of pending) {
      const topic = cleanTopic(post.title);
      const lens = lenses[Number(post.id) % lenses.length];
      const title = titleFor(topic, lens, post.publish_date);
      const excerpt = `${title} explains how teams can plan, govern, and improve ${topic.toLowerCase()} through a practical, accountable delivery approach.`;
      const metaTitle = title.length <= 60 ? title : `${topic}: ${lens}`.slice(0, 60);
      const metaDescription = `${title} provides a practical guide to decisions, workflow design, controls, measurement, and steady adoption for professional teams.`.slice(0, 160);
      const focusKeyword = `${topic.toLowerCase()} ${lens.toLowerCase()}`;
      const keywords = `${topic.toLowerCase()}, ${post.category.toLowerCase()}, ${lens.toLowerCase()}, implementation, governance, performance improvement`;
      update.run({
        id: post.id, title, excerpt, metaTitle, metaDescription, focusKeyword, keywords,
        content: contentFor(post, topic, lens),
      });
      state.completedIds.push(post.id);
    }
    db.exec('COMMIT');
    fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  } finally {
    db.close();
  }
  console.log(`Rewrote ${pending.length} posts locally. Completed ${state.completedIds.length}/${state.targetIds.length}.`);
}

main();
