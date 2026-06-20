const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux"],
  Backend: ["Node.js", "NestJS", "Express", "REST APIs"],
  Database: ["PostgreSQL", "Prisma", "Redis"],
  DevOps: ["Docker", "GitHub Actions", "CI/CD"],
};

const projects = [
  {
    title: "Developer Skill Radar",
    description: "AI-powered career intelligence platform that analyzes resumes, GitHub profiles, and market demand.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "OpenAI", "Elasticsearch"],
    challenge: "Job seekers rarely know how their real skills line up against what the market is actually hiring for.",
    approach: "Ingests a resume and GitHub activity, scores them against live job-market signals, and uses OpenAI to turn the gap into a plain-language narrative instead of a raw number."
  },
  {
    title: "Tenant Intelligence Platform",
    description: "Property technology platform helping renters make informed decisions using AI insights.",
    stack: ["React", "Node.js", "PostgreSQL", "Mapbox"],
    challenge: "Renters often sign leases with little visibility into the neighborhood beyond the listing photos.",
    approach: "Layers AI-scored insights — noise, transit access, price trend — onto a Mapbox view of each listing, backed by a Postgres store of historical data."
  },
  {
    title: "AI Meeting Intelligence",
    description: "Meeting assistant that extracts action items and summaries automatically.",
    stack: ["Next.js", "NestJS", "Whisper", "OpenAI"],
    challenge: "Decisions and action items made in long meetings tend to get lost the moment the call ends.",
    approach: "Whisper transcribes the call, OpenAI extracts owners and deadlines, and NestJS turns the result into a summary that's shared automatically."
  },
  {
    title: "Crisis Response Platform",
    description: "Real-time disaster management and volunteer coordination platform.",
    stack: ["Go", "PostGIS", "WebSockets"],
    challenge: "Coordinating volunteers and agencies across a disaster zone over radio and phone calls is slow and error-prone.",
    approach: "Go services stream live positions over WebSockets while PostGIS tracks zones and resources spatially, so dispatchers see coverage gaps instead of chatter."
  }
];

const blogPosts = [
  { meta: "Engineering · 6 min read", title: "Inside Developer Skill Radar: Turning Resumes Into Career Signals", desc: "How resume parsing, GitHub signal, and market data come together into one score." },
  { meta: "Product & AI · 5 min read", title: "Designing a Tenant Platform Renters Actually Trust", desc: "Why showing your AI's reasoning mattered more than the score itself." },
  { meta: "Systems · 7 min read", title: "Real-Time Coordination With Go and WebSockets", desc: "Notes from building a location pipeline that has to stay up when everything else is down." }
];

/* ====================== RENDER: SKILLS ====================== */
const skillsGrid = document.getElementById('skillsGrid');
Object.entries(skills).forEach(([category, items]) => {
  const card = document.createElement('div');
  card.className = 'card skill-card reveal';
  card.innerHTML = `
    <h3>${category}</h3>
    <div class="chip-row">${items.map(i => `<span class="chip">${i}</span>`).join('')}</div>
  `;
  skillsGrid.appendChild(card);
});

/* ====================== RENDER: PROJECTS ====================== */
const projectsGrid = document.getElementById('projectsGrid');
projects.forEach((project, idx) => {
  const card = document.createElement('div');
  card.className = 'card project-card reveal';
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="chip-row">${project.stack.map(t => `<span class="chip">${t}</span>`).join('')}</div>
    <button class="project-more" data-idx="${idx}">View details →</button>
  `;
  projectsGrid.appendChild(card);
});

/* ====================== RENDER: BLOG ====================== */
const blogGrid = document.getElementById('blogGrid');
blogPosts.forEach(post => {
  const card = document.createElement('div');
  card.className = 'card blog-card reveal';
  card.innerHTML = `
    <span class="meta">${post.meta}</span>
    <h3>${post.title}</h3>
    <p>${post.desc}</p>
    <span class="read">Full post coming soon →</span>
  `;
  blogGrid.appendChild(card);
});

/* ====================== PROJECT MODAL ====================== */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalChallenge = document.getElementById('modalChallenge');
const modalApproach = document.getElementById('modalApproach');
const modalStack = document.getElementById('modalStack');

document.querySelectorAll('.project-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = projects[btn.dataset.idx];
    modalTitle.textContent = p.title;
    modalChallenge.textContent = p.challenge;
    modalApproach.textContent = p.approach;
    modalStack.innerHTML = p.stack.map(t => `<span class="chip">${t}</span>`).join('');
    modalOverlay.classList.add('is-open');
  });
});
document.getElementById('modalClose').addEventListener('click', () => modalOverlay.classList.remove('is-open'));
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) modalOverlay.classList.remove('is-open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modalOverlay.classList.remove('is-open'); });

/* ====================== TERMINAL TYPE EFFECT ====================== */
const terminalLines = [
  { cmd: "whoami", out: "David Nyongesa" },
  { cmd: "cat role.txt", out: "Full-Stack Software Engineer" },
  { cmd: "echo $FOCUS", out: "scalable systems · AI integration" }
];
const terminalBody = document.getElementById('terminalBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeTerminal(){
  if (reduceMotion){
    terminalBody.innerHTML = terminalLines.map(l =>
      `<div class="line"><span class="prompt">$</span> ${l.cmd}</div><div class="line out">${l.out}</div>`
    ).join('');
    return;
  }
  let li = 0;
  function nextLine(){
    if (li >= terminalLines.length) return;
    const { cmd, out } = terminalLines[li];
    const cmdLine = document.createElement('div');
    cmdLine.className = 'line';
    cmdLine.innerHTML = `<span class="prompt">$</span> <span class="typed"></span><span class="cursor"></span>`;
    terminalBody.appendChild(cmdLine);
    const typedSpan = cmdLine.querySelector('.typed');
    let ci = 0;
    const typer = setInterval(() => {
      typedSpan.textContent += cmd[ci];
      ci++;
      if (ci >= cmd.length){
        clearInterval(typer);
        cmdLine.querySelector('.cursor').remove();
        const outLine = document.createElement('div');
        outLine.className = 'line out';
        outLine.textContent = out;
        terminalBody.appendChild(outLine);
        li++;
        setTimeout(nextLine, 380);
      }
    }, 38);
  }
  nextLine();
}
typeTerminal();

/* ====================== GITHUB STATS (live, public API) ====================== */
// Replace with your real GitHub username to make this live.
const GITHUB_USERNAME = "yourusername";
async function loadGithubStats(){
  const wrap = document.getElementById('ghStats');
  const note = document.getElementById('ghNote');
  try{
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    wrap.innerHTML = `
      <div class="gh-stat"><div class="num">${data.public_repos ?? '—'}</div><div class="label">public repos</div></div>
      <div class="gh-stat"><div class="num">${data.followers ?? '—'}</div><div class="label">followers</div></div>
      <div class="gh-stat"><div class="num">${data.following ?? '—'}</div><div class="label">following</div></div>
    `;
    note.textContent = `Live from github.com/${GITHUB_USERNAME}`;
  }catch(err){
    note.textContent = `Couldn't reach the GitHub API right now — set GITHUB_USERNAME in the script and check your connection.`;
  }
}
loadGithubStats();

/* ====================== THEME TOGGLE (in-memory, no storage) ====================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let currentTheme = 'dark';
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeIcon.innerHTML = currentTheme === 'dark'
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>'
    : '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>';
});

/* ====================== MOBILE NAV ====================== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('is-open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('is-open')));

/* ====================== SCROLL REVEAL ====================== */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* ====================== CONTACT FORM -> MAILTO ====================== */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const message = document.getElementById('cf-message').value;
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:davymnyongesa@gmail.com?subject=${subject}&body=${body}`;
});

/* ====================== CHATBOT ====================== */
const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

function addMsg(text, who){
  const msg = document.createElement('div');
  msg.className = `msg ${who}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

let chatStarted = false;
chatFab.addEventListener('click', () => {
  chatPanel.classList.toggle('is-open');
  if (!chatStarted){
    addMsg("Hi! I'm a simple, rule-based assistant for this site. Ask me about projects, skills, or how to get in touch.", 'bot');
    chatStarted = true;
  }
});
chatClose.addEventListener('click', () => chatPanel.classList.remove('is-open'));

function botReply(input){
  const q = input.toLowerCase();
  if (q.includes('project')) return "David's featured work includes the Developer Skill Radar, Tenant Intelligence Platform, AI Meeting Intelligence, and a Crisis Response Platform — scroll to the Projects section for details.";
  if (q.includes('skill') || q.includes('stack') || q.includes('tech')) return "Frontend: React, Next.js, TypeScript. Backend: Node.js, NestJS, Express. Plus PostgreSQL, Redis, Docker, and CI/CD.";
  if (q.includes('contact') || q.includes('email') || q.includes('hire')) return "Best way to reach David: davymnyongesa@gmail.com, or use the contact form lower on this page.";
  if (q.includes('resume') || q.includes('cv')) return "There's a résumé download icon in the top navigation bar.";
  if (q.includes('github')) return "GitHub activity is shown live in the GitHub section of this page.";
  return "I'm a simple assistant — try asking about projects, skills, or how to get in touch.";
}

function sendChat(){
  const val = chatInput.value.trim();
  if (!val) return;
  addMsg(val, 'user');
  chatInput.value = '';
  setTimeout(() => addMsg(botReply(val), 'bot'), 300);
}
chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

/* ====================== FOOTER YEAR ====================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ====================== ANALYTICS (placeholder) ======================
   No tracking is wired up by default. If you add an analytics provider
   (Plausible, Vercel Analytics, GA4, etc.), drop its script tag in <head>
   and/or call a trackPageView()-style function here on load.
======================================================================= */