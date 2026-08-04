function e(s) { return escapeLatex(s); }

function profileSection_t1(basics) {
  if (!basics) return '';
  const { name, email, phone, website } = basics;
  const address = (basics.location && basics.location.address) || '';
  let line1 = name ? `{\\Huge \\scshape {${e(name)}}}` : '';
  let line2 = [address, email, phone, website].filter(Boolean).map(e).join(' $\\cdot$ ');
  if (line1 && line2) { line1 += '\\\\'; line2 += '\\\\'; }
  return `%==== Profile ====%%
\\vspace*{-10pt}
\\begin{center}
  ${line1}
  ${line2}
\\end{center}`;
}

function educationSection_t1(education, heading) {
  if (!education || !education.length) return '';
  const body = education.map(s => {
    let line1 = '', line2 = '';
    if (s.institution) line1 += `\\textbf{${e(s.institution)}}`;
    if (s.location) line1 += `\\hfill ${e(s.location)}`;
    if (s.studyType) line2 += e(s.studyType);
    if (s.area) line2 += s.studyType ? ` ${e(s.area)}` : `Degree in ${e(s.area)}`;
    if (s.gpa) line2 += ` \\textit{GPA: ${e(s.gpa)}}`;
    if (s.startDate || s.endDate) {
      const gradLine = `${e(s.startDate) || ''} - ${e(s.endDate) || ''}`;
      line2 += line2 ? ` \\hfill ${gradLine}` : gradLine;
    }
    if (line1) line1 += '\\\\';
    if (line2) line2 += '\\\\';
    return `${line1}\n${line2.trim()}\n\\vspace{2mm}`;
  }).join('\n');
  return `%==== Education ====%%
\\header{${e(heading) || 'Education'}}
${body}`;
}

function workSection_t1(work, heading) {
  if (!work || !work.length) return '';
  const body = work.map(job => {
    let line1 = '', line2 = '', highlightLines = '';
    if (job.company) line1 += `\\textbf{${e(job.company)}}`;
    if (job.location) line1 += ` \\hfill ${e(job.location)}`;
    if (job.position) line2 += `\\textit{${e(job.position)}}`;
    if (job.startDate && job.endDate) line2 += ` \\hfill ${e(job.startDate)} - ${e(job.endDate)}`;
    else if (job.startDate) line2 += ` \\hfill ${e(job.startDate)} - Present`;
    else if (job.endDate) line2 += ` \\hfill ${e(job.endDate)}`;
    if (line1) line1 += '\\\\';
    if (line2) line2 += '\\\\';
    if (job.highlights && job.highlights.length) {
      const items = job.highlights.map(h => `\\item ${e(h)}`).join('\n    ');
      highlightLines = `\\vspace{-1mm}
\\begin{itemize} \\itemsep 1pt
    ${items}
\\end{itemize}`;
    }
    return `${line1}\n${line2}\n${highlightLines}`;
  }).join('\n\n');
  return `%==== Experience ====%%
\\header{${e(heading) || 'Experience'}}
\\vspace{1mm}

${body}`;
}

function skillsSection_t1(skills, heading) {
  if (!skills || !skills.length) return '';
  const rows = skills.map(sk => {
    const name = sk.name || 'Misc';
    return `${e(name)}: & ${(sk.keywords || []).map(e).join(', ')} \\\\`;
  }).join('\n');
  return `\\header{${e(heading) || 'Skills'}}
\\begin{tabular}{ l l }
${rows}
\\end{tabular}
\\vspace{2mm}`;
}

function projectsSection_t1(projects, heading) {
  if (!projects || !projects.length) return '';
  const body = projects.map(p => {
    let line1 = '', line2 = p.description ? e(p.description) : '';
    if (p.name) line1 += `{\\textbf{${e(p.name)}}}`;
    if (p.keywords && p.keywords.length) line1 += ` {\\sl ${p.keywords.map(e).join(', ')}} `;
    if (p.url) line1 += `\\hfill ${e(p.url)}`;
    if (line1) line1 += '\\\\';
    if (line2) line2 += '\\\\';
    return `${line1}\n${line2}\n\\vspace*{2mm}`;
  }).join('\n');
  return `\\header{${e(heading) || 'Projects'}}
${body}`;
}

function awardsSection_t1(awards, heading) {
  if (!awards || !awards.length) return '';
  const body = awards.map(a => {
    let line1 = '', line2 = a.summary ? e(a.summary) : '';
    if (a.title) line1 += `\\textbf{${e(a.title)}}`;
    if (a.awarder) line1 += ` \\hfill ${e(a.awarder)}`;
    if (a.date) line2 += ` \\hfill ${e(a.date)}`;
    if (line1) line1 += '\\\\';
    if (line2) line2 += '\\\\';
    return `${line1}\n${line2}\n\\vspace*{2mm}`;
  }).join('\n');
  return `\\header{${e(heading) || 'Awards'}}
${body}`;
}

function resumeDefinitions_t1() {
  return `\\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

\\newcommand{\\area} [2] {
    \\vspace*{-9pt}
    \\begin{verse}
        \\textbf{#1}   #2
    \\end{verse}
}

\\newcommand{\\lineunder} {
    \\vspace*{-8pt} \\\\
    \\hspace*{-18pt} \\hrulefill \\\\
}

\\newcommand{\\header} [1] {
    {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
    \\vspace*{-6pt} \\lineunder
}

\\newcommand{\\employer} [3] {
    { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
}

\\newcommand{\\contact} [3] {
    \\vspace*{-10pt}
    \\begin{center}
        {\\Huge \\scshape {#1}}\\\\
        #2 \\\\ #3
    \\end{center}
    \\vspace*{-8pt}
}

\\newenvironment{achievements}{
    \\begin{list}
        {$\\bullet$}{\\topsep 0pt \\itemsep -2pt}}{\\vspace*{4pt}
    \\end{list}
}

\\newcommand{\\schoolwithcourses} [4] {
    \\textbf{#1} #2 $\\bullet$ #3\\\\
    #4 \\\\
    \\vspace*{5pt}
}

\\newcommand{\\school} [4] {
    \\textbf{#1} #2 $\\bullet$ #3\\\\
    #4 \\\\
}`;
}

function buildTex_t1(values) {
  const headings = values.headings || {};
  const sectionsOut = values.sections.map(section => {
    switch (section) {
      case 'profile': return profileSection_t1(values.basics);
      case 'education': return educationSection_t1(values.education, headings.education);
      case 'work': return workSection_t1(values.work, headings.work);
      case 'skills': return skillsSection_t1(values.skills, headings.skills);
      case 'projects': return projectsSection_t1(values.projects, headings.projects);
      case 'awards': return awardsSection_t1(values.awards, headings.awards);
      default: return '';
    }
  }).filter(Boolean).join('\n\n');

  return `\\documentclass[a4paper]{article}
\\usepackage{fullpage}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{textcomp}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\textheight=10in
\\pagestyle{empty}
\\raggedright
\\usepackage[left=0.8in,right=0.8in,bottom=0.8in,top=0.8in]{geometry}

${resumeDefinitions_t1()}

\\begin{document}
\\vspace*{-40pt}

${sectionsOut}

\\ 
\\end{document}`;
}



// ---------- Template 2 generator (Awesome-CV, ported from resumake.io) ----------
