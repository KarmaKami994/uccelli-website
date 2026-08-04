function currentTemplate() {
  const sel = document.getElementById('templateSel');
  return sel ? sel.value : '1';
}

function buildTex(values) {
  const t = currentTemplate();
  if (t === '2') return buildTex_t2(values);
  if (t === '5') return buildTex_t5(values);
  return buildTex_t1(values);
}

// ---------- PDF generation via API ----------
async function generatePDF() {
  const data = collectData();
  if (!data.basics.name) {
    showStatus('error', copy.nameRequired);
    return;
  }
  const tex = buildTex(data);
  document.getElementById('texPreview').textContent = tex;
  saveData();

  const apiUrl = val('apiUrl') || 'https://latex.ytotech.com/builds/sync';
  const btn = document.getElementById('genBtn');
  btn.disabled = true;
  showStatus('info', `<span class="spinner"></span>${copy.loadingAssets}`);

  try {
    const resources = [{ main: true, content: tex }, ...(await templateResources(currentTemplate()))];
    showStatus('info', `<span class="spinner"></span>${copy.compiling}`);
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compiler: 'xelatex', resources }),
    });

    if (!res.ok) {
      let detail = '';
      try { detail = await res.text(); } catch (_) {}
      showStatus('error', `${copy.compilerError} (HTTP ${res.status}). ${detail.slice(0, 400)}`);
      return;
    }

    const blob = await res.blob();
    if (blob.type && blob.type.indexOf('pdf') === -1 && blob.size < 2000) {
      const txt = await blob.text();
      showStatus('error', copy.noPdf + txt.slice(0, 400));
      return;
    }

    if (lastPdfBlobUrl) URL.revokeObjectURL(lastPdfBlobUrl);
    lastPdfBlobUrl = URL.createObjectURL(blob);
    document.getElementById('emptyPreview').style.display = 'none';
    const frame = document.getElementById('pdfFrame');
    frame.style.display = 'block';
    frame.src = lastPdfBlobUrl;
    document.getElementById('downloadBtn').style.display = 'inline-flex';
    showStatus('ok', copy.success);
  } catch (err) {
    showStatus('error', copy.network + err.message);
  } finally {
    btn.disabled = false;
  }
}

function downloadPDF() {
  if (!lastPdfBlobUrl) return;
  const a = document.createElement('a');
  a.href = lastPdfBlobUrl;
  const name = (val('name') || 'lebenslauf').replace(/\s+/g, '_').toLowerCase();
  a.download = `${name}.pdf`;
  a.click();
}

function showStatus(type, html) {
  const s = document.getElementById('status');
  s.className = 'status show ' + type;
  s.innerHTML = html;
}

// ---------- Dynamic card builders ----------
function makeField(label, field, placeholder, type = 'text') {
  return `<div><label>${label}</label><input type="${type}" data-field="${field}" placeholder="${placeholder || ''}" oninput="saveData()"></div>`;
}
function makeArea(label, field, placeholder) {
  return `<div><label>${label}</label><textarea data-field="${field}" placeholder="${placeholder || ''}" oninput="saveData()"></textarea></div>`;
}

function addEducation(d = {}) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-head"><strong>${copy.education}</strong><button class="del" onclick="removeCard(this)">${copy.remove}</button></div>
    <div class="row">${makeField(copy.institution, 'institution', 'ETH Zürich')}${makeField(copy.location, 'location', 'Zürich')}</div>
    <div class="row">${makeField(copy.degree, 'studyType', 'BSc')}${makeField(copy.subjectArea, 'area', lang === 'de' ? 'Informatik' : 'Computer Science')}</div>
    <div class="row">${makeField(copy.grade, 'gpa', '5.5')}${makeField(copy.start, 'startDate', 'Sep 2019')}${makeField(copy.end, 'endDate', 'Jun 2022')}</div>`;
  document.getElementById('educationList').appendChild(div);
  fillCard(div, d);
}

function addWork(d = {}) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-head"><strong>${copy.position}</strong><button class="del" onclick="removeCard(this)">${copy.remove}</button></div>
    <div class="row">${makeField(copy.company, 'company', 'ACME AG')}${makeField(copy.position, 'position', 'Software Engineer')}</div>
    <div class="row">${makeField(copy.location, 'location', 'Zürich')}${makeField(copy.start, 'startDate', 'Jan 2022')}${makeField(copy.end, 'endDate', copy.current)}</div>
    <label>${copy.achievements}</label>
    <div class="highlights"></div>
    <button class="ghost" style="width:100%; margin-top:4px" onclick="addHighlight(this)">${copy.addAchievement}</button>`;
  document.getElementById('workList').appendChild(div);
  fillCard(div, d);
  if (d.highlights && d.highlights.length) {
    d.highlights.forEach(h => addHighlight(div.querySelector('button.ghost'), h));
  } else {
    addHighlight(div.querySelector('button.ghost'));
  }
}

function addHighlight(btn, text = '') {
  const container = btn.previousElementSibling;
  const row = document.createElement('div');
  row.className = 'hl-row';
  const placeholder = lang === 'de' ? 'z. B. Reduzierte Ladezeit um 40%' : 'e.g. Reduced loading time by 40%';
  row.innerHTML = `<textarea placeholder="${placeholder}" oninput="saveData()"></textarea><button class="del" onclick="this.parentElement.remove(); saveData()">×</button>`;
  container.appendChild(row);
  row.querySelector('textarea').value = text;
}

function addSkill(d = {}) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-head"><strong>${copy.skillCategory}</strong><button class="del" onclick="removeCard(this)">${copy.remove}</button></div>
    ${makeField(copy.category, 'name', lang === 'de' ? 'Programmiersprachen' : 'Programming languages')}
    ${makeField(copy.keywords, 'keywords', 'JavaScript, Python, Go')}`;
  document.getElementById('skillsList').appendChild(div);
  fillCard(div, d);
}

function addProject(d = {}) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-head"><strong>${copy.project}</strong><button class="del" onclick="removeCard(this)">${copy.remove}</button></div>
    <div class="row">${makeField(copy.name, 'name', lang === 'de' ? 'Meine App' : 'My app')}${makeField('URL', 'url', 'github.com/…')}</div>
    ${makeField(copy.keywords, 'keywords', 'React, Node')}
    ${makeArea(copy.description, 'description', lang === 'de' ? 'Kurze Beschreibung des Projekts' : 'Short project description')}`;
  document.getElementById('projectsList').appendChild(div);
  fillCard(div, d);
}

function addAward(d = {}) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-head"><strong>${copy.award}</strong><button class="del" onclick="removeCard(this)">${copy.remove}</button></div>
    <div class="row">${makeField(copy.title, 'title', 'Best Paper Award')}${makeField(copy.issuer, 'awarder', 'ACM')}</div>
    ${makeField(copy.date, 'date', lang === 'de' ? 'Mai 2023' : 'May 2023')}
    ${makeArea(copy.description, 'summary', lang === 'de' ? 'Kurze Beschreibung' : 'Short description')}`;
  document.getElementById('awardsList').appendChild(div);
  fillCard(div, d);
}

function fillCard(card, d) {
  Object.keys(d || {}).forEach(k => {
    let v = d[k];
    if (Array.isArray(v)) {
      if (k === 'highlights') return;
      v = v.join(', ');
    }
    const el = card.querySelector(`[data-field="${k}"]`);
    if (el) el.value = v || '';
  });
}

function removeCard(btn) { btn.closest('.card').remove(); saveData(); }

// ---------- Persistence ----------
function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collectData())); } catch (_) {}
}

function loadData() {
  let data;
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) {}
  if (data) applyData(data);
}

function applyData(data) {
  if (data._template) { const ts = document.getElementById('templateSel'); if (ts) ts.value = data._template; }
  document.getElementById('name').value = data.basics?.name || '';
  document.getElementById('email').value = data.basics?.email || '';
  document.getElementById('phone').value = data.basics?.phone || '';
  document.getElementById('address').value = data.basics?.location?.address || '';
  document.getElementById('website').value = data.basics?.website || '';

  document.getElementById('educationList').innerHTML = '';
  document.getElementById('workList').innerHTML = '';
  document.getElementById('skillsList').innerHTML = '';
  document.getElementById('projectsList').innerHTML = '';
  document.getElementById('awardsList').innerHTML = '';

  (data.education || []).forEach(addEducation);
  (data.work || []).forEach(addWork);
  (data.skills || []).forEach(addSkill);
  (data.projects || []).forEach(addProject);
  (data.awards || []).forEach(addAward);
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(collectData(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'resumake-data.json'; a.click();
  URL.revokeObjectURL(url);
}

function importJSON(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      applyData(data);
      saveData();
      showStatus('ok', copy.imported);
    } catch (err) {
      showStatus('error', copy.invalidJson + err.message);
    }
  };
  reader.readAsText(file);
  ev.target.value = '';
}

function clearAll() {
  if (!confirm(copy.clearConfirm)) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ---------- Init ----------
window.addEventListener('DOMContentLoaded', () => {
  applyStaticCopy();
  const has = localStorage.getItem(STORAGE_KEY);
  loadData();
  if (!has) {
    addEducation({ institution: 'ETH Zürich', location: 'Zürich', studyType: 'BSc', area: lang === 'de' ? 'Informatik' : 'Computer Science', startDate: 'Sep 2019', endDate: 'Jun 2022' });
    addWork({ company: 'ACME AG', position: 'Software Engineer', location: 'Zürich', startDate: 'Jan 2022', endDate: copy.current, highlights: lang === 'de' ? ['Baute skalierbare Backend-Services', 'Reduzierte Ladezeit um 40%'] : ['Built scalable backend services', 'Reduced loading time by 40%'] });
    addSkill({ name: lang === 'de' ? 'Programmiersprachen' : 'Programming languages', keywords: ['JavaScript', 'Python', 'Go'] });
  }
  document.getElementById('name').addEventListener('input', saveData);
  document.getElementById('email').addEventListener('input', saveData);
  document.getElementById('phone').addEventListener('input', saveData);
  document.getElementById('address').addEventListener('input', saveData);
  document.getElementById('website').addEventListener('input', saveData);
});
