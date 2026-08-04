function profileSection_t5(basics) {
  if (!basics) return '';
  const { name, email, phone, website } = basics;
  const address = (basics.location && basics.location.address) || '';
  const info = [email, phone, address, website].filter(Boolean).map(e).join(' | ');
  return `\\name{{\\LARGE ${e(name) || ''}}}
\\address{${info}}`;
}

function educationSection_t5(education, heading) {
  if (!education || !education.length) return '';
  const last = education.length - 1;
  const body = education.map((s, i) => {
    let line = '';
    if (s.institution) line += `\\textbf{${e(s.institution)}}, `;
    let degree = '';
    if (s.studyType && s.area) degree = `${e(s.studyType)} in ${e(s.area)}`;
    else if (s.studyType || s.area) degree = e(s.studyType || s.area);
    if (degree) line += `{\\sl ${degree}} `;
    if (s.gpa) line += `GPA: ${e(s.gpa)}`;
    let dateRange = '';
    if (s.startDate && s.endDate) dateRange = `${e(s.startDate)} | ${e(s.endDate)}`;
    else if (s.startDate) dateRange = `${e(s.startDate)} | Present`;
    else dateRange = e(s.endDate);
    if (dateRange) line += `\\hfill ${dateRange}`;
    if (line) line += '\\\\';
    if (s.location) line += `${e(s.location)}`;
    if (i !== last) line += '\\\\\\\\';
    return line;
  }).join('\n');
  return `\\section{${e(heading) || 'EDUCATION'}}
${body}`;
}

function workSection_t5(work, heading) {
  if (!work || !work.length) return '';
  const body = work.map(job => {
    let line = '', dateRange = '';
    if (job.company) line += `\\textbf{${e(job.company)}}, `;
    if (job.position) line += `{\\sl ${e(job.position)}}`;
    if (job.startDate && job.endDate) dateRange = `${e(job.startDate)} | ${e(job.endDate)}`;
    else if (job.startDate) dateRange = `${e(job.startDate)} | Present`;
    else dateRange = e(job.endDate);
    if (dateRange) line += `\\hfill ${dateRange}`;
    if (line) line += '\\\\';
    if (job.location) line += `${e(job.location)}\\\\`;
    if (job.highlights && job.highlights.length) {
      const items = job.highlights.map(h => `\\item ${e(h)}`).join('\n');
      line += `\\begin{itemize} \\itemsep 3pt
${items}
\\end{itemize}`;
    }
    return line;
  }).join('\n');
  return `\\section{${e(heading) || 'EXPERIENCE'}}
${body}`;
}

function skillsSection_t5(skills, heading) {
  if (!skills || !skills.length) return '';
  const rows = skills.map(sk =>
    `\\textbf{${e(sk.name) || ''}}: & ${(sk.keywords || []).map(e).join(', ')}\\\\`
  ).join('\n');
  return `\\section{${e(heading) || 'SKILLS'}}
\\begin{tabular}{@{}ll}
${rows}
\\end{tabular}`;
}

function projectsSection_t5(projects, heading) {
  if (!projects || !projects.length) return '';
  const body = projects.map(p => {
    let line = '';
    if (p.name) line += `\\textbf{${e(p.name)}}`;
    if (p.keywords && p.keywords.length) line += `, {\\sl ${p.keywords.map(e).join(', ')}}`;
    if (p.description) line += line ? `\\\\ ${e(p.description)}` : e(p.description);
    if (p.url) line += line ? `\\\\ ${e(p.url)}` : e(p.url);
    if (line) line += '\\\\\\\\';
    return line;
  }).join('\n');
  return `\\section{${e(heading) || 'PROJECTS'}}
${body}`;
}

function awardsSection_t5(awards, heading) {
  if (!awards || !awards.length) return '';
  const body = awards.map(a =>
    `\\textbf{${e(a.title) || ''}}, {\\sl ${e(a.awarder) || ''}} \\hfill ${e(a.date) || ''} \\\\
${e(a.summary) || ''} \\\\\\\\`
  ).join('\n');
  return `\\section{${e(heading) || 'AWARDS'}}
${body}`;
}

function buildTex_t5(values) {
  const headings = values.headings || {};
  const sectionsOut = values.sections.map(section => {
    switch (section) {
      case 'education': return educationSection_t5(values.education, headings.education);
      case 'work': return workSection_t5(values.work, headings.work);
      case 'skills': return skillsSection_t5(values.skills, headings.skills);
      case 'projects': return projectsSection_t5(values.projects, headings.projects);
      case 'awards': return awardsSection_t5(values.awards, headings.awards);
      default: return '';
    }
  }).filter(Boolean).join('\n\n');

  return `\\documentclass[line,margin]{res}
\\usepackage[none]{hyphenat}
\\usepackage{textcomp}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\begin{document}
${profileSection_t5(values.basics)}
\\begin{resume}
\\vspace{-5mm}
${sectionsOut}
\\end{resume}
\\end{document}`;
}

// ---------- Dispatcher: choose template ----------
