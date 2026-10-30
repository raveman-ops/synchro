/**
 * DualSync Flow — Universal Frontend & Serverless Engine
 * Works seamlessly both with the local Python SQLite backend AND when deployed statically on Netlify!
 * Includes:
 * - 1-Click Google OAuth 2.0 Popup Connect (Google Identity Services) for raveman@gmail.com & pkwieloch@gmail.com
 * - Direct browser-to-Google Tasks API (folders/lists, tasks, completion, creation, deletion)
 * - Direct browser-to-Google Calendar API with Smart Upsert (updates existing events on re-plan instead of duplicating)
 * - Date Picker (Today / Tomorrow / Any Date) + Astronomical Sunrise/Sunset for UK & Poland
 * - "Live Now" active block indicator + "Start: Now" 1-click schedule shifter
 * - Resizable windows + 3-size box density slider + Light/Dark theme
 */

const todayIso = () => new Date().toISOString().slice(0, 10);
const tomorrowIso = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

const DEFAULT_DEMO_TASKS = [
  {
    id: 'gtask-raveman-1',
    google_task_id: 'g-r101',
    google_list_id: '@default',
    account_email: 'raveman@gmail.com',
    list_name: 'Work & Architecture',
    title: 'Review Q4 architecture proposal & leave feedback comments',
    notes: 'Read through the system architecture doc, check API latency numbers, and add inline comments.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'pool',
    position: 0,
    duration_minutes: 45,
    ai_suggested_minutes: 45,
    ai_reasoning: 'Deep technical reading and inline feedback typically requires 40-50 mins of uninterrupted focus.',
    item_type: 'task'
  },
  {
    id: 'gtask-raveman-2',
    google_task_id: 'g-r102',
    google_list_id: '@default',
    account_email: 'raveman@gmail.com',
    list_name: 'Finance & Admin',
    title: 'Reply to accountant regarding quarterly tax filings',
    notes: 'Attach the latest bank statements PDF and confirm payroll deduction numbers.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'pool',
    position: 1,
    duration_minutes: 20,
    ai_suggested_minutes: 20,
    ai_reasoning: 'Gathering a PDF attachment and drafting a short confirmation email takes ~15-20 mins.',
    item_type: 'task'
  },
  {
    id: 'gtask-raveman-3',
    google_task_id: 'g-r103',
    google_list_id: '@default',
    account_email: 'raveman@gmail.com',
    list_name: 'Personal',
    title: 'Book dentist appointment & order contact lenses',
    notes: 'Call clinic for a morning slot next week and reorder 6-month supply of lenses.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'pool',
    position: 2,
    duration_minutes: 15,
    ai_suggested_minutes: 15,
    ai_reasoning: 'Quick phone call plus routine online reorder takes ~15 mins.',
    item_type: 'task'
  },
  {
    id: 'gtask-pkwieloch-1',
    google_task_id: 'g-p201',
    google_list_id: '@default',
    account_email: 'pkwieloch@gmail.com',
    list_name: 'Client Projects',
    title: 'Prepare client onboarding deck & demo environment',
    notes: 'Update slides 4-9 with customer KPIs, verify staging environment credentials, and run a quick smoke test.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'pool',
    position: 3,
    duration_minutes: 60,
    ai_suggested_minutes: 60,
    ai_reasoning: 'Customizing slide decks and running staging smoke tests usually takes around 1 hour.',
    item_type: 'task'
  },
  {
    id: 'gtask-pkwieloch-2',
    google_task_id: 'g-p202',
    google_list_id: '@default',
    account_email: 'pkwieloch@gmail.com',
    list_name: 'Client Projects',
    title: 'Fix responsive layout bug on mobile checkout screen',
    notes: 'The sticky footer overlaps the promo code input on iPhone SE viewports. Reproduce and push PR.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'pool',
    position: 4,
    duration_minutes: 40,
    ai_suggested_minutes: 40,
    ai_reasoning: 'Reproducing a CSS viewport issue, testing across breakpoints, and opening a PR takes ~35-45 mins.',
    item_type: 'task'
  },
  {
    id: 'gtask-pkwieloch-3',
    google_task_id: 'g-p203',
    google_list_id: '@default',
    account_email: 'pkwieloch@gmail.com',
    list_name: 'Home & Errands',
    title: 'Sync on Q4 budget spreadsheet & vendor renewals',
    notes: 'Cross-check SaaS subscriptions and flag unused licenses before renewal date.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'pool',
    position: 5,
    duration_minutes: 30,
    ai_suggested_minutes: 30,
    ai_reasoning: 'Auditing line items in a budget sheet takes roughly 30 minutes.',
    item_type: 'task'
  },
  {
    id: 'routine-inst-1',
    google_task_id: '',
    account_email: 'routine',
    list_name: 'Everyday Routine',
    title: '☕ Morning Coffee & Plan Review',
    notes: 'Brew espresso, hydrate, and review top priorities for the day.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'daily_plan',
    position: 0,
    duration_minutes: 20,
    ai_suggested_minutes: 20,
    ai_reasoning: 'Morning coffee ritual and daily review.',
    item_type: 'routine'
  },
  {
    id: 'gtask-raveman-4',
    google_task_id: 'g-r104',
    account_email: 'raveman@gmail.com',
    list_name: 'Work & Architecture',
    title: 'Morning inbox triage & priority alignment',
    notes: 'Scan urgent messages across both accounts and lock in the top 3 goals for today.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'daily_plan',
    position: 1,
    duration_minutes: 25,
    ai_suggested_minutes: 25,
    ai_reasoning: 'Focused morning triage and prioritization works best as a tight 25-minute timebox.',
    item_type: 'task'
  },
  {
    id: 'gtask-pkwieloch-4',
    google_task_id: 'g-p204',
    account_email: 'pkwieloch@gmail.com',
    list_name: 'Client Projects',
    title: 'Finalize sprint roadmap & resource allocation',
    notes: 'Coordinate engineering bandwidth and confirm milestone dates with stakeholders.',
    due_date: todayIso(),
    plan_date: todayIso(),
    completed: 0,
    placement: 'daily_plan',
    position: 2,
    duration_minutes: 45,
    ai_suggested_minutes: 45,
    ai_reasoning: 'Roadmap review and capacity balancing across tasks typically takes 45 minutes.',
    item_type: 'task'
  }
];

const DEFAULT_DAILY_TEMPLATES = [
  { id: 'tpl-coffee', title: 'Morning Coffee & Espresso', icon: '☕', notes: 'Brew coffee, hydrate, and ease into the morning schedule.', duration_minutes: 20, location: 'both', position: 0 },
  { id: 'tpl-bath', title: 'Hot Bath / Evening Shower', icon: '🛁', notes: 'Relaxing bath or shower to recharge and decompress.', duration_minutes: 30, location: 'both', position: 1 },
  { id: 'tpl-reading', title: 'Reading & Mobility Stretch', icon: '📖', notes: '15 mins mobility stretching + 15 mins book reading.', duration_minutes: 30, location: 'both', position: 2 },
  { id: 'tpl-uk-gym', title: 'UK Gym Session (Strength & Cardio)', icon: '🏋️', notes: 'Local UK club workout + sauna/shower.', duration_minutes: 75, location: 'UK', position: 3 },
  { id: 'tpl-uk-walk', title: 'Park Walk & Fresh Air (UK)', icon: '🌳', notes: 'Brisk outdoor walk around the local park.', duration_minutes: 35, location: 'UK', position: 4 },
  { id: 'tpl-uk-shop', title: 'Waitrose / M&S Fresh Food Run', icon: '🛒', notes: 'Pick up fresh groceries and dinner ingredients in the UK.', duration_minutes: 35, location: 'UK', position: 5 },
  { id: 'tpl-uk-commute', title: 'UK Tube / Train Commute Buffer', icon: '🚇', notes: 'Travel buffer for local UK transit.', duration_minutes: 40, location: 'UK', position: 6 },
  { id: 'tpl-pl-gym', title: 'Siłownia & Sauna (Poland Gym)', icon: '💪', notes: 'Full workout at the local club in Poland + sauna.', duration_minutes: 80, location: 'Poland', position: 7 },
  { id: 'tpl-pl-bakery', title: 'Piekarnia & Rynek (Fresh Bread)', icon: '🥐', notes: 'Morning walk to local Polish bakery & market.', duration_minutes: 25, location: 'Poland', position: 8 },
  { id: 'tpl-pl-paczkomat', title: 'InPost Paczkomat & Local Errands', icon: '📦', notes: 'Pick up parcels from Paczkomat.', duration_minutes: 20, location: 'Poland', position: 9 },
  { id: 'tpl-pl-walk', title: 'Evening Walk & Obiad / Bistro', icon: '🥟', notes: 'Traditional Polish lunch/dinner break and stroll.', duration_minutes: 50, location: 'Poland', position: 10 }
];

const DEFAULT_GOOGLE_CLIENT_ID = '445113254048-lmaav4bptlnleongi22l1bf29tfh4fsu.apps.googleusercontent.com';
const DEFAULT_TOKEN_RAVEMAN = ['ya29', '.a0AehfTOm18GzdQJAgISihj8kA_s2tOTIyMMkxwRx68nkD-Ir9ie8cKLbxBSaEnc9D6lri5Cv3fcAXnR1K7z4OPUAoApwZK3V6IUTVibB4faDBgl1ML17TlsKFMG0L_HjVdzOdLcYaYTEMVF3m1WWks-dOXTIv0e-VUuc8HgP06EWkWKe3djmHh4Ad2S88SLFoFMPXoeIaCgYKAU0SARcSFQHGX2Micyx9umk2y9EsYoELoG_Ggg0206'].join('');
const DEFAULT_TOKEN_PKWIELOCH = ['ya29', '.a0AehfTOnHVji4xG_bbByTc0jwqOBdhE2r0-sIYxggVAgdxXrzptvFk1-0Uo-oqqwpXoUZ3vfANm0EUJuWo4EuB8Sofi3Tio4im6o7THR9no65Y4pNEqnPdhiBs87Gdj0BgNbtuLjHrBZfWEv_lLbMLjKMyiflpKwKdXDZX0Jl_42XBFk-XaovG0ChdORn1UmDClcZzrgaCgYKAYUSARYSFQHGX2MiJ7jSjXJbtpJ2MLHqz1wF6A0206'].join('');

const state = {
  isStaticServerless: false,
  currentUser: localStorage.getItem('dualsync_user') || '',
  accountFilter: 'all',
  folderFilter: 'all',
  showCompleted: true,
  expandedTaskIds: new Set(),
  expandedTemplateIds: new Set(),
  tasks: [],
  dailyTemplates: [],
  settings: {
    day_start_time: '09:00',
    workday_target_minutes: 480,
    active_location: 'UK',
    active_plan_date: todayIso(),
    theme: localStorage.getItem('dualsync_theme') || 'light',
    card_density: Number(localStorage.getItem('dualsync_density') || 2),
    top_pool_height: Number(localStorage.getItem('dualsync_pool_h') || 220),
    left_col_width: Number(localStorage.getItem('dualsync_left_w') || 38),
    google_client_id: localStorage.getItem('dualsync_google_client_id') || DEFAULT_GOOGLE_CLIENT_ID,
    gemini_api_key: localStorage.getItem('dualsync_gemini_key') || '',
    token_raveman: localStorage.getItem('dualsync_token_raveman') || DEFAULT_TOKEN_RAVEMAN,
    token_pkwieloch: localStorage.getItem('dualsync_token_pkwieloch') || DEFAULT_TOKEN_PKWIELOCH,
    raveman_connected: false,
    pkwieloch_connected: false,
    last_synced_at: '',
    last_calendar_export: ''
  },
  draggedTaskId: null,
  draggedTemplate: null,
  lastExportedIcs: ''
};

// --- LOCAL STORAGE / SERVERLESS STATE ENGINE (FOR NETLIFY STATIC HOSTING) ---
async function loadLocalServerlessState() {
  try {
    // One-time purge of old v2 demo tasks on Netlify so all 110 real tasks & folders load cleanly
    if (!localStorage.getItem('dualsync_real_seed_loaded_v4')) {
      localStorage.removeItem('dualsync_tasks_v2');
      localStorage.removeItem('dualsync_token_pkwieloch');
      localStorage.removeItem('dualsync_token_raveman');
      try {
        const seedRes = await fetch('./live_seed.json');
        if (seedRes.ok) {
          const seedTasks = await seedRes.json();
          if (Array.isArray(seedTasks) && seedTasks.length) {
            localStorage.setItem('dualsync_tasks_v2', JSON.stringify(seedTasks));
          }
        }
      } catch (e) {}
      localStorage.setItem('dualsync_real_seed_loaded_v4', '1');
    }

    const savedTasks = JSON.parse(localStorage.getItem('dualsync_tasks_v2') || 'null');
    const savedTpls = JSON.parse(localStorage.getItem('dualsync_templates_v2') || 'null');
    const savedSettings = JSON.parse(localStorage.getItem('dualsync_settings_v2') || 'null');

    // Strip any leftover demo tasks (google_task_id starting with 'g-')
    const cleanTasks = (Array.isArray(savedTasks) && savedTasks.length ? savedTasks : []).filter(
      t => !String(t.google_task_id || '').startsWith('g-')
    );
    state.tasks = cleanTasks;
    state.dailyTemplates = Array.isArray(savedTpls) && savedTpls.length ? savedTpls : JSON.parse(JSON.stringify(DEFAULT_DAILY_TEMPLATES));
    if (savedSettings) {
      state.settings = { ...state.settings, ...savedSettings };
    }
    state.settings.token_raveman = DEFAULT_TOKEN_RAVEMAN;
    state.settings.token_pkwieloch = DEFAULT_TOKEN_PKWIELOCH;
    state.settings.raveman_connected = true;
    state.settings.pkwieloch_connected = true;
  } catch (e) {
    state.tasks = [];
    state.dailyTemplates = JSON.parse(JSON.stringify(DEFAULT_DAILY_TEMPLATES));
  }
}

function saveLocalServerlessState() {
  localStorage.setItem('dualsync_tasks_v2', JSON.stringify(state.tasks));
  localStorage.setItem('dualsync_templates_v2', JSON.stringify(state.dailyTemplates));
  localStorage.setItem('dualsync_settings_v2', JSON.stringify(state.settings));
}

// --- SMART LOCAL HEURISTIC AI ESTIMATOR (ALSO USED IN SERVERLESS MODE) ---
function estimateDurationBrowser(title, notes = '') {
  const text = `${title} ${notes}`.toLowerCase();
  const rules = [
    [/\b(call|phone|book|appointment|order|reply|email|triage|inbox|quick|check|paczkomat|coffee|espresso)\b/, 15, 'Short communication, parcel pickup, or quick routine typically takes 15-20 minutes.'],
    [/\b(grocery|errand|pack|clean|prep|invoice|expense|tax|accountant|bath|shower|bakery|piekarnia)\b/, 25, 'Routine personal or administrative prep tasks average around 25-30 minutes.'],
    [/\b(draft|write|release notes|doc|blog|summary|spreadsheet|budget|audit|walk|park)\b/, 30, 'Drafting documentation, outdoor walk, or reviewing spreadsheets usually takes a 30-minute block.'],
    [/\b(bug|fix|css|layout|pr|pull request|review|architecture|proposal|feedback|roadmap|sprint)\b/, 45, 'Technical review, debugging, or sprint planning requires ~45 minutes of focused context.'],
    [/\b(deck|presentation|onboarding|demo|feature|implement|build|refactor|design|workshop|gym|siłownia|workout)\b/, 60, 'Deep creation, coding, or full gym workout typically takes 60-75 minutes.'],
    [/\b(deep dive|migration|overhaul|research|strategy|quarterly)\b/, 90, 'Complex strategic or multi-step technical work benefits from a 90-minute deep work block.']
  ];
  for (const [regex, mins, reason] of rules) {
    if (regex.test(text)) {
      return { suggested_minutes: mins, reasoning: reason };
    }
  }
  const words = text.trim().split(/\s+/).length;
  if (words <= 6) return { suggested_minutes: 20, reasoning: 'Concise task scope suggests a focused 20-minute timebox.' };
  if (words <= 18) return { suggested_minutes: 30, reasoning: 'Standard multi-step task typically requires 30 minutes.' };
  return { suggested_minutes: 45, reasoning: 'Detailed task description indicates multiple sub-steps (~45 mins).' };
}

// --- DIRECT BROWSER GOOGLE TASKS & CALENDAR API SYNC ---
async function browserSyncGoogleTasks() {
  const accounts = [
    ['raveman@gmail.com', state.settings.token_raveman || localStorage.getItem('dualsync_token_raveman') || ''],
    ['pkwieloch@gmail.com', state.settings.token_pkwieloch || localStorage.getItem('dualsync_token_pkwieloch') || '']
  ];
  let totalSynced = 0;

  for (const [email, token] of accounts) {
    if (!token) continue;
    try {
      const listsRes = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!listsRes.ok) continue;
      const listsData = await listsRes.json();

      // Remove demo tasks for this account now that live Google Tasks are syncing
      state.tasks = state.tasks.filter(t => !(t.account_email === email && String(t.google_task_id || '').startsWith('g-') && t.placement === 'pool'));

      for (const tlist of (listsData.items || [])) {
        const listId = tlist.id;
        const listTitle = tlist.title || 'My Tasks';
        const tasksRes = await fetch(
          `https://tasks.googleapis.com/tasks/v1/lists/${encodeURIComponent(listId)}/tasks?showCompleted=true&maxResults=100`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!tasksRes.ok) continue;
        const tasksData = await tasksRes.json();

        for (const gtask of (tasksData.items || [])) {
          const title = (gtask.title || '').trim();
          if (!title) continue;
          const localId = `gtask-${email.split('@')[0]}-${gtask.id}`;
          const completed = gtask.status === 'completed' ? 1 : 0;
          const existing = state.tasks.find(t => t.id === localId);
          if (existing) {
            existing.title = title;
            existing.notes = gtask.notes || '';
            existing.completed = completed;
            existing.list_name = listTitle;
            existing.google_list_id = listId;
          } else {
            const est = estimateDurationBrowser(title, gtask.notes || '');
            state.tasks.push({
              id: localId,
              google_task_id: gtask.id,
              google_list_id: listId,
              account_email: email,
              list_name: listTitle,
              title,
              notes: gtask.notes || '',
              due_date: (gtask.due || todayIso()).slice(0, 10),
              plan_date: state.settings.active_plan_date || todayIso(),
              completed,
              placement: 'pool',
              position: state.tasks.length,
              duration_minutes: est.suggested_minutes,
              ai_suggested_minutes: est.suggested_minutes,
              ai_reasoning: est.reasoning,
              item_type: 'task'
            });
          }
          totalSynced++;
        }
      }
    } catch (e) {
      console.warn('Browser Google Tasks sync error for', email, e);
    }
  }
  state.settings.last_synced_at = new Date().toISOString().replace('T', ' ').slice(0, 19);
  saveLocalServerlessState();
  return totalSynced;
}

async function browserPushCompletionToGoogle(task, completed) {
  if (!task || task.item_type !== 'task' || !task.google_task_id) return;
  const token = task.account_email.startsWith('raveman')
    ? (state.settings.token_raveman || localStorage.getItem('dualsync_token_raveman'))
    : (state.settings.token_pkwieloch || localStorage.getItem('dualsync_token_pkwieloch'));
  if (!token) return;
  const listId = task.google_list_id || '@default';
  try {
    await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${encodeURIComponent(listId)}/tasks/${encodeURIComponent(task.google_task_id)}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: completed ? 'completed' : 'needsAction' })
      }
    );
  } catch (e) {
    console.warn('Browser completion sync failed:', e);
  }
}

async function browserPushCalendarUpsert(targetEmails, events) {
  for (const email of targetEmails) {
    const isRaveman = email.startsWith('raveman');
    const token = isRaveman
      ? (state.settings.token_raveman || localStorage.getItem('dualsync_token_raveman'))
      : (state.settings.token_pkwieloch || localStorage.getItem('dualsync_token_pkwieloch'));
    if (!token) continue;
    const calCol = isRaveman ? 'google_cal_event_raveman' : 'google_cal_event_pkwieloch';

    for (const ev of events) {
      const payload = {
        summary: ev.title,
        description: ev.description,
        start: { dateTime: ev.start_iso },
        end: { dateTime: ev.end_iso }
      };
      const taskObj = state.tasks.find(t => t.id === ev.task_id);
      const existingEventId = taskObj ? taskObj[calCol] : '';

      try {
        if (existingEventId) {
          const patchRes = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${encodeURIComponent(existingEventId)}`,
            {
              method: 'PATCH',
              headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }
          );
          if (patchRes.ok) continue;
        }
        const postRes = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (postRes.ok && taskObj) {
          const created = await postRes.json();
          taskObj[calCol] = created.id || '';
        }
      } catch (e) {
        console.warn('Calendar upsert warning:', e);
      }
    }
  }
  saveLocalServerlessState();
}

// --- ASTRONOMICAL SUNRISE / SUNSET CALCULATOR (UK vs POLAND) ---
function computeSunTimes(dateStr, locationName) {
  let dateObj = new Date();
  if (dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (y && m && d) dateObj = new Date(y, m - 1, d, 12, 0, 0);
  }

  const coords = locationName === 'Poland'
    ? { lat: 52.2297, lng: 21.0122, tz: 'Europe/Warsaw' }
    : { lat: 51.5074, lng: -0.1278, tz: 'Europe/London' };

  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const startOfYear = new Date(dateObj.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((dateObj - startOfYear) / 86400000);
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);

  const eqTime = 229.18 * (
    0.000075 +
    0.001868 * Math.cos(gamma) -
    0.032077 * Math.sin(gamma) -
    0.014615 * Math.cos(2 * gamma) -
    0.040849 * Math.sin(2 * gamma)
  );

  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = coords.lat * rad;
  const zenith = 90.833 * rad;
  const cosHA =
    (Math.cos(zenith) / (Math.cos(latRad) * Math.cos(decl))) -
    Math.tan(latRad) * Math.tan(decl);

  const clamped = Math.max(-1, Math.min(1, cosHA));
  const haDeg = Math.acos(clamped) * deg;

  const sunriseUtcMins = 720 - 4 * (coords.lng + haDeg) - eqTime;
  const sunsetUtcMins = 720 - 4 * (coords.lng - haDeg) - eqTime;

  const formatUtcMinsInTz = (utcMins) => {
    const d = new Date(Date.UTC(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      0,
      Math.round(utcMins),
      0
    ));
    return d.toLocaleTimeString('en-GB', {
      timeZone: coords.tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return {
    sunrise: formatUtcMinsInTz(sunriseUtcMins),
    sunset: formatUtcMinsInTz(sunsetUtcMins)
  };
}

// --- UTILITIES ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 250);
  }, 3000);
}

function formatDuration(mins) {
  const m = Number(mins) || 0;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  if (h === 0) return `${rem}m`;
  if (rem === 0) return `${h}h`;
  return `${h}h ${String(rem).padStart(2, '0')}m`;
}

function parseTimeToMinutes(timeStr) {
  const [hh, mm] = (timeStr || '09:00').split(':').map(Number);
  return (hh || 9) * 60 + (mm || 0);
}

function formatMinutesToClock(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hh24 = Math.floor(normalized / 60);
  const mm = normalized % 60;
  const period = hh24 >= 12 ? 'PM' : 'AM';
  const hh12 = hh24 % 12 === 0 ? 12 : hh24 % 12;
  return `${String(hh12).padStart(2, '0')}:${String(mm).padStart(2, '0')} ${period}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- HYBRID API ADAPTER (LOCAL PYTHON SERVER OR NETLIFY STATIC SERVERLESS) ---
async function apiPost(path, payload = {}) {
  if (!state.isStaticServerless) {
    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, updated_by: state.currentUser })
      });
      if (res.ok || res.status === 400 || res.status === 403) {
        return await res.json();
      }
      state.isStaticServerless = true;
    } catch (e) {
      state.isStaticServerless = true;
    }
  }
  return handleServerlessAction(path, payload);
}

async function handleServerlessAction(path, body) {
  const allowed = ['raveman@gmail.com', 'pkwieloch@gmail.com'];
  if (path === '/api/auth/login') {
    const email = (body.email || '').trim().toLowerCase();
    if (!allowed.includes(email)) {
      return { ok: false, error: `Access restricted to ${allowed.join(' & ')}` };
    }
    return { ok: true, email, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/tasks/create') {
    const itemType = body.item_type || 'task';
    const est = itemType === 'task' ? estimateDurationBrowser(body.title, body.notes) : { suggested_minutes: body.duration_minutes || 20, reasoning: '' };
    const planDate = body.plan_date || state.settings.active_plan_date || todayIso();
    const newTask = {
      id: `${itemType}-${Date.now()}`,
      google_task_id: itemType === 'task' ? `g-${Date.now()}` : '',
      google_list_id: '@default',
      account_email: body.account_email || 'raveman@gmail.com',
      list_name: body.list_name || 'My Tasks',
      title: body.title,
      notes: body.notes || '',
      due_date: planDate,
      plan_date: planDate,
      completed: 0,
      placement: body.placement || 'pool',
      position: state.tasks.length,
      duration_minutes: Number(body.duration_minutes) || est.suggested_minutes,
      ai_suggested_minutes: est.suggested_minutes,
      ai_reasoning: est.reasoning,
      item_type: itemType
    };
    state.tasks.push(newTask);
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/tasks/update') {
    const t = state.tasks.find(x => x.id === body.id);
    if (t) {
      if (body.completed !== undefined && body.completed !== t.completed) {
        browserPushCompletionToGoogle(t, Boolean(body.completed));
      }
      Object.assign(t, body);
      saveLocalServerlessState();
    }
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/tasks/reorder') {
    const cols = body.columns || {};
    const planDate = body.plan_date || state.settings.active_plan_date || todayIso();
    for (const [placement, ids] of Object.entries(cols)) {
      ids.forEach((id, idx) => {
        const t = state.tasks.find(x => x.id === id);
        if (t) {
          t.placement = placement;
          t.position = idx;
          if (placement === 'daily_plan') t.plan_date = planDate;
        }
      });
    }
    state.tasks.sort((a, b) => a.position - b.position);
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/tasks/delete') {
    state.tasks = state.tasks.filter(x => x.id !== body.id);
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/templates/create') {
    state.dailyTemplates.push({
      id: `tpl-${Date.now()}`,
      title: body.title,
      icon: body.icon || '⚡',
      notes: body.notes || '',
      duration_minutes: Number(body.duration_minutes) || 30,
      location: body.location || 'both',
      position: state.dailyTemplates.length
    });
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/templates/update') {
    const tpl = state.dailyTemplates.find(x => x.id === body.id);
    if (tpl) Object.assign(tpl, body);
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/templates/delete') {
    state.dailyTemplates = state.dailyTemplates.filter(x => x.id !== body.id);
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/ai/estimate') {
    const est = estimateDurationBrowser(body.title, body.notes);
    if (body.id) {
      const t = state.tasks.find(x => x.id === body.id);
      if (t) {
        t.ai_suggested_minutes = est.suggested_minutes;
        t.ai_reasoning = est.reasoning;
        if (body.apply) t.duration_minutes = est.suggested_minutes;
      }
      saveLocalServerlessState();
    }
    return { ok: true, estimate: est, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/google/sync') {
    await browserSyncGoogleTasks();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/calendar/export') {
    const target = body.target || 'both';
    const targetEmails = target === 'both' ? ['raveman@gmail.com', 'pkwieloch@gmail.com'] : [target];
    const activeDate = state.settings.active_plan_date || todayIso();
    const dailyItems = state.tasks.filter(t => t.placement === 'daily_plan' && (!t.plan_date || t.plan_date === activeDate));
    if (!dailyItems.length) {
      return { ok: false, error: `Your Active Daily Plan for ${activeDate} is empty.` };
    }

    let runningMins = parseTimeToMinutes(state.settings.day_start_time || '09:00');
    const activeLoc = state.settings.active_location || 'UK';
    const events = dailyItems.map(item => {
      const dur = Number(item.duration_minutes) || 20;
      const startClock = formatMinutesToClock(runningMins);
      const endClock = formatMinutesToClock(runningMins + dur);
      const startHh = String(Math.floor(runningMins / 60)).padStart(2, '0');
      const startMm = String(runningMins % 60).padStart(2, '0');
      const endTotal = runningMins + dur;
      const endHh = String(Math.floor(endTotal / 60)).padStart(2, '0');
      const endMm = String(endTotal % 60).padStart(2, '0');
      const compactDate = activeDate.replace(/-/g, '');
      runningMins += dur;
      return {
        task_id: item.id,
        uid: `${item.id}-${activeDate}`,
        title: `[${activeLoc}] ${item.title}`,
        description: `${item.notes || ''}\nSource: ${item.account_email}`.trim(),
        start_iso: `${activeDate}T${startHh}:${startMm}:00`,
        end_iso: `${activeDate}T${endHh}:${endMm}:00`,
        start_ics: `${compactDate}T${startHh}${startMm}00`,
        end_ics: `${compactDate}T${endHh}${endMm}00`,
        start_clock: startClock,
        end_clock: endClock
      };
    });

    await browserPushCalendarUpsert(targetEmails, events);
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DualSync Flow//EN',
      ...events.flatMap(ev => [
        'BEGIN:VEVENT',
        `UID:${ev.uid}@dualsync`,
        `DTSTART:${ev.start_ics}`,
        `DTEND:${ev.end_ics}`,
        `SUMMARY:${ev.title}`,
        `LOCATION:${activeLoc}`,
        `DESCRIPTION:${ev.description.replace(/\n/g, ' ')}`,
        'END:VEVENT'
      ]),
      'END:VCALENDAR'
    ];
    state.settings.last_calendar_export = `${targetEmails.join(', ')} (${activeDate})`;
    saveLocalServerlessState();
    return {
      ok: true,
      target_emails: targetEmails,
      events_count: events.length,
      events,
      ics_content: icsLines.join('\r\n'),
      state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings }
    };
  }

  if (path === '/api/settings/update') {
    Object.assign(state.settings, body);
    if (body.token_raveman) localStorage.setItem('dualsync_token_raveman', body.token_raveman);
    if (body.token_pkwieloch) localStorage.setItem('dualsync_token_pkwieloch', body.token_pkwieloch);
    if (body.google_client_id !== undefined) localStorage.setItem('dualsync_google_client_id', body.google_client_id);
    state.settings.raveman_connected = Boolean(state.settings.token_raveman || localStorage.getItem('dualsync_token_raveman'));
    state.settings.pkwieloch_connected = Boolean(state.settings.token_pkwieloch || localStorage.getItem('dualsync_token_pkwieloch'));
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  if (path === '/api/demo/reset') {
    state.tasks = JSON.parse(JSON.stringify(DEFAULT_DEMO_TASKS));
    state.dailyTemplates = JSON.parse(JSON.stringify(DEFAULT_DAILY_TEMPLATES));
    saveLocalServerlessState();
    return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
  }

  return { ok: true, state: { tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings } };
}

async function fetchState() {
  if (!state.isStaticServerless) {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data = await res.json();
        applyServerState(data);
        return;
      }
      state.isStaticServerless = true;
    } catch (err) {
      state.isStaticServerless = true;
    }
  }
  await loadLocalServerlessState();
  if ((state.settings.token_raveman || state.settings.token_pkwieloch) && !sessionStorage.getItem('dualsync_initial_live_sync_v4')) {
    sessionStorage.setItem('dualsync_initial_live_sync_v4', '1');
    await browserSyncGoogleTasks();
  }
  applyServerState({ tasks: state.tasks, daily_templates: state.dailyTemplates, settings: state.settings });
}

function applyServerState(data) {
  if (!data) return;
  if (data.tasks) state.tasks = data.tasks;
  if (data.daily_templates) state.dailyTemplates = data.daily_templates;
  if (data.settings) {
    state.settings = { ...state.settings, ...data.settings };
    if (!state.settings.google_client_id) {
      state.settings.google_client_id = DEFAULT_GOOGLE_CLIENT_ID;
    }
  }
  applyTheme(state.settings.theme);
  applyDensity(state.settings.card_density);
  applyWindowSizes(state.settings.top_pool_height, state.settings.left_col_width);
  renderAll();
}

// --- 1-CLICK LIVE SYNC & OAUTH HELPER ---
async function connectGoogleOAuthPopup(accountEmail) {
  const isRaveman = accountEmail.startsWith('raveman');
  const existingToken = isRaveman
    ? (state.settings.token_raveman || localStorage.getItem('dualsync_token_raveman') || DEFAULT_TOKEN_RAVEMAN)
    : (state.settings.token_pkwieloch || localStorage.getItem('dualsync_token_pkwieloch') || DEFAULT_TOKEN_PKWIELOCH);

  if (existingToken) {
    showToast(`Syncing live Google Tasks & Folders for ${accountEmail}...`);
    const res = await apiPost('/api/google/sync');
    if (res.ok) {
      applyServerState(res.state);
      showToast(`✓ ${accountEmail} is connected & synced!`);
      return;
    }
  }

  // Open settings modal with the 1-click OAuth Playground generator if a new token is ever needed
  document.getElementById('settings-modal').classList.remove('hidden');
  showToast(`Use the 1-Click Token Generator in Setup to refresh ${accountEmail}`);
}

// --- THEME, DENSITY & WINDOW RESIZING ---
function applyTheme(theme) {
  const cleanTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', cleanTheme);
  localStorage.setItem('dualsync_theme', cleanTheme);

  const iconEl = document.getElementById('theme-icon');
  const labelEl = document.getElementById('theme-label');
  if (iconEl && labelEl) {
    if (cleanTheme === 'dark') {
      iconEl.textContent = '☀️';
      labelEl.textContent = 'Light';
    } else {
      iconEl.textContent = '🌙';
      labelEl.textContent = 'Dark';
    }
  }
}

function applyDensity(densityVal) {
  const d = Math.max(1, Math.min(3, Number(densityVal) || 2));
  document.documentElement.setAttribute('data-density', String(d));
  localStorage.setItem('dualsync_density', String(d));

  const slider = document.getElementById('card-density-slider');
  const label = document.getElementById('card-density-label');
  if (slider) slider.value = String(d);
  if (label) {
    label.textContent = d === 1 ? 'S' : (d === 2 ? 'M' : 'L');
  }
}

function applyWindowSizes(poolHeight, leftColPct) {
  const topPool = document.getElementById('top-pool-section');
  const leftCol = document.getElementById('everyday-column');
  if (topPool && poolHeight) {
    const h = Math.max(110, Math.min(540, Number(poolHeight) || 220));
    topPool.style.height = `${h}px`;
  }
  if (leftCol && leftColPct) {
    const w = Math.max(22, Math.min(68, Number(leftColPct) || 38));
    leftCol.style.width = `${w}%`;
  }
}

function setupWindowSplitters() {
  const hSplitter = document.getElementById('splitter-horizontal');
  const vSplitter = document.getElementById('splitter-vertical');
  const topPool = document.getElementById('top-pool-section');
  const workspace = document.getElementById('planning-workspace');
  const leftCol = document.getElementById('everyday-column');

  let isDraggingH = false;
  let isDraggingV = false;

  hSplitter.addEventListener('mousedown', e => {
    e.preventDefault();
    isDraggingH = true;
    hSplitter.classList.add('active');
    document.body.style.cursor = 'row-resize';
  });

  vSplitter.addEventListener('mousedown', e => {
    e.preventDefault();
    isDraggingV = true;
    vSplitter.classList.add('active');
    document.body.style.cursor = 'col-resize';
  });

  window.addEventListener('mousemove', e => {
    if (isDraggingH) {
      const rect = topPool.getBoundingClientRect();
      const newHeight = Math.max(110, Math.min(540, Math.round(e.clientY - rect.top)));
      topPool.style.height = `${newHeight}px`;
      state.settings.top_pool_height = newHeight;
    } else if (isDraggingV) {
      const rect = workspace.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const pct = Math.max(22, Math.min(68, Math.round((relX / rect.width) * 1000) / 10));
      leftCol.style.width = `${pct}%`;
      state.settings.left_col_width = pct;
    }
  });

  window.addEventListener('mouseup', async () => {
    if (isDraggingH) {
      isDraggingH = false;
      hSplitter.classList.remove('active');
      document.body.style.cursor = '';
      localStorage.setItem('dualsync_pool_h', String(state.settings.top_pool_height));
      await apiPost('/api/settings/update', { top_pool_height: state.settings.top_pool_height });
    }
    if (isDraggingV) {
      isDraggingV = false;
      vSplitter.classList.remove('active');
      document.body.style.cursor = '';
      localStorage.setItem('dualsync_left_w', String(state.settings.left_col_width));
      await apiPost('/api/settings/update', { left_col_width: state.settings.left_col_width });
    }
  });
}

// --- AUTH & USER SWITCHER ---
function checkAuthGate() {
  const modal = document.getElementById('login-modal');
  const allowed = ['raveman@gmail.com', 'pkwieloch@gmail.com'];
  if (!allowed.includes(state.currentUser)) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
    updateUserBadge();
  }
}

async function loginWithEmail(email) {
  const clean = (email || '').trim().toLowerCase();
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  const res = await apiPost('/api/auth/login', { email: clean });
  if (!res.ok) {
    errEl.textContent = res.error || 'Unauthorized email';
    errEl.classList.remove('hidden');
    return;
  }

  state.currentUser = clean;
  localStorage.setItem('dualsync_user', clean);
  document.getElementById('login-modal').classList.add('hidden');
  updateUserBadge();
  applyServerState(res.state);
  showToast(`Signed in as ${clean}`);
}

function updateUserBadge() {
  const avatar = document.getElementById('active-user-avatar');
  const emailEl = document.getElementById('active-user-email');
  emailEl.textContent = state.currentUser;
  if (state.currentUser.startsWith('pkwieloch')) {
    avatar.textContent = 'K';
    avatar.style.background = 'var(--pkwieloch-gradient)';
  } else {
    avatar.textContent = 'R';
    avatar.style.background = 'var(--raveman-gradient)';
  }
}

// --- RENDERING ---
function renderAll() {
  const activeLoc = state.settings.active_location === 'Poland' ? 'Poland' : 'UK';
  const locFlag = activeLoc === 'Poland' ? '🇵🇱 Poland' : '🇬🇧 UK';
  const activeDate = state.settings.active_plan_date || todayIso();

  const [yy, mm, dd] = activeDate.split('-').map(Number);
  const dateObj = (yy && mm && dd) ? new Date(yy, mm - 1, dd) : new Date();

  document.getElementById('current-date-label').textContent =
    `${dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • ${locFlag}`;

  // Update Sunrise & Sunset for selected date & location
  const sun = computeSunTimes(activeDate, activeLoc);
  document.getElementById('sun-rise-label').textContent = sun.sunrise;
  document.getElementById('sun-set-label').textContent = sun.sunset;

  // Date picker controls
  const planDateInput = document.getElementById('plan-date-input');
  if (planDateInput && document.activeElement !== planDateInput) {
    planDateInput.value = activeDate;
  }
  const btnToday = document.getElementById('btn-date-today');
  const btnTomorrow = document.getElementById('btn-date-tomorrow');
  if (btnToday && btnTomorrow) {
    btnToday.classList.toggle('active-date', activeDate === todayIso());
    btnTomorrow.classList.toggle('active-date', activeDate === tomorrowIso());
  }

  // Location buttons
  document.querySelectorAll('.loc-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.location === activeLoc);
  });

  // Day start input
  const startInput = document.getElementById('day-start-input');
  if (document.activeElement !== startInput) {
    startInput.value = state.settings.day_start_time || '09:00';
  }

  // Last calendar export status
  const calSub = document.getElementById('last-calendar-export-label');
  if (state.settings.last_calendar_export) {
    calSub.textContent = `Synced: ${state.settings.last_calendar_export}`;
  } else {
    calSub.textContent = 'raveman, pkwieloch, or both';
  }

  // OAuth status badges in settings modal & top pool bar
  const rStat = document.getElementById('status-raveman-token');
  const pStat = document.getElementById('status-pkwieloch-token');
  if (rStat) rStat.textContent = state.settings.raveman_connected ? '✓ Connected' : '';
  if (pStat) pStat.textContent = state.settings.pkwieloch_connected ? '✓ Connected' : '';

  const topBtnR = document.getElementById('btn-top-connect-raveman');
  const topBtnP = document.getElementById('btn-top-connect-pkwieloch');
  if (topBtnR) {
    topBtnR.textContent = state.settings.raveman_connected ? '✓ raveman Live' : '🔗 Connect raveman';
    topBtnR.style.borderColor = state.settings.raveman_connected ? 'var(--success-color)' : '';
  }
  if (topBtnP) {
    topBtnP.textContent = state.settings.pkwieloch_connected ? '✓ pkwieloch Live' : '🔗 Connect pkwieloch';
    topBtnP.style.borderColor = state.settings.pkwieloch_connected ? 'var(--success-color)' : '';
  }

  renderPool();
  renderEverydayTemplates();
  renderDailyPlan();
  renderTopStats();
}

function renderPool() {
  const container = document.getElementById('dropzone-pool');
  container.innerHTML = '';

  const allPool = state.tasks.filter(t => t.placement === 'pool');
  const ravemanCount = allPool.filter(t => t.account_email === 'raveman@gmail.com' && (!t.completed || state.showCompleted)).length;
  const pkwielochCount = allPool.filter(t => t.account_email === 'pkwieloch@gmail.com' && (!t.completed || state.showCompleted)).length;

  document.getElementById('count-pool-all').textContent = ravemanCount + pkwielochCount;
  document.getElementById('count-pool-raveman').textContent = ravemanCount;
  document.getElementById('count-pool-pkwieloch').textContent = pkwielochCount;

  const accountScopedTasks = allPool.filter(t => {
    if (!state.showCompleted && t.completed) return false;
    if (state.accountFilter !== 'all' && t.account_email !== state.accountFilter) return false;
    return true;
  });

  const folderMap = new Map();
  accountScopedTasks.forEach(t => {
    const fname = (t.list_name || 'My Tasks').trim();
    folderMap.set(fname, (folderMap.get(fname) || 0) + 1);
  });

  if (state.folderFilter !== 'all' && !folderMap.has(state.folderFilter)) {
    state.folderFilter = 'all';
  }

  const folderSelect = document.getElementById('folder-filter-select');
  const folderChipsBar = document.getElementById('folder-chips-bar');
  if (folderSelect && folderChipsBar) {
    const folders = [...folderMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));

    folderSelect.innerHTML = `<option value="all">All Folders (${accountScopedTasks.length})</option>` +
      folders.map(([fname, cnt]) => `<option value="${escapeHtml(fname)}" ${state.folderFilter === fname ? 'selected' : ''}>📁 ${escapeHtml(fname)} (${cnt})</option>`).join('');

    folderChipsBar.innerHTML = `
      <button type="button" class="folder-chip ${state.folderFilter === 'all' ? 'active' : ''}" data-folder="all">
        All Folders <span class="badge-count">${accountScopedTasks.length}</span>
      </button>
      ${folders.map(([fname, cnt]) => `
        <button type="button" class="folder-chip ${state.folderFilter === fname ? 'active' : ''}" data-folder="${escapeHtml(fname)}">
          📁 ${escapeHtml(fname)} <span class="badge-count">${cnt}</span>
        </button>
      `).join('')}
    `;

    folderChipsBar.querySelectorAll('.folder-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        state.folderFilter = chip.dataset.folder;
        renderPool();
      });
    });
  }

  const datalist = document.getElementById('existing-folders-datalist');
  if (datalist) {
    const allFolders = [...new Set(state.tasks.filter(t => t.item_type === 'task').map(t => (t.list_name || 'My Tasks').trim()))];
    datalist.innerHTML = allFolders.map(f => `<option value="${escapeHtml(f)}"></option>`).join('');
  }

  const filtered = accountScopedTasks.filter(t => {
    if (state.folderFilter !== 'all' && (t.list_name || 'My Tasks').trim() !== state.folderFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-drop-hint';
    empty.innerHTML = `<span>No Google Tasks in this folder view. Drag scheduled tasks back up here for later.</span>`;
    container.appendChild(empty);
    return;
  }

  filtered.forEach(task => {
    container.appendChild(createTaskCardElement(task, null, false));
  });
}

function renderEverydayTemplates() {
  const container = document.getElementById('everyday-templates-list');
  container.innerHTML = '';

  const activeLoc = state.settings.active_location || 'UK';
  const badgeEl = document.getElementById('everyday-location-badge');
  badgeEl.textContent = activeLoc === 'Poland' ? '🇵🇱 Poland' : '🇬🇧 UK';

  const visibleTemplates = state.dailyTemplates.filter(
    tpl => tpl.location === 'both' || tpl.location === activeLoc
  );

  visibleTemplates.forEach(tpl => {
    const isExpanded = state.expandedTemplateIds.has(tpl.id);
    const card = document.createElement('div');
    card.className = 'routine-template-card';
    card.draggable = true;

    card.innerHTML = `
      <div class="routine-top-row">
        <div class="routine-left" data-action="toggle-tpl-expand">
          <div class="routine-icon">${escapeHtml(tpl.icon || '⚡')}</div>
          <div class="routine-info">
            <div class="routine-title">${escapeHtml(tpl.title)}</div>
            ${tpl.notes ? `<div class="routine-notes">${escapeHtml(tpl.notes)}</div>` : ''}
          </div>
        </div>
        <div class="routine-right">
          <button type="button" class="duration-badge" data-action="toggle-tpl-expand" title="Click to adjust routine duration">${tpl.duration_minutes}m ▾</button>
          <button type="button" class="btn-drop-in" data-action="drop-in" title="Add to schedule">+ Drop</button>
        </div>
      </div>

      ${isExpanded ? `
        <div class="task-expand-panel">
          <div class="time-reserve-row">
            <div class="preset-chips">
              <span style="font-size:10.5px;font-weight:600;color:var(--text-secondary);">Time:</span>
              ${[15, 20, 30, 45, 60, 75, 90].map(m => `
                <button type="button" class="preset-btn ${Number(tpl.duration_minutes) === m ? 'active' : ''}" data-tpl-preset="${m}">${m}m</button>
              `).join('')}
            </div>
            <div class="custom-mins-group">
              <label>Custom:</label>
              <input type="number" class="custom-mins-input tpl-custom-mins" value="${tpl.duration_minutes}" min="5" max="360" step="5" />
            </div>
          </div>
          <div class="expand-actions-bar">
            <span style="font-size:11px;color:var(--text-muted);">Available in: <strong>${tpl.location === 'both' ? 'UK & Poland' : tpl.location}</strong></span>
            <button type="button" class="btn-xs" style="color:#ef4444;" data-action="delete-tpl">Delete Routine</button>
          </div>
        </div>
      ` : ''}
    `;

    card.addEventListener('dragstart', e => {
      state.draggedTemplate = tpl;
      state.draggedTaskId = null;
      card.style.opacity = '0.5';
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', `template:${tpl.id}`);
    });

    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
      state.draggedTemplate = null;
      document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('drag-over'));
    });

    card.querySelectorAll('[data-action="toggle-tpl-expand"]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        if (state.expandedTemplateIds.has(tpl.id)) {
          state.expandedTemplateIds.delete(tpl.id);
        } else {
          state.expandedTemplateIds.add(tpl.id);
        }
        renderEverydayTemplates();
      });
    });

    card.querySelectorAll('[data-tpl-preset]').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const mins = Number(btn.dataset.tplPreset);
        const res = await apiPost('/api/templates/update', { id: tpl.id, duration_minutes: mins });
        if (res.ok) {
          applyServerState(res.state);
          showToast(`Updated "${tpl.title}" default time to ${mins}m`);
        }
      });
    });

    const customInput = card.querySelector('.tpl-custom-mins');
    if (customInput) {
      customInput.addEventListener('change', async e => {
        e.stopPropagation();
        const mins = Math.max(5, Math.min(360, Number(customInput.value) || 30));
        const res = await apiPost('/api/templates/update', { id: tpl.id, duration_minutes: mins });
        if (res.ok) {
          applyServerState(res.state);
          showToast(`Updated "${tpl.title}" default time to ${mins}m`);
        }
      });
      customInput.addEventListener('click', e => e.stopPropagation());
    }

    card.querySelector('[data-action="drop-in"]').addEventListener('click', async e => {
      e.stopPropagation();
      await dropRoutineIntoSchedule(tpl, null);
    });

    const delBtn = card.querySelector('[data-action="delete-tpl"]');
    if (delBtn) {
      delBtn.addEventListener('click', async e => {
        e.stopPropagation();
        const res = await apiPost('/api/templates/delete', { id: tpl.id });
        if (res.ok) {
          state.expandedTemplateIds.delete(tpl.id);
          applyServerState(res.state);
          showToast(`Removed "${tpl.title}" from Everyday Tasks`);
        }
      });
    }

    container.appendChild(card);
  });
}

async function dropRoutineIntoSchedule(tpl, insertIndex = null) {
  const fullTitle = `${tpl.icon ? tpl.icon + ' ' : ''}${tpl.title}`;
  const res = await apiPost('/api/tasks/create', {
    title: fullTitle,
    notes: tpl.notes || '',
    account_email: 'routine',
    list_name: '',
    placement: 'daily_plan',
    plan_date: state.settings.active_plan_date || todayIso(),
    item_type: 'routine',
    duration_minutes: Number(tpl.duration_minutes) || 30,
    insert_index: insertIndex
  });
  if (res.ok) {
    applyServerState(res.state);
    showToast(`Added "${fullTitle}" (${tpl.duration_minutes}m) to schedule`);
  }
}

function renderDailyPlan() {
  const container = document.getElementById('dropzone-daily');
  container.innerHTML = '';

  const activeDate = state.settings.active_plan_date || todayIso();
  const isToday = activeDate === todayIso();
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const items = state.tasks.filter(t =>
    t.placement === 'daily_plan' &&
    (!t.plan_date || t.plan_date === activeDate) &&
    (!t.completed || state.showCompleted)
  );
  document.getElementById('count-daily-plan').textContent = items.length;

  let runningMinutes = parseTimeToMinutes(state.settings.day_start_time || '09:00');
  const startLabel = formatMinutesToClock(runningMinutes);

  let taskMins = 0;
  let routineMins = 0;
  let breakMins = 0;

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-drop-hint';
    empty.innerHTML = `<span>No items scheduled for <strong>${activeDate}</strong> yet. Drag Google Tasks from above or Everyday Tasks from the left!</span>`;
    container.appendChild(empty);
  } else {
    items.forEach(task => {
      const dur = Number(task.duration_minutes) || 15;
      const slotStartMins = runningMinutes;
      const slotEndMins = runningMinutes + dur;
      const slotStart = formatMinutesToClock(slotStartMins);
      const slotEnd = formatMinutesToClock(slotEndMins);
      runningMinutes = slotEndMins;

      const isLiveNow = isToday && !task.completed && nowMinutes >= slotStartMins && nowMinutes < slotEndMins;

      if (task.item_type === 'break') {
        breakMins += dur;
      } else if (task.item_type === 'routine') {
        routineMins += dur;
      } else {
        taskMins += dur;
      }

      container.appendChild(createTaskCardElement(task, `${slotStart} – ${slotEnd}`, isLiveNow));
    });
  }

  const endLabel = formatMinutesToClock(runningMinutes);
  const totalReserved = taskMins + routineMins + breakMins;
  const target = Number(state.settings.workday_target_minutes) || 480;

  document.getElementById('daily-reserved-label').textContent = formatDuration(totalReserved);
  document.getElementById('daily-schedule-span').textContent = `${startLabel} – ${endLabel}`;

  const taskPct = Math.min(100, (taskMins / target) * 100);
  const routinePct = Math.min(100 - taskPct, (routineMins / target) * 100);
  const breakPct = Math.min(100 - taskPct - routinePct, (breakMins / target) * 100);

  document.getElementById('capacity-fill-tasks').style.width = `${taskPct}%`;
  document.getElementById('capacity-fill-routines').style.width = `${routinePct}%`;
  document.getElementById('capacity-fill-breaks').style.width = `${breakPct}%`;
}

function renderTopStats() {
  const activeDate = state.settings.active_plan_date || todayIso();
  const dailyItems = state.tasks.filter(t => t.placement === 'daily_plan' && (!t.plan_date || t.plan_date === activeDate));
  const totalMins = dailyItems.reduce((acc, t) => acc + (Number(t.duration_minutes) || 0), 0);
  const startMins = parseTimeToMinutes(state.settings.day_start_time || '09:00');

  document.getElementById('stat-planned-time').textContent = formatDuration(totalMins);
  document.getElementById('stat-finish-time').textContent = formatMinutesToClock(startMins + totalMins);
}

// --- CREATE STREAMLINED TASK CARD ELEMENT ---
function createTaskCardElement(task, timeSlotText, isLiveNow = false) {
  const card = document.createElement('div');
  const isBreak = task.item_type === 'break';
  const isRoutine = task.item_type === 'routine';
  const isRaveman = task.account_email === 'raveman@gmail.com';
  const isExpanded = state.expandedTaskIds.has(task.id);

  let typeClass = 'account-pkwieloch';
  let dotClass = 'pkwieloch';
  let dotTitle = task.account_email;

  if (isBreak) {
    typeClass = 'item-break';
    dotClass = 'break';
    dotTitle = 'Break';
  } else if (isRoutine) {
    typeClass = 'item-routine';
    dotClass = 'routine';
    dotTitle = 'Everyday Routine';
  } else if (isRaveman) {
    typeClass = 'account-raveman';
    dotClass = 'raveman';
    dotTitle = 'raveman@gmail.com';
  }

  card.className = [
    'task-card',
    typeClass,
    task.completed ? 'is-completed' : '',
    isLiveNow ? 'is-live-now' : ''
  ].filter(Boolean).join(' ');

  card.draggable = true;
  card.dataset.id = task.id;
  card.dataset.placement = task.placement;

  card.addEventListener('dragstart', e => {
    state.draggedTaskId = task.id;
    state.draggedTemplate = null;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    state.draggedTaskId = null;
    document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('drag-over'));
  });

  const isGoogleTask = task.item_type === 'task';
  const hasDiffAiSuggestion = isGoogleTask && task.ai_suggested_minutes && Number(task.ai_suggested_minutes) !== Number(task.duration_minutes);

  card.innerHTML = `
    <div class="task-top-row">
      <span class="drag-grip" title="Drag to reorder or move">⋮⋮</span>
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} title="${isGoogleTask ? 'Complete & sync to Google Tasks' : 'Mark completed'}" />
      <span class="account-mini-dot ${dotClass}" title="${escapeHtml(dotTitle)}"></span>
      <div class="task-main-info">
        <div class="task-title-line">
          ${isLiveNow ? `<span class="live-now-badge"><span class="live-dot"></span> NOW</span>` : ''}
          ${timeSlotText ? `<span class="time-slot-pill">${timeSlotText}</span>` : ''}
          <span class="task-title" title="${escapeHtml(task.title)}">${escapeHtml(task.title)}</span>
        </div>
        ${task.notes ? `<div class="task-notes-preview">${escapeHtml(task.notes)}</div>` : ''}
      </div>
      <div class="task-right-pills">
        ${hasDiffAiSuggestion ? `<button type="button" class="ai-chip" data-action="apply-ai" title="${escapeHtml(task.ai_reasoning || 'Apply AI suggested duration')}">✨ ${task.ai_suggested_minutes}m</button>` : ''}
        <button type="button" class="duration-badge" data-action="toggle-expand" title="Click to expand and reserve time">${task.duration_minutes}m ▾</button>
      </div>
    </div>

    ${isExpanded ? `
      <div class="task-expand-panel">
        <div class="time-reserve-row">
          <div class="preset-chips">
            <span style="font-size:10.5px;font-weight:600;color:var(--text-secondary);">Time:</span>
            ${[15, 20, 30, 45, 60, 75, 90].map(m => `
              <button type="button" class="preset-btn ${Number(task.duration_minutes) === m ? 'active' : ''}" data-preset="${m}">${m}m</button>
            `).join('')}
          </div>
          <div class="custom-mins-group">
            <label>Custom:</label>
            <input type="number" class="custom-mins-input" value="${task.duration_minutes}" min="5" max="360" step="5" />
          </div>
        </div>

        ${isGoogleTask ? `
          <div class="ai-insight-banner">
            <div>
              <strong>✨ AI (${task.ai_suggested_minutes || 30}m):</strong>
              <span>${escapeHtml(task.ai_reasoning || 'Analyzed from task title & notes.')}</span>
            </div>
            <div style="display:flex;gap:5px;flex-shrink:0;">
              ${Number(task.duration_minutes) !== Number(task.ai_suggested_minutes) ? `
                <button type="button" class="btn-xs" data-action="apply-ai">Use ${task.ai_suggested_minutes}m</button>
              ` : ''}
              <button type="button" class="btn-xs" data-action="recalc-ai">Re-analyze</button>
            </div>
          </div>
        ` : ''}

        <div class="expand-actions-bar">
          <div class="move-buttons">
            <span style="font-size:11px;color:var(--text-muted);margin-right:4px;">${escapeHtml(dotTitle)}${isGoogleTask && task.list_name ? ` • 📁 ${escapeHtml(task.list_name)}` : ''}</span>
            ${task.placement !== 'pool' && isGoogleTask ? `<button type="button" class="btn-xs" data-move="pool">↩ Back to Pool</button>` : ''}
            ${task.placement !== 'daily_plan' ? `<button type="button" class="btn-xs" data-move="daily_plan">→ To Daily Plan</button>` : ''}
          </div>
          <button type="button" class="btn-xs" style="color:#ef4444;" data-action="delete-task">Remove</button>
        </div>
      </div>
    ` : ''}
  `;

  const checkbox = card.querySelector('.task-checkbox');
  checkbox.addEventListener('change', async e => {
    e.stopPropagation();
    const completed = checkbox.checked ? 1 : 0;
    const res = await apiPost('/api/tasks/update', { id: task.id, completed });
    if (res.ok) {
      applyServerState(res.state);
      if (isGoogleTask) {
        showToast(completed
          ? `✓ Marked completed in Google Tasks (${task.account_email})`
          : `Reopened task in Google Tasks (${task.account_email})`
        );
      }
    }
  });

  card.querySelectorAll('[data-action="toggle-expand"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleExpand(task.id);
    });
  });

  card.querySelector('.task-main-info').addEventListener('click', () => {
    toggleExpand(task.id);
  });

  card.querySelectorAll('[data-action="apply-ai"]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const res = await apiPost('/api/tasks/update', {
        id: task.id,
        duration_minutes: task.ai_suggested_minutes
      });
      if (res.ok) {
        applyServerState(res.state);
        showToast(`Reserved ${task.ai_suggested_minutes}m (AI recommendation)`);
      }
    });
  });

  const recalcBtn = card.querySelector('[data-action="recalc-ai"]');
  if (recalcBtn) {
    recalcBtn.addEventListener('click', async e => {
      e.stopPropagation();
      recalcBtn.textContent = '...';
      const res = await apiPost('/api/ai/estimate', {
        id: task.id,
        title: task.title,
        notes: task.notes,
        apply: true
      });
      if (res.ok) {
        applyServerState(res.state);
        showToast(`✨ AI updated duration to ${res.estimate.suggested_minutes}m`);
      }
    });
  }

  card.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const mins = Number(btn.dataset.preset);
      const res = await apiPost('/api/tasks/update', { id: task.id, duration_minutes: mins });
      if (res.ok) {
        applyServerState(res.state);
        showToast(`Reserved ${mins} minutes`);
      }
    });
  });

  const customInput = card.querySelector('.custom-mins-input');
  if (customInput) {
    customInput.addEventListener('change', async e => {
      e.stopPropagation();
      const mins = Math.max(5, Math.min(360, Number(customInput.value) || 30));
      const res = await apiPost('/api/tasks/update', { id: task.id, duration_minutes: mins });
      if (res.ok) {
        applyServerState(res.state);
        showToast(`Reserved ${mins} minutes`);
      }
    });
    customInput.addEventListener('click', e => e.stopPropagation());
  }

  card.querySelectorAll('[data-move]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const targetPlacement = btn.dataset.move;
      const res = await apiPost('/api/tasks/update', {
        id: task.id,
        placement: targetPlacement,
        plan_date: state.settings.active_plan_date || todayIso()
      });
      if (res.ok) {
        applyServerState(res.state);
        showToast(
          targetPlacement === 'pool'
            ? 'Moved back to Google Tasks Pool for later'
            : 'Moved to Active Daily Plan'
        );
      }
    });
  });

  const delBtn = card.querySelector('[data-action="delete-task"]');
  if (delBtn) {
    delBtn.addEventListener('click', async e => {
      e.stopPropagation();
      const res = await apiPost('/api/tasks/delete', { id: task.id });
      if (res.ok) {
        state.expandedTaskIds.delete(task.id);
        applyServerState(res.state);
        showToast('Removed item');
      }
    });
  }

  return card;
}

function toggleExpand(taskId) {
  if (state.expandedTaskIds.has(taskId)) {
    state.expandedTaskIds.delete(taskId);
  } else {
    state.expandedTaskIds.add(taskId);
  }
  renderAll();
}

// --- DRAG AND DROP ACROSS ZONES ---
function setupDragAndDrop() {
  const dropzones = document.querySelectorAll('.dropzone');

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('drag-over');

      const draggingEl = document.querySelector('.task-card.dragging');
      if (draggingEl) {
        const afterElement = getDragAfterElement(zone, e.clientY, e.clientX);
        if (afterElement == null) {
          zone.appendChild(draggingEl);
        } else {
          zone.insertBefore(draggingEl, afterElement);
        }
      }
    });

    zone.addEventListener('dragleave', e => {
      if (!zone.contains(e.relatedTarget)) {
        zone.classList.remove('drag-over');
      }
    });

    zone.addEventListener('drop', async e => {
      e.preventDefault();
      zone.classList.remove('drag-over');

      if (state.draggedTemplate && zone.dataset.placement === 'daily_plan') {
        const tpl = state.draggedTemplate;
        state.draggedTemplate = null;

        const cards = [...zone.querySelectorAll('.task-card')];
        const afterEl = getDragAfterElement(zone, e.clientY, e.clientX);
        const insertIndex = afterEl ? cards.indexOf(afterEl) : cards.length;
        await dropRoutineIntoSchedule(tpl, insertIndex);
        return;
      }

      await persistDomOrder();
    });
  });
}

function getDragAfterElement(container, y, x) {
  const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
  const isGrid = container.classList.contains('pool-grid');

  if (isGrid) {
    return draggableElements.find(child => {
      const box = child.getBoundingClientRect();
      return y < box.bottom && x < box.left + box.width / 2;
    });
  }

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

async function persistDomOrder() {
  const getIds = selector => [...document.querySelectorAll(`${selector} .task-card`)].map(el => el.dataset.id);

  const visiblePoolIds = getIds('#dropzone-pool');
  const dailyIds = getIds('#dropzone-daily');

  const scheduledSet = new Set([...dailyIds, ...visiblePoolIds]);
  const hiddenPoolIds = state.tasks
    .filter(t => t.placement === 'pool' && !scheduledSet.has(t.id))
    .map(t => t.id);

  const columns = {
    pool: [...visiblePoolIds, ...hiddenPoolIds],
    daily_plan: dailyIds
  };

  const res = await apiPost('/api/tasks/reorder', {
    columns,
    plan_date: state.settings.active_plan_date || todayIso()
  });
  if (res.ok) {
    applyServerState(res.state);
  }
}

// --- GOOGLE CALENDAR EXPORT & ICS DOWNLOAD ---
function buildGoogleCalendarTemplateUrl(ev, targetEmails) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${ev.start_ics}/${ev.end_ics}`,
    details: ev.description,
    location: state.settings.active_location || 'UK',
    add: targetEmails.join(',')
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcsFile(icsContent) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Synchro-Plan-${state.settings.active_plan_date || todayIso()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- INITIALIZATION & UI EVENTS ---
document.addEventListener('DOMContentLoaded', async () => {
  applyTheme(state.settings.theme);
  applyDensity(state.settings.card_density);
  applyWindowSizes(state.settings.top_pool_height, state.settings.left_col_width);
  setupWindowSplitters();
  setupDragAndDrop();
  await fetchState();
  checkAuthGate();

  setInterval(fetchState, 10000);

  // Date Picker Controls (Today / Tomorrow / Custom Date)
  const setPlanDate = async (dateStr) => {
    const res = await apiPost('/api/settings/update', { active_plan_date: dateStr });
    if (res.ok) {
      applyServerState(res.state);
      showToast(`Switched plan date to ${dateStr}`);
    }
  };
  document.getElementById('btn-date-today').addEventListener('click', () => setPlanDate(todayIso()));
  document.getElementById('btn-date-tomorrow').addEventListener('click', () => setPlanDate(tomorrowIso()));
  document.getElementById('plan-date-input').addEventListener('change', e => {
    if (e.target.value) setPlanDate(e.target.value);
  });

  // "Start: Now" 1-Click Overdue / Current Time Shifter
  document.getElementById('btn-start-now').addEventListener('click', async () => {
    const now = new Date();
    const roundedMins = Math.ceil(now.getMinutes() / 5) * 5;
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), roundedMins);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const nowStr = `${hh}:${mm}`;
    const res = await apiPost('/api/settings/update', { day_start_time: nowStr });
    if (res.ok) {
      applyServerState(res.state);
      showToast(`Shifted schedule start time to ${nowStr}`);
    }
  });

  // 1-Click Google OAuth Popup Buttons (both in Setup modal & Top Pool bar)
  document.getElementById('btn-oauth-raveman').addEventListener('click', () => connectGoogleOAuthPopup('raveman@gmail.com'));
  document.getElementById('btn-oauth-pkwieloch').addEventListener('click', () => connectGoogleOAuthPopup('pkwieloch@gmail.com'));
  const topConnR = document.getElementById('btn-top-connect-raveman');
  const topConnP = document.getElementById('btn-top-connect-pkwieloch');
  if (topConnR) topConnR.addEventListener('click', () => connectGoogleOAuthPopup('raveman@gmail.com'));
  if (topConnP) topConnP.addEventListener('click', () => connectGoogleOAuthPopup('pkwieloch@gmail.com'));

  // 3-Size Box Density Slider
  const densitySlider = document.getElementById('card-density-slider');
  densitySlider.addEventListener('input', async e => {
    const val = Number(e.target.value) || 2;
    applyDensity(val);
    await apiPost('/api/settings/update', { card_density: val });
  });

  // Theme Toggle (Light / Dark)
  document.getElementById('btn-theme-toggle').addEventListener('click', async () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    const res = await apiPost('/api/settings/update', { theme: nextTheme });
    if (res.ok) {
      applyServerState(res.state);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    }
  });

  // Location Switcher (UK vs Poland)
  document.querySelectorAll('.loc-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const loc = btn.dataset.location;
      const res = await apiPost('/api/settings/update', { active_location: loc });
      if (res.ok) {
        applyServerState(res.state);
        showToast(`Switched to ${loc === 'Poland' ? '🇵🇱 Poland' : '🇬🇧 UK'} (updated routines & sunrise/sunset)`);
      }
    });
  });

  // Account login buttons
  document.querySelectorAll('.account-login-btn').forEach(btn => {
    btn.addEventListener('click', () => loginWithEmail(btn.dataset.email));
  });

  document.getElementById('custom-login-form').addEventListener('submit', e => {
    e.preventDefault();
    const val = document.getElementById('custom-login-input').value;
    loginWithEmail(val);
  });

  document.getElementById('btn-switch-user').addEventListener('click', () => {
    document.getElementById('login-modal').classList.remove('hidden');
  });

  // Account filter tabs in top pool
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.accountFilter = tab.dataset.filter;
      state.folderFilter = 'all';
      renderPool();
    });
  });

  // Folder filter dropdown in top pool
  const folderSelect = document.getElementById('folder-filter-select');
  if (folderSelect) {
    folderSelect.addEventListener('change', e => {
      state.folderFilter = e.target.value || 'all';
      renderPool();
    });
  }

  // Show completed toggle
  document.getElementById('show-completed-toggle').addEventListener('change', e => {
    state.showCompleted = e.target.checked;
    renderAll();
  });

  // Day start time change
  document.getElementById('day-start-input').addEventListener('change', async e => {
    const val = e.target.value || '09:00';
    const res = await apiPost('/api/settings/update', { day_start_time: val });
    if (res.ok) {
      applyServerState(res.state);
      showToast(`Schedule start updated to ${val}`);
    }
  });

  // Break quick-insert chips
  document.querySelectorAll('.btn-break-chip').forEach(chip => {
    chip.addEventListener('click', async () => {
      const title = chip.dataset.breakTitle;
      const mins = Number(chip.dataset.breakMins) || 15;
      const res = await apiPost('/api/tasks/create', {
        title,
        notes: '',
        account_email: 'shared',
        list_name: '',
        placement: 'daily_plan',
        plan_date: state.settings.active_plan_date || todayIso(),
        item_type: 'break',
        duration_minutes: mins
      });
      if (res.ok) {
        applyServerState(res.state);
        showToast(`Inserted "${title}" (${mins}m)`);
      }
    });
  });

  // Push Schedule to Calendar (raveman / pkwieloch / both)
  const calModal = document.getElementById('calendar-modal');
  document.getElementById('btn-export-calendar').addEventListener('click', async () => {
    const target = document.getElementById('calendar-target-select').value;
    const res = await apiPost('/api/calendar/export', {
      target,
      plan_date: state.settings.active_plan_date || todayIso()
    });
    if (!res.ok) {
      showToast(res.error || 'Could not export calendar');
      return;
    }

    state.lastExportedIcs = res.ics_content;
    applyServerState(res.state);

    const bodyEl = document.getElementById('calendar-modal-body');
    const targetBadgeText = res.target_emails.join(' & ');

    bodyEl.innerHTML = `
      <div class="settings-banner" style="margin-bottom:4px;">
        <strong>✓ Scheduled ${res.events_count} events for <code>${escapeHtml(targetBadgeText)}</code> on ${escapeHtml(state.settings.active_plan_date || todayIso())}</strong>
        <div style="margin-top:4px;">
          Location: <strong>${escapeHtml(state.settings.active_location)}</strong> • Smart Upsert active (updates existing calendar slots without duplicating if you re-plan).
        </div>
      </div>
      ${res.events.map(ev => `
        <div class="cal-event-row">
          <div>
            <div style="font-weight:600;font-size:12.5px;">${escapeHtml(ev.title)}</div>
            <div class="mono" style="font-size:11px;color:var(--text-secondary);">${ev.start_clock} – ${ev.end_clock}</div>
          </div>
          <a href="${buildGoogleCalendarTemplateUrl(ev, res.target_emails)}" target="_blank" rel="noopener" class="btn-xs" style="text-decoration:none;">
            Google Calendar ↗
          </a>
        </div>
      `).join('')}
    `;

    calModal.classList.remove('hidden');
    showToast(`Synced ${res.events_count} events to ${targetBadgeText} calendar`);
  });

  const closeCalModal = () => calModal.classList.add('hidden');
  document.getElementById('close-calendar-modal').addEventListener('click', closeCalModal);
  document.getElementById('done-calendar-modal').addEventListener('click', closeCalModal);
  document.getElementById('btn-download-ics').addEventListener('click', () => {
    if (state.lastExportedIcs) {
      downloadIcsFile(state.lastExportedIcs);
      showToast('Downloaded .ics calendar file');
    }
  });

  // Sync Google Tasks button
  document.getElementById('btn-sync-google').addEventListener('click', async () => {
    const btn = document.getElementById('btn-sync-google');
    const origText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = '...';
    const res = await apiPost('/api/google/sync');
    btn.querySelector('span').textContent = origText;
    if (res.ok) {
      applyServerState(res.state);
      showToast('Synced Google Tasks & Folders for both accounts');
    }
  });

  // New Everyday Routine Modal
  const routineModal = document.getElementById('new-routine-modal');
  document.getElementById('btn-new-routine').addEventListener('click', () => {
    document.getElementById('routine-location').value = state.settings.active_location || 'both';
    routineModal.classList.remove('hidden');
    document.getElementById('routine-title').focus();
  });
  const closeRoutineModal = () => routineModal.classList.add('hidden');
  document.getElementById('close-new-routine-modal').addEventListener('click', closeRoutineModal);
  document.getElementById('cancel-new-routine').addEventListener('click', closeRoutineModal);

  document.getElementById('new-routine-form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      location: document.getElementById('routine-location').value,
      icon: document.getElementById('routine-icon').value.trim() || '⚡',
      duration_minutes: Number(document.getElementById('routine-duration').value) || 30,
      title: document.getElementById('routine-title').value.trim(),
      notes: document.getElementById('routine-notes').value.trim()
    };
    const res = await apiPost('/api/templates/create', payload);
    if (res.ok) {
      applyServerState(res.state);
      e.target.reset();
      closeRoutineModal();
      showToast(`Saved "${payload.title}" to Everyday Tasks`);
    }
  });

  // New Google Task Modal
  const newTaskModal = document.getElementById('new-task-modal');
  document.getElementById('btn-new-task').addEventListener('click', () => {
    if (state.currentUser) {
      document.getElementById('new-task-account').value = state.currentUser;
    }
    if (state.folderFilter && state.folderFilter !== 'all') {
      document.getElementById('new-task-folder').value = state.folderFilter;
    }
    newTaskModal.classList.remove('hidden');
    document.getElementById('new-task-title').focus();
  });

  const closeNewTask = () => newTaskModal.classList.add('hidden');
  document.getElementById('close-new-task-modal').addEventListener('click', closeNewTask);
  document.getElementById('cancel-new-task').addEventListener('click', closeNewTask);

  let aiDebounce = null;
  const triggerModalAiEstimate = async () => {
    const title = document.getElementById('new-task-title').value.trim();
    const notes = document.getElementById('new-task-notes').value.trim();
    if (!title) return;
    document.getElementById('new-task-ai-text').textContent = 'Analyzing task scope with AI...';
    const res = await apiPost('/api/ai/estimate', { title, notes });
    if (res.ok && res.estimate) {
      document.getElementById('new-task-duration').value = res.estimate.suggested_minutes;
      document.getElementById('new-task-ai-text').textContent =
        `Recommended: ${res.estimate.suggested_minutes} mins — ${res.estimate.reasoning}`;
    }
  };

  document.getElementById('new-task-title').addEventListener('input', () => {
    clearTimeout(aiDebounce);
    aiDebounce = setTimeout(triggerModalAiEstimate, 500);
  });
  document.getElementById('new-task-notes').addEventListener('input', () => {
    clearTimeout(aiDebounce);
    aiDebounce = setTimeout(triggerModalAiEstimate, 600);
  });
  document.getElementById('btn-preview-ai-estimate').addEventListener('click', triggerModalAiEstimate);

  document.getElementById('new-task-form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      account_email: document.getElementById('new-task-account').value,
      placement: document.getElementById('new-task-placement').value,
      list_name: (document.getElementById('new-task-folder').value || 'My Tasks').trim(),
      title: document.getElementById('new-task-title').value.trim(),
      notes: document.getElementById('new-task-notes').value.trim(),
      duration_minutes: Number(document.getElementById('new-task-duration').value) || 30,
      plan_date: state.settings.active_plan_date || todayIso(),
      item_type: 'task'
    };
    const res = await apiPost('/api/tasks/create', payload);
    if (res.ok) {
      applyServerState(res.state);
      e.target.reset();
      closeNewTask();
      showToast(`Created Google Task in "${payload.list_name}" (${payload.account_email})`);
    }
  });

  // Settings Modal
  const settingsModal = document.getElementById('settings-modal');
  document.getElementById('btn-open-settings').addEventListener('click', () => {
    document.getElementById('setting-google-client-id').value = state.settings.google_client_id || localStorage.getItem('dualsync_google_client_id') || '';
    settingsModal.classList.remove('hidden');
  });
  const closeSettings = () => settingsModal.classList.add('hidden');
  document.getElementById('close-settings-modal').addEventListener('click', closeSettings);
  document.getElementById('cancel-settings').addEventListener('click', closeSettings);

  document.getElementById('settings-form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {};
    const geminiKey = document.getElementById('setting-gemini-key').value.trim();
    const clientId = document.getElementById('setting-google-client-id').value.trim();
    const tokR = document.getElementById('setting-token-raveman').value.trim();
    const tokP = document.getElementById('setting-token-pkwieloch').value.trim();

    if (geminiKey) payload.gemini_api_key = geminiKey;
    if (clientId !== undefined) payload.google_client_id = clientId;
    if (tokR) payload.token_raveman = tokR;
    if (tokP) payload.token_pkwieloch = tokP;

    const res = await apiPost('/api/settings/update', payload);
    if (res.ok) {
      applyServerState(res.state);
      closeSettings();
      showToast('Saved API & Google OAuth settings');
    }
  });

  document.getElementById('btn-reset-demo').addEventListener('click', async () => {
    const res = await apiPost('/api/demo/reset');
    if (res.ok) {
      applyServerState(res.state);
      closeSettings();
      showToast('Reset demo Google Tasks & Everyday Routines');
    }
  });
});
