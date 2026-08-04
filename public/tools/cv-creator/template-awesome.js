function profileSection_t2(basics) {
  if (!basics) return '';
  const { name, email, phone, website } = basics;
  const address = (basics.location && basics.location.address) || '';
  let nameLine = '';
  if (name) {
    const names = name.split(' ');
    let nameStart = names[0];
    let nameEnd = names.length === 1 ? '' : names.slice(1).join(' ');
    nameLine = `\\headerfirstnamestyle{${e(nameStart)}} \\headerlastnamestyle{${e(nameEnd)}} \\\\`;
  }
  const emailLine = email ? `{\\faEnvelope\\ ${e(email)}}` : '';
  const phoneLine = phone ? `{\\faMobile\\ ${e(phone)}}` : '';
  const addressLine = address ? `{\\faMapMarker\\ ${e(address)}}` : '';
  const websiteLine = website ? `{\\faLink\\ ${e(website)}}` : '';
  const info = [emailLine, phoneLine, addressLine, websiteLine].filter(Boolean).join(' | ');
  return `\\begin{center}
${nameLine}
\\vspace{2mm}
${info}
\\end{center}`;
}

function dateRange_t2(startDate, endDate) {
  if (startDate && endDate) return `${e(startDate)} – ${e(endDate)}`;
  if (startDate) return `${e(startDate)} – ${e(copy.current)}`;
  return e(endDate) || '';
}

function educationSection_t2(education, heading) {
  if (!education || !education.length) return '';
  const entries = education.map(s => {
    let degree = '';
    if (s.studyType && s.area) degree = `${e(s.studyType)} in ${e(s.area)}`;
    else if (s.studyType || s.area) degree = e(s.studyType || s.area);
    return `\\cventry
{${degree}}
{${e(s.institution) || ''}}
{${e(s.location) || ''}}
{${dateRange_t2(s.startDate, s.endDate)}}
{${s.gpa ? `GPA: ${e(s.gpa)}` : ''}}`;
  }).join('\n');
  return `\\cvsection{${e(heading) || 'Education'}}
\\begin{cventries}
${entries}
\\end{cventries}
\\vspace{-2mm}`;
}

function workSection_t2(work, heading) {
  if (!work || !work.length) return '';
  const entries = work.map(job => {
    let dutyLines = '';
    if (job.highlights && job.highlights.length) {
      const items = job.highlights.map(h => `\\item {${e(h)}}`).join('\n');
      dutyLines = `\\begin{cvitems}\n${items}\n\\end{cvitems}`;
    }
    return `\\cventry
{${e(job.position) || ''}}
{${e(job.company) || ''}}
{${e(job.location) || ''}}
{${dateRange_t2(job.startDate, job.endDate)}}
{${dutyLines}}`;
  }).join('\n');
  return `\\cvsection{${e(heading) || 'Experience'}}
\\begin{cventries}
${entries}
\\end{cventries}`;
}

function skillsSection_t2(skills, heading) {
  if (!skills || !skills.length) return '';
  const rows = skills.map(sk => {
    const nameLine = sk.name ? `${e(sk.name)}: ` : '';
    const details = `{\\skill{ ${(sk.keywords || []).map(e).join(', ')}}}`;
    return `${nameLine} & ${details} \\\\`;
  }).join('\n');
  return `\\cvsection{${e(heading) || 'Skills'}}
\\begin{cventries}
\\cventry
{}
{\\def\\arraystretch{1.15}{\\begin{tabular}{ l l }
${rows}
\\end{tabular}}}
{}
{}
{}
\\end{cventries}
\\vspace{-7mm}`;
}

function projectsSection_t2(projects, heading) {
  if (!projects || !projects.length) return '';
  const entries = projects.map(p => {
    return `\\cventry
{${e(p.description) || ''}}
{${e(p.name) || ''}}
{${(p.keywords || []).map(e).join(', ')}}
{${e(p.url) || ''}}
{}

\\vspace{-5mm}`;
  }).join('\n');
  return `\\cvsection{${e(heading) || 'Projects'}}
\\begin{cventries}
${entries}
\\end{cventries}`;
}

function awardsSection_t2(awards, heading) {
  if (!awards || !awards.length) return '';
  const entries = awards.map(a => {
    return `\\cvhonor
{${e(a.title) || ''}}
{${e(a.summary) || ''}}
{${e(a.awarder) || ''}}
{${e(a.date) || ''}}`;
  }).join('\n');
  return `\\cvsection{${e(heading) || 'Awards'}}
\\begin{cvhonors}
${entries}
\\end{cvhonors}`;
}

function safeCvItemsEnvironment_t2() {
  return `\\renewenvironment{cvitems}{
  \\vspace{-1mm}
  \\begin{justify}
  \\begin{itemize}[leftmargin=2ex, topsep=0pt, partopsep=0pt, parsep=0pt, itemsep=0.35mm]
  \\setlength{\\parskip}{0pt}
  \\renewcommand{\\labelitemi}{\\bullet}
}{
  \\end{itemize}
  \\end{justify}
  \\vspace{1mm}
}`;
}

function buildTex_t2(values) {
  const headings = values.headings || {};
  const sectionsOut = values.sections.map(section => {
    switch (section) {
      case 'profile': return profileSection_t2(values.basics);
      case 'education': return educationSection_t2(values.education, headings.education);
      case 'work': return workSection_t2(values.work, headings.work);
      case 'skills': return skillsSection_t2(values.skills, headings.skills);
      case 'projects': return projectsSection_t2(values.projects, headings.projects);
      case 'awards': return awardsSection_t2(values.awards, headings.awards);
      default: return '';
    }
  }).filter(Boolean).join('\n');

  return `%!TEX TS-program = xelatex
%!TEX encoding = UTF-8 Unicode
\\documentclass[]{awesome-cv}
\\usepackage{textcomp}
\\fontdir[fonts/]
\\newcommand*{\\sectiondir}{resume/}
\\colorlet{awesome}{awesome-red}
${safeCvItemsEnvironment_t2()}
\\begin{document}
${sectionsOut}
\\ 
\\end{document}`;
}


// ---------- Template 5 generator (res.cls, ported from resumake.io) ----------
