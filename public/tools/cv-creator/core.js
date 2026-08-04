// ============================================================
//  Resumake single-file — Template 1 + Template 5 + XeLaTeX API
//  Portiert aus resumake.io (saadq)
// ============================================================

const STORAGE_KEY = 'uccelli_cv_generator_v1';
let lastPdfBlobUrl = null;
const lang = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'de';
const COPY = {
  de: {
    profile: 'Profil', education: 'Ausbildung', work: 'Berufserfahrung', skills: 'Skills', projects: 'Projekte', awards: 'Auszeichnungen', settings: 'Einstellungen', preview: 'Vorschau',
    name: 'Name', email: 'E-Mail', phone: 'Telefon', location: 'Ort', website: 'Website', institution: 'Institution', degree: 'Abschluss', subjectArea: 'Fachgebiet', grade: 'GPA / Note', start: 'Start', end: 'Ende',
    company: 'Firma', position: 'Position', achievements: 'Aufgaben / Erfolge', addAchievement: '+ Punkt hinzufügen', skillCategory: 'Skill-Kategorie', category: 'Kategorie', keywords: 'Keywords (Komma-getrennt)', project: 'Projekt', description: 'Beschreibung', award: 'Auszeichnung', title: 'Titel', issuer: 'Verleiher', date: 'Datum', remove: 'Entfernen',
    addEducation: '+ Ausbildung hinzufügen', addWork: '+ Position hinzufügen', addSkill: '+ Skill-Kategorie hinzufügen', addProject: '+ Projekt hinzufügen', addAward: '+ Auszeichnung hinzufügen',
    exportJson: 'JSON exportieren', importJson: 'JSON importieren', reset: 'Zurücksetzen', generate: 'PDF generieren', download: 'PDF herunterladen',
    template: 'Vorlage', template2: 'Template 2 (Awesome-CV) — Beispielstil', template5: 'Template 5 (res.cls)', template1: 'Template 1 (klassisch)', advanced: 'Erweiterte Einstellungen', api: 'LaTeX-Compiler-API (XeLaTeX)', latexCode: 'Generierten LaTeX-Code anzeigen',
    privacy: 'Hinweis zur PDF-Erstellung', privacyText: 'Beim Generieren wird der eingegebene Lebenslauf an den externen LaTeX-Dienst YtoTech übertragen. Die Eingaben werden zusätzlich nur in diesem Browser gespeichert.',
    empty: 'Fülle das Formular aus und klicke auf „PDF generieren“, um die Vorschau zu erstellen.', nameRequired: 'Bitte gib mindestens einen Namen ein.', compiling: 'PDF wird mit XeLaTeX erstellt …', success: 'PDF erfolgreich generiert.', imported: 'Daten importiert.', invalidJson: 'Ungültige JSON-Datei: ', network: 'Netzwerkfehler: ', compilerError: 'Kompilierfehler', noPdf: 'Der Dienst lieferte kein PDF: ', clearConfirm: 'Alle Eingaben wirklich löschen?', current: 'Aktuell', loadingAssets: 'Vorlagenressourcen werden geladen …',
    apiHint: 'Öffentlicher Dienst YtoTech. Die Adresse kann bei Bedarf geändert werden.', latexEmpty: 'Noch nichts generiert.'
  },
  en: {
    profile: 'Profile', education: 'Education', work: 'Experience', skills: 'Skills', projects: 'Projects', awards: 'Awards', settings: 'Settings', preview: 'Preview',
    name: 'Name', email: 'Email', phone: 'Phone', location: 'Location', website: 'Website', institution: 'Institution', degree: 'Degree', subjectArea: 'Field of study', grade: 'GPA / grade', start: 'Start', end: 'End',
    company: 'Company', position: 'Position', achievements: 'Responsibilities / achievements', addAchievement: '+ Add bullet', skillCategory: 'Skill category', category: 'Category', keywords: 'Keywords (comma-separated)', project: 'Project', description: 'Description', award: 'Award', title: 'Title', issuer: 'Issuer', date: 'Date', remove: 'Remove',
    addEducation: '+ Add education', addWork: '+ Add position', addSkill: '+ Add skill category', addProject: '+ Add project', addAward: '+ Add award',
    exportJson: 'Export JSON', importJson: 'Import JSON', reset: 'Reset', generate: 'Generate PDF', download: 'Download PDF',
    template: 'Template', template2: 'Template 2 (Awesome-CV) — example style', template5: 'Template 5 (res.cls)', template1: 'Template 1 (classic)', advanced: 'Advanced settings', api: 'LaTeX compiler API (XeLaTeX)', latexCode: 'Show generated LaTeX code',
    privacy: 'PDF generation notice', privacyText: 'When generating the PDF, the CV data entered here is sent to the external YtoTech LaTeX service. Your entries are otherwise stored only in this browser.',
    empty: 'Complete the form and select “Generate PDF” to create the preview.', nameRequired: 'Please enter at least a name.', compiling: 'Creating PDF with XeLaTeX …', success: 'PDF generated successfully.', imported: 'Data imported.', invalidJson: 'Invalid JSON file: ', network: 'Network error: ', compilerError: 'Compilation error', noPdf: 'The service did not return a PDF: ', clearConfirm: 'Delete all entries?', current: 'Present', loadingAssets: 'Loading template resources …',
    apiHint: 'Public YtoTech service. The address can be changed if required.', latexEmpty: 'Nothing generated yet.'
  }
};
const copy = COPY[lang];
document.documentElement.lang = lang;

const ASSET_SOURCES = {
  'res.cls': './assets/res.cls',
  'awesome-cv.cls': './assets/awesome-cv.cls',
  'fontawesome.sty': './assets/fontawesome.sty',
  'fonts/FontAwesome.otf': 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/v4.5.0/fonts/FontAwesome.otf',
  'fonts/Roboto-Bold.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Bold.ttf',
  'fonts/Roboto-BoldItalic.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-BoldItalic.ttf',
  'fonts/Roboto-Italic.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Italic.ttf',
  'fonts/Roboto-Light.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Light.ttf',
  'fonts/Roboto-LightItalic.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-LightItalic.ttf',
  'fonts/Roboto-Medium.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Medium.ttf',
  'fonts/Roboto-MediumItalic.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-MediumItalic.ttf',
  'fonts/Roboto-Regular.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Regular.ttf',
  'fonts/Roboto-Thin.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Thin.ttf',
  'fonts/Roboto-ThinItalic.ttf': 'https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-ThinItalic.ttf',
  'fonts/SourceSansPro-Bold.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-Bold.otf',
  'fonts/SourceSansPro-BoldIt.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-BoldIt.otf',
  'fonts/SourceSansPro-It.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-It.otf',
  'fonts/SourceSansPro-Light.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-Light.otf',
  'fonts/SourceSansPro-LightIt.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-LightIt.otf',
  'fonts/SourceSansPro-Regular.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-Regular.otf',
  'fonts/SourceSansPro-Semibold.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-Semibold.otf',
  'fonts/SourceSansPro-SemiboldIt.otf': 'https://raw.githubusercontent.com/adobe-fonts/source-sans-pro/2.020R-ro/OTF/SourceSansPro-SemiboldIt.otf'
};
const ASSET_PATHS = {
  '5': ['res.cls'],
  '2': Object.keys(ASSET_SOURCES).filter(path => path !== 'res.cls')
};
const assetCache = new Map();
function bytesToBase64(bytes) {
  let binary = '';
  const size = 0x8000;
  for (let i = 0; i < bytes.length; i += size) binary += String.fromCharCode(...bytes.subarray(i, i + size));
  return btoa(binary);
}
async function loadAsset(path) {
  if (assetCache.has(path)) return assetCache.get(path);
  const response = await fetch(ASSET_SOURCES[path]);
  if (!response.ok) throw new Error(`Asset ${path}: HTTP ${response.status}`);
  const value = bytesToBase64(new Uint8Array(await response.arrayBuffer()));
  assetCache.set(path, value);
  return value;
}
async function templateResources(template) {
  const paths = ASSET_PATHS[template] || [];
  return Promise.all(paths.map(async path => ({ path, file: await loadAsset(path) })));
}
function applyStaticCopy() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = copy[el.dataset.i18n];
    if (value) el.textContent = value;
  });
  document.getElementById('emptyPreview').textContent = copy.empty;
  document.getElementById('texPreview').textContent = copy.latexEmpty;
}

// ---------- LaTeX escaping (nachgebaut aus sanitize-latex) ----------
function escapeLatex(str) {
  if (str == null) return '';
  str = String(str);
  str = str.replace(/\\/g, '\u0000');
  str = str
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
  return str.replace(/\u0000/g, '\\textbackslash{}');
}

// ---------- Collect form data ----------
function collectData() {
  const basics = {
    name: val('name'),
    email: val('email'),
    phone: val('phone'),
    location: { address: val('address') },
    website: val('website'),
  };

  const education = [...document.querySelectorAll('#educationList .card')].map(c => ({
    institution: cval(c, 'institution'),
    location: cval(c, 'location'),
    studyType: cval(c, 'studyType'),
    area: cval(c, 'area'),
    gpa: cval(c, 'gpa'),
    startDate: cval(c, 'startDate'),
    endDate: cval(c, 'endDate'),
  }));

  const work = [...document.querySelectorAll('#workList .card')].map(c => ({
    company: cval(c, 'company'),
    position: cval(c, 'position'),
    location: cval(c, 'location'),
    startDate: cval(c, 'startDate'),
    endDate: cval(c, 'endDate'),
    highlights: [...c.querySelectorAll('.hl-row textarea')].map(t => t.value.trim()).filter(Boolean),
  }));

  const skills = [...document.querySelectorAll('#skillsList .card')].map(c => ({
    name: cval(c, 'name'),
    keywords: (cval(c, 'keywords') || '').split(',').map(s => s.trim()).filter(Boolean),
  }));

  const projects = [...document.querySelectorAll('#projectsList .card')].map(c => ({
    name: cval(c, 'name'),
    description: cval(c, 'description'),
    keywords: (cval(c, 'keywords') || '').split(',').map(s => s.trim()).filter(Boolean),
    url: cval(c, 'url'),
  }));

  const awards = [...document.querySelectorAll('#awardsList .card')].map(c => ({
    title: cval(c, 'title'),
    awarder: cval(c, 'awarder'),
    date: cval(c, 'date'),
    summary: cval(c, 'summary'),
  }));

  const template = currentTemplate();
  return {
    basics, education, work, skills, projects, awards,
    sections: ['profile', 'education', 'work', 'skills', 'projects', 'awards'],
    headings: { education: copy.education, work: copy.work, skills: copy.skills, projects: copy.projects, awards: copy.awards },
    selectedTemplate: Number(template),
    _template: template,
  };
}

function val(id) { return document.getElementById(id).value.trim(); }
function cval(card, name) { const el = card.querySelector(`[data-field="${name}"]`); return el ? el.value.trim() : ''; }

// Template generators are loaded from the following script files.
