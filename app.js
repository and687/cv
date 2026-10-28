const STORAGE_KEY = "andrea-cv-data-v1";
const LANGUAGE_KEY = "andrea-cv-language";
const projectList = document.querySelector("#cv-projects");
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");
const supabaseStatus = document.querySelector("#supabase-status");
const fallbackProjects = [
  { title: "projet-RED", description: "Projet d’immersion réalisé avec Christophe.", technology: "Go", url: "https://github.com/and687/projet-RED" },
  { title: "portfolio", description: "Site web portfolio personnel.", technology: "HTML", url: "https://github.com/and687/portfolio" },
  { title: "premier_jeu_web", description: "Projet de jeu web réalisé en HTML.", technology: "HTML", url: "https://github.com/and687/premier_jeu_web" },
  { title: "azuria-yboost", description: "Projet Azuria réalisé dans le cadre de Yboost.", technology: "Yboost", url: "https://github.com/and687/azuria-yboost" }
];
let projects = fallbackProjects;

const translations = {
  fr: {
    mainNavigation: "Navigation principale",
    toggleNavigation: "Afficher ou masquer la navigation",
    navProfile: "Profil",
    navExperience: "Expériences",
    navEducation: "Formation",
    navProjects: "Projets",
    navContact: "Contact",
    onlineResume: "CV en ligne",
    aboutLabel: "À propos",
    profileTitle: "Qui suis-je ?",
    qualities: "Qualités",
    careerLabel: "Parcours professionnel",
    experiencesTitle: "Expériences professionnelles",
    studiesLabel: "Études",
    educationTitle: "Formation",
    achievementsLabel: "Réalisations",
    projectsTitle: "Projets",
    redDescription: "Projet d’immersion réalisé avec Christophe.",
    portfolioDescription: "Site web portfolio personnel.",
    firstGame: "Premier jeu web",
    gameDescription: "Projet de jeu web réalisé en HTML.",
    azuriaDescription: "Projet Azuria réalisé dans le cadre de Yboost.",
    resumeProject: "CV en ligne responsive",
    resumeProjectDescription: "Maquette de CV réalisée avec HTML, CSS, Bootstrap 5 et JavaScript, avec une interface adaptée aux écrans mobiles.",
    githubLink: "Voir le dépôt GitHub",
    completed: "Maquette réalisée",
    resumeProgress: "Avancement de la maquette du CV",
    letsConnect: "Échangeons",
    contactTitle: "Contact",
    contactFormTitle: "Envoyer un message",
    contactName: "Votre nom",
    contactEmail: "Votre adresse e-mail",
    contactSubject: "Objet",
    contactMessage: "Votre message",
    contactSend: "Envoyer le message",
    contactSending: "Envoi en cours…",
    contactSent: "Message envoyé. Merci pour votre prise de contact.",
    contactSendError: "L’envoi du message a échoué",
    contactSetupRequired: "Le formulaire sera disponible une fois Supabase configuré.",
    supabaseSetupRequired: "Les données affichées sont locales. Configurez supabase-config.js pour les charger depuis Supabase.",
    address: "Adresse",
    email: "E-mail",
    phone: "Téléphone",
    drivingLicense: "Permis",
    licenseB: "Permis B",
    adminButton: "Administrer mon CV",
    adminTitle: "Modifier le contenu du CV",
    adminDescription: "Les modifications sont enregistrées dans ce navigateur. Pense à exporter une sauvegarde JSON pour les conserver ou les transférer.",
    profileLegend: "Profil",
    name: "Nom",
    headline: "Titre / formation actuelle",
    introduction: "Présentation",
    skillsLabel: "Qualités (séparées par des virgules)",
    emailAddress: "Adresse e-mail",
    postalAddress: "Adresse postale",
    addExperience: "Ajouter une expérience",
    addEducation: "Ajouter une formation",
    saveChanges: "Enregistrer les modifications",
    exportBackup: "Exporter une sauvegarde",
    importBackup: "Importer une sauvegarde",
    resetResume: "Réinitialiser le CV",
    footerTagline: "Étudiant en informatique et cybersécurité à Ynov Sophia Antipolis.",
    projectArchitecture: "Architecture du projet",
    backToTop: "Retour en haut ↑",
    copyright: "© Tous droits réservés",
    switchLanguage: "Switch to English",
    adminSaved: "CV enregistré dans ce navigateur.",
    adminSaveError: "La sauvegarde a échoué",
    adminInvalid: "Vérifie les champs obligatoires et le contenu des expériences/formations.",
    adminImportError: "Import impossible",
    invalidImport: "Le fichier ne correspond pas au format attendu.",
    resetConfirm: "Réinitialiser le CV avec les données d'origine ?",
    jobBeachAttendant: "Plagiste",
    jobBartender: "Barman",
    jobRestaurant: "Employé polyvalent de restauration",
    jobEventManager: "Manager en événementiel",
    dateJune2020: "Juin 2020",
    dateJune2021: "Juin 2021",
    dateJune2022: "Juin 2022",
    dateJune2023: "Juin 2023",
    dateSinceSeptember2026: "Depuis septembre 2026",
    bachelor: "Bachelor 1 Informatique",
    inProgress: "En cours",
    highSchool: "Baccalauréat STMG, option mercatique",
    educationLocation: "Lycée Bristol — Cannes",
    skillDynamic: "Dynamique",
    skillVersatile: "Polyvalent",
    skillOrganized: "Organisé",
    skillTeamwork: "Esprit d'équipe",
    skillCustomerRelations: "Relation client",
    missionBeachSetup: "Mise en place et préparation de la plage",
    missionOrders: "Prise en charge des commandes",
    missionCustomerService: "Accueil et relation avec la clientèle",
    missionBarManagement: "Gestion du bar",
    missionDrinks: "Préparation et service des boissons",
    missionStock: "Suivi et gestion des stocks",
    missionBartenderMaître: "Service comme barman et maître d'hôtel",
    missionTeamManagement: "Gestion et coordination des équipes",
    missionEvents: "Mise en place des événements",
    editorPosition: "Poste",
    editorDegree: "Diplôme / formation",
    editorCompany: "Entreprise",
    editorSchool: "Établissement",
    editorDate: "Date ou période",
    editorMissions: "Missions (une par ligne)",
    editorNote: "Précision (ex. : En cours)",
    editorRemove: "Supprimer"
  },
  en: {
    mainNavigation: "Main navigation",
    toggleNavigation: "Toggle navigation",
    navProfile: "Profile",
    navExperience: "Experience",
    navEducation: "Education",
    navProjects: "Projects",
    navContact: "Contact",
    onlineResume: "Online résumé",
    aboutLabel: "About me",
    profileTitle: "Who am I?",
    qualities: "Strengths",
    careerLabel: "Career path",
    experiencesTitle: "Professional experience",
    studiesLabel: "Studies",
    educationTitle: "Education",
    achievementsLabel: "Selected work",
    projectsTitle: "Projects",
    redDescription: "Immersion project created with Christophe.",
    portfolioDescription: "Personal portfolio website.",
    firstGame: "First web game",
    gameDescription: "HTML-based web game project.",
    azuriaDescription: "Azuria project created as part of Yboost.",
    resumeProject: "Responsive online résumé",
    resumeProjectDescription: "Responsive résumé mock-up built with HTML, CSS, Bootstrap 5 and JavaScript.",
    githubLink: "View GitHub repository",
    completed: "Mock-up completed",
    resumeProgress: "Résumé mock-up progress",
    letsConnect: "Let’s connect",
    contactTitle: "Contact",
    contactFormTitle: "Send a message",
    contactName: "Your name",
    contactEmail: "Your email address",
    contactSubject: "Subject",
    contactMessage: "Your message",
    contactSend: "Send message",
    contactSending: "Sending…",
    contactSent: "Message sent. Thank you for getting in touch.",
    contactSendError: "Message could not be sent",
    contactSetupRequired: "The form will be available once Supabase is configured.",
    supabaseSetupRequired: "The displayed content is local. Configure supabase-config.js to load it from Supabase.",
    address: "Address",
    email: "Email",
    phone: "Phone",
    drivingLicense: "Driving licence",
    licenseB: "Category B",
    adminButton: "Manage my résumé",
    adminTitle: "Edit résumé content",
    adminDescription: "Changes are saved in this browser. Export a JSON backup to keep or transfer them.",
    profileLegend: "Profile",
    name: "Name",
    headline: "Headline / current studies",
    introduction: "Introduction",
    skillsLabel: "Strengths (comma-separated)",
    emailAddress: "Email address",
    postalAddress: "Postal address",
    addExperience: "Add experience",
    addEducation: "Add education",
    saveChanges: "Save changes",
    exportBackup: "Export backup",
    importBackup: "Import backup",
    resetResume: "Reset résumé",
    footerTagline: "Computer science and cybersecurity student at Ynov Sophia Antipolis.",
    projectArchitecture: "Project architecture",
    backToTop: "Back to top ↑",
    copyright: "© All rights reserved",
    switchLanguage: "Passer en français",
    adminSaved: "Résumé saved in this browser.",
    adminSaveError: "Saving failed",
    adminInvalid: "Check required fields and the experience/education entries.",
    adminImportError: "Import failed",
    invalidImport: "The file format is not supported.",
    resetConfirm: "Reset the résumé to its original content?",
    jobBeachAttendant: "Beach attendant",
    jobBartender: "Bartender",
    jobRestaurant: "Restaurant team member",
    jobEventManager: "Event manager",
    dateJune2020: "June 2020",
    dateJune2021: "June 2021",
    dateJune2022: "June 2022",
    dateJune2023: "June 2023",
    dateSinceSeptember2026: "Since September 2026",
    bachelor: "First-year Bachelor’s in Computer Science",
    inProgress: "In progress",
    highSchool: "STMG Baccalauréat, Marketing specialisation",
    educationLocation: "Lycée Bristol — Cannes",
    skillDynamic: "Dynamic",
    skillVersatile: "Versatile",
    skillOrganized: "Organized",
    skillTeamwork: "Teamwork",
    skillCustomerRelations: "Customer relations",
    missionBeachSetup: "Set up and prepared the beach",
    missionOrders: "Handled customer orders",
    missionCustomerService: "Welcomed and assisted customers",
    missionBarManagement: "Managed the bar",
    missionDrinks: "Prepared and served drinks",
    missionStock: "Monitored and managed stock",
    missionBartenderMaître: "Worked as a bartender and maître d’hôtel",
    missionTeamManagement: "Managed and coordinated teams",
    missionEvents: "Set up events",
    editorPosition: "Job title",
    editorDegree: "Degree / course",
    editorCompany: "Company",
    editorSchool: "Institution",
    editorDate: "Date or period",
    editorMissions: "Responsibilities (one per line)",
    editorNote: "Note (e.g. In progress)",
    editorRemove: "Remove"
  }
};

const contentTranslations = {
  "Étudiant en Bachelor 1 Informatique à Ynov Sophia Antipolis": "First-year Computer Science student at Ynov Sophia Antipolis",
  "Étudiant en cybersécurité à Ynov Sophia Antipolis, dynamique, polyvalent et organisé, je m'adapte facilement aux différentes situations. Autonome et à l'aise en équipe, je suis également à l'aise avec la clientèle, motivé et impliqué dans mes missions.": "Cybersecurity student at Ynov Sophia Antipolis. Dynamic, versatile and organised, I adapt easily to new situations. Independent and comfortable working in a team, I also enjoy customer-facing roles and approach every task with motivation and commitment.",
  "Dynamique": "Dynamic",
  "Polyvalent": "Versatile",
  "Organisé": "Organized",
  "Esprit d'équipe": "Teamwork",
  "Relation client": "Customer relations",
  "Plagiste": "Beach attendant",
  "Barman": "Bartender",
  "Employé polyvalent de restauration": "Restaurant team member",
  "Manager en événementiel": "Event manager",
  "Juin 2020": "June 2020",
  "Juin 2021": "June 2021",
  "Juin 2022": "June 2022",
  "Juin 2023": "June 2023",
  "Depuis septembre 2026": "Since September 2026",
  "Bachelor 1 Informatique": "First-year Bachelor’s in Computer Science",
  "En cours": "In progress",
  "Baccalauréat STMG, option mercatique": "STMG Baccalauréat, Marketing specialisation",
  "Lycée Bristol — Cannes": "Lycée Bristol — Cannes",
  "Mise en place et préparation de la plage": "Set up and prepared the beach",
  "Prise en charge des commandes": "Handled customer orders",
  "Accueil et relation avec la clientèle": "Welcomed and assisted customers",
  "Gestion du bar": "Managed the bar",
  "Préparation et service des boissons": "Prepared and served drinks",
  "Suivi et gestion des stocks": "Monitored and managed stock",
  "Service comme barman et maître d'hôtel": "Worked as a bartender and maître d’hôtel",
  "Gestion et coordination des équipes": "Managed and coordinated teams",
  "Gestion des stocks": "Managed stock",
  "Mise en place des événements": "Set up events",
  "projet-RED": "RED project",
  "Projet d’immersion réalisé avec Christophe.": "Immersion project created with Christophe.",
  "portfolio": "Portfolio",
  "Site web portfolio personnel.": "Personal portfolio website.",
  "premier_jeu_web": "First web game",
  "Projet de jeu web réalisé en HTML.": "HTML-based web game project.",
  "azuria-yboost": "Azuria Yboost",
  "Projet Azuria réalisé dans le cadre de Yboost.": "Azuria project created as part of Yboost."
};

const defaultCv = {
  name: "Andrea AMATO",
  headline: "Étudiant en Bachelor 1 Informatique à Ynov Sophia Antipolis",
  about: "Étudiant en cybersécurité à Ynov Sophia Antipolis, dynamique, polyvalent et organisé, je m'adapte facilement aux différentes situations. Autonome et à l'aise en équipe, je suis également à l'aise avec la clientèle, motivé et impliqué dans mes missions.",
  email: "andrea.amato375@gmail.com",
  phone: "0777966219",
  address: "3 rond-point du Minangoy, Mougins",
  skills: ["Dynamique", "Polyvalent", "Organisé", "Esprit d'équipe", "Relation client"],
  experiences: [
    {
      date: "Juin 2020",
      title: "Plagiste",
      organization: "Rêve Plage",
      details: ["Mise en place et préparation de la plage", "Prise en charge des commandes", "Accueil et relation avec la clientèle"]
    },
    {
      date: "Juin 2021",
      title: "Barman",
      organization: "Rêve Plage",
      details: ["Gestion du bar", "Préparation et service des boissons", "Suivi et gestion des stocks"]
    },
    {
      date: "Juin 2022",
      title: "Employé polyvalent de restauration",
      organization: "Bouche en Bouche",
      details: ["Service comme barman et maître d'hôtel", "Accueil et relation avec la clientèle"]
    },
    {
      date: "Juin 2023",
      title: "Manager en événementiel",
      organization: "Cannes Lions",
      details: ["Gestion et coordination des équipes", "Gestion des stocks", "Mise en place des événements", "Accueil et relation avec la clientèle"]
    }
  ],
  education: [
    {
      date: "Depuis septembre 2026",
      title: "Bachelor 1 Informatique",
      organization: "Ynov Sophia Antipolis",
      details: "En cours"
    },
    {
      date: "2020 – 2021",
      title: "Baccalauréat STMG, option mercatique",
      organization: "Lycée Bristol — Cannes",
      details: ""
    }
  ]
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const experienceList = document.querySelector("#cv-experiences");
const educationList = document.querySelector("#cv-education");
const adminForm = document.querySelector("#admin-form");
const statusMessage = document.querySelector("#admin-status");
let language = "fr";
let supabaseClient = null;
let supabaseInitError = null;
const supabaseConfig = window.SUPABASE_CONFIG || {};
const hasSupabaseConfig = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

if (hasSupabaseConfig && window.supabase && typeof window.supabase.createClient === "function") {
  try {
    supabaseClient = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
  } catch (error) {
    supabaseInitError = error.message;
  }
}

try {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage === "en" || savedLanguage === "fr") language = savedLanguage;
} catch (error) {
  statusMessage.textContent = `Impossible de lire la préférence de langue : ${error.message}`;
  statusMessage.classList.add("text-danger");
}

function t(key) {
  return translations[language][key] || translations.fr[key] || key;
}

function localizeContent(value) {
  return language === "en" ? (contentTranslations[value] || value) : value;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = language === "en" ? `${cv.name} — Online résumé` : `${cv.name} — CV en ligne`;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  const toggle = document.querySelector("#language-toggle");
  toggle.textContent = language === "fr" ? "EN" : "FR";
  toggle.setAttribute("aria-label", t("switchLanguage"));
  document.querySelector("#footer-year").textContent = new Date().getFullYear();
  if (!hasSupabaseConfig) supabaseStatus.textContent = t("supabaseSetupRequired");

  if (adminForm.dataset.ready === "true") {
    renderEditorEntries(document.querySelector("#edit-experiences"),
      readEditorEntries(document.querySelector("#edit-experiences"), "experience"), "experience");
    renderEditorEntries(document.querySelector("#edit-education"),
      readEditorEntries(document.querySelector("#edit-education"), "education"), "education");
  }
}

document.querySelector("#language-toggle").addEventListener("click", () => {
  language = language === "fr" ? "en" : "fr";
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    statusMessage.textContent = `Impossible d’enregistrer la langue : ${error.message}`;
    statusMessage.classList.remove("text-success");
    statusMessage.classList.add("text-danger");
  }
  applyLanguage();
  renderCv();
});
const canAnimateOnScroll = "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealObserver = canAnimateOnScroll
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" })
  : null;

if (revealObserver) document.body.classList.add("motion-ready");

function observeContentCards() {
  if (!revealObserver) return;
  document.querySelectorAll(
    ".cv-section, #profil .content-card, #cv-experiences > .accordion-item, " +
    "#cv-projects > .accordion-item, #cv-education > div, #contact .contact-item, #administration"
  )
    .forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.transitionDelay = `${(index % 4) * 90}ms`;
      revealObserver.observe(element);
    });

  document.querySelectorAll(
    ".cv-section .section-label, .cv-section > h2, .cv-section .content-card p, " +
    ".cv-section .content-card h3, .cv-section .content-card li, " +
    "#cv-experiences .accordion-button .experience-title, #cv-projects .accordion-button .experience-title, " +
    "#cv-experiences .accordion-body li, #cv-projects .accordion-body p, " +
    "#cv-projects .accordion-body a, #contact .contact-item h3, " +
    "#contact .contact-item address, #contact .contact-link, .site-footer .footer-link, .site-footer .footer-copy"
  )
    .forEach((element, index) => {
      if (element.classList.contains("text-reveal")) return;
      element.classList.add("text-reveal");
      element.style.transitionDelay = `${(index % 5) * 55}ms`;
      revealObserver.observe(element);
    });
}

function isValidCv(value) {
  const isText = (item) => typeof item === "string";
  const hasEntries = (items, withDetails) => Array.isArray(items) && items.every((item) =>
    item && isText(item.date) && isText(item.title) && isText(item.organization) &&
    (withDetails ? Array.isArray(item.details) && item.details.every(isText) : isText(item.details))
  );

  return value && isText(value.name) && isText(value.headline) && isText(value.about) &&
    (value.email === undefined || (isText(value.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))) &&
    (value.phone === undefined || (isText(value.phone) && /^[0-9+().\s-]+$/.test(value.phone))) &&
    (value.address === undefined || isText(value.address)) &&
    Array.isArray(value.skills) && value.skills.every(isText) &&
    hasEntries(value.experiences, true) && hasEntries(value.education, false);
}

function readStoredCv() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return clone(defaultCv);
    const parsed = JSON.parse(saved);
    if (!parsed.email) parsed.email = defaultCv.email;
    if (!parsed.phone) parsed.phone = defaultCv.phone;
    if (!parsed.address) parsed.address = defaultCv.address;
    if (!isValidCv(parsed)) throw new Error("Le format des données enregistrées est invalide.");
    return parsed;
  } catch (error) {
    statusMessage.textContent = `Impossible de lire la sauvegarde locale : ${error.message}`;
    statusMessage.classList.add("text-danger");
    return clone(defaultCv);
  }
}

let cv = readStoredCv();

function addText(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function renderCv() {
  document.querySelector("#cv-name").textContent = cv.name;
  document.querySelector(".navbar-brand").textContent = cv.name;
  document.querySelector("#cv-headline").textContent = localizeContent(cv.headline);
  document.querySelector("#cv-about").textContent = localizeContent(cv.about);
  document.querySelector("#footer-name").textContent = `${cv.name} — ${language === "en" ? "Online résumé" : "CV en ligne"}`;
  document.querySelector("#contact-address").textContent = cv.address;
  const contactLink = document.querySelector("#contact-email-link");
  contactLink.href = `mailto:${cv.email}`;
  document.querySelector("#contact-email-text").textContent = cv.email;
  const phoneLink = document.querySelector("#contact-phone-link");
  phoneLink.href = `tel:${cv.phone.replace(/[^\d+]/g, "")}`;
  document.querySelector("#contact-phone-text").textContent = cv.phone;

  const skills = document.querySelector("#cv-skills");
  skills.replaceChildren();
  cv.skills.forEach((skill) => addText(skills, "span", "badge rounded-pill text-bg-secondary", localizeContent(skill)));

  renderProjects(projects);

  experienceList.replaceChildren();
  cv.experiences.forEach((experience, index) => {
    const item = document.createElement("article");
    item.className = "accordion-item";

    const heading = document.createElement("h3");
    heading.className = "accordion-header";
    const button = document.createElement("button");
    button.className = "accordion-button collapsed";
    button.type = "button";
    button.dataset.bsToggle = "collapse";
    button.dataset.bsTarget = `#experience-details-${index}`;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `experience-details-${index}`);

    const title = document.createElement("span");
    title.className = "experience-title";
    title.textContent = localizeContent(experience.title);
    if (experience.organization) {
      const organization = document.createElement("span");
      organization.className = "text-secondary fw-normal experience-organization";
      organization.textContent = ` — ${experience.organization}`;
      title.append(organization);
    }

    const date = addText(button, "span", "badge rounded-pill text-bg-secondary experience-date", localizeContent(experience.date));
    button.prepend(title);
    button.append(date);
    heading.append(button);

    const collapse = document.createElement("div");
    collapse.className = "accordion-collapse collapse";
    collapse.id = `experience-details-${index}`;
    collapse.dataset.bsParent = "#cv-experiences";
    const body = document.createElement("div");
    body.className = "accordion-body";
    const list = document.createElement("ul");
    list.className = "mb-0 experience-missions";
    experience.details.filter(Boolean).forEach((detail) => addText(list, "li", "", localizeContent(detail)));
    body.append(list);
    collapse.append(body);
    item.append(heading, collapse);
    experienceList.append(item);
  });
  observeContentCards();

  educationList.replaceChildren();
  cv.education.forEach((education) => {
    const column = document.createElement("div");
    column.className = "col-md-6";
    const card = document.createElement("article");
    card.className = "card content-card";
    const body = document.createElement("div");
    body.className = "card-body";
    addText(body, "p", "date-label mb-2", localizeContent(education.date));
    addText(body, "h3", "card-title h5 fw-bold", localizeContent(education.title));
    addText(body, "p", "mb-0", [localizeContent(education.organization), localizeContent(education.details)].filter(Boolean).join(" — "));
    card.append(body);
    column.append(card);
    educationList.append(column);
  });
  observeContentCards();
}

function renderProjects(projects) {
  projectList.replaceChildren();
  projects.forEach((project, index) => {
    const item = document.createElement("article");
    item.className = "accordion-item";

    const heading = document.createElement("h3");
    heading.className = "accordion-header";
    heading.id = `project-heading-${index}`;
    const button = document.createElement("button");
    button.className = "accordion-button collapsed";
    button.type = "button";
    button.dataset.bsToggle = "collapse";
    button.dataset.bsTarget = `#project-details-${index}`;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `project-details-${index}`);
    addText(button, "span", "experience-title", localizeContent(project.title));
    if (project.technology) {
      addText(button, "span", "badge rounded-pill text-bg-secondary experience-date", project.technology);
    }
    heading.append(button);

    const collapse = document.createElement("div");
    collapse.className = "accordion-collapse collapse";
    collapse.id = `project-details-${index}`;
    collapse.setAttribute("aria-labelledby", heading.id);
    collapse.dataset.bsParent = "#cv-projects";
    const body = document.createElement("div");
    body.className = "accordion-body";
    if (project.description) addText(body, "p", "", localizeContent(project.description));
    if (project.url) {
      const link = document.createElement("a");
      link.className = "btn btn-outline-success";
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = t("githubLink");
      body.append(link);
    }
    collapse.append(body);
    item.append(heading, collapse);
    projectList.append(item);
  });
  observeContentCards();
}

function makeEditorField(labelText, fieldName, value, multiline = false) {
  const wrapper = document.createElement("div");
  wrapper.className = multiline ? "col-12" : "col-md-4";
  const label = document.createElement("label");
  label.className = "form-label";
  label.textContent = labelText;
  const field = document.createElement(multiline ? "textarea" : "input");
  field.className = "form-control";
  field.dataset.field = fieldName;
  field.value = value;
  if (multiline) field.rows = 3;
  label.append(field);
  wrapper.append(label);
  return wrapper;
}

function renderEditorEntries(container, entries, type) {
  container.replaceChildren();
  entries.forEach((entry) => {
    const editorCard = document.createElement("div");
    editorCard.className = "editor-entry rounded border p-3";
    const row = document.createElement("div");
    row.className = "row g-2 align-items-start";
    const experience = type === "experience";
    row.append(makeEditorField(experience ? t("editorPosition") : t("editorDegree"), "title", entry.title));
    row.append(makeEditorField(experience ? t("editorCompany") : t("editorSchool"), "organization", entry.organization));
    row.append(makeEditorField(t("editorDate"), "date", entry.date));
    row.append(makeEditorField(experience ? t("editorMissions") : t("editorNote"), "details",
      experience ? entry.details.join("\n") : entry.details, experience));
    const removeColumn = document.createElement("div");
    removeColumn.className = "col-12 text-end";
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-outline-danger";
    removeButton.type = "button";
    removeButton.dataset.removeEntry = "";
    removeButton.textContent = t("editorRemove");
    removeColumn.append(removeButton);
    row.append(removeColumn);
    editorCard.append(row);
    container.append(editorCard);
  });
}

function populateEditor() {
  document.querySelector("#edit-name").value = cv.name;
  document.querySelector("#edit-headline").value = cv.headline;
  document.querySelector("#edit-about").value = cv.about;
  document.querySelector("#edit-skills").value = cv.skills.join(", ");
  document.querySelector("#edit-email").value = cv.email || "";
  document.querySelector("#edit-phone").value = cv.phone || "";
  document.querySelector("#edit-address").value = cv.address || "";
  renderEditorEntries(document.querySelector("#edit-experiences"), cv.experiences, "experience");
  renderEditorEntries(document.querySelector("#edit-education"), cv.education, "education");
}

function readEditorEntries(container, type) {
  return [...container.querySelectorAll(".editor-entry")].map((entry) => {
    const value = (name) => entry.querySelector(`[data-field="${name}"]`).value.trim();
    const details = value("details");
    return {
      date: value("date"),
      title: value("title"),
      organization: value("organization"),
      details: type === "experience" ? details.split("\n").map((line) => line.trim()).filter(Boolean) : details
    };
  });
}

function addEditorEntry(container, type) {
  const entries = [...container.querySelectorAll(".editor-entry")].map((entry) => {
    const value = (name) => entry.querySelector(`[data-field="${name}"]`).value;
    const details = value("details");
    return {
      date: value("date"),
      title: value("title"),
      organization: value("organization"),
      details: type === "experience" ? details.split("\n").filter(Boolean) : details
    };
  });
  entries.push({ date: "", title: "", organization: "", details: type === "experience" ? [] : "" });
  renderEditorEntries(container, entries, type);
}

function saveCv(nextCv) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCv));
    cv = nextCv;
    renderCv();
    populateEditor();
    adminForm.dataset.ready = "true";
    if (window.location.hash === "#administration") {
      document.querySelector("#administration").open = true;
    }
    statusMessage.textContent = t("adminSaved");
    statusMessage.classList.remove("text-danger");
    statusMessage.classList.add("text-success");
  } catch (error) {
    statusMessage.textContent = `${t("adminSaveError")} : ${error.message}`;
    statusMessage.classList.remove("text-success");
    statusMessage.classList.add("text-danger");
  }
}

adminForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nextCv = {
    name: document.querySelector("#edit-name").value.trim(),
    headline: document.querySelector("#edit-headline").value.trim(),
    about: document.querySelector("#edit-about").value.trim(),
    email: document.querySelector("#edit-email").value.trim(),
    phone: document.querySelector("#edit-phone").value.trim(),
    address: document.querySelector("#edit-address").value.trim(),
    skills: document.querySelector("#edit-skills").value.split(",").map((skill) => skill.trim()).filter(Boolean),
    experiences: readEditorEntries(document.querySelector("#edit-experiences"), "experience"),
    education: readEditorEntries(document.querySelector("#edit-education"), "education")
  };

  if (!isValidCv(nextCv) || !nextCv.name || !nextCv.headline || !nextCv.about ||
      !nextCv.email || !nextCv.phone || !nextCv.address ||
      [...nextCv.experiences, ...nextCv.education].some((entry) => !entry.title)) {
    statusMessage.textContent = t("adminInvalid");
    statusMessage.classList.remove("text-success");
    statusMessage.classList.add("text-danger");
    return;
  }
  saveCv(nextCv);
});

document.querySelector("#add-experience").addEventListener("click", () =>
  addEditorEntry(document.querySelector("#edit-experiences"), "experience"));
document.querySelector("#add-education").addEventListener("click", () =>
  addEditorEntry(document.querySelector("#edit-education"), "education"));

document.querySelectorAll("#edit-experiences, #edit-education").forEach((container) => {
  container.addEventListener("click", (event) => {
    if (event.target.matches("[data-remove-entry]")) {
      event.target.closest(".editor-entry").remove();
    }
  });
});

document.querySelector("#export-data").addEventListener("click", () => {
  const file = new Blob([JSON.stringify(cv, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "andrea-amato-cv.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#import-data").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!isValidCv(imported)) throw new Error(t("invalidImport"));
    saveCv(imported);
  } catch (error) {
    statusMessage.textContent = `${t("adminImportError")} : ${error.message}`;
    statusMessage.classList.remove("text-success");
    statusMessage.classList.add("text-danger");
  } finally {
    event.target.value = "";
  }
});

document.querySelector("#reset-data").addEventListener("click", () => {
  if (window.confirm(t("resetConfirm"))) saveCv(clone(defaultCv));
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  contactStatus.classList.remove("text-success", "text-danger");

  if (!supabaseClient) {
    contactStatus.textContent = t("contactSetupRequired");
    contactStatus.classList.add("text-danger");
    return;
  }

  const formData = new FormData(contactForm);
  if (formData.get("website")) {
    contactStatus.textContent = t("contactSendError");
    contactStatus.classList.add("text-danger");
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = t("contactSending");
  try {
    const { error } = await supabaseClient.from("messages").insert({
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      subject: formData.get("subject").trim(),
      message: formData.get("message").trim()
    });
    if (error) throw error;

    contactForm.reset();
    contactStatus.textContent = t("contactSent");
    contactStatus.classList.add("text-success");
  } catch (error) {
    contactStatus.textContent = `${t("contactSendError")} : ${error.message}`;
    contactStatus.classList.add("text-danger");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = t("contactSend");
  }
});

async function loadSupabaseContent() {
  if (!hasSupabaseConfig) {
    supabaseStatus.textContent = t("supabaseSetupRequired");
    supabaseStatus.classList.remove("d-none");
    return;
  }
  if (!supabaseClient) {
    supabaseStatus.textContent = supabaseInitError
      ? `Configuration Supabase invalide : ${supabaseInitError}`
      : "Le SDK Supabase n’a pas pu être chargé.";
    supabaseStatus.classList.remove("d-none");
    return;
  }

  try {
    const [experienceResult, skillResult, projectResult] = await Promise.all([
      supabaseClient.from("experiences")
        .select("date,title,organization,details,sort_order").order("sort_order"),
      supabaseClient.from("skills").select("name,sort_order").order("sort_order"),
      supabaseClient.from("projects")
        .select("title,description,technology,url,sort_order").order("sort_order")
    ]);
    for (const result of [experienceResult, skillResult, projectResult]) {
      if (result.error) throw result.error;
    }

    const experiences = experienceResult.data;
    const skills = skillResult.data;
    const projectRows = projectResult.data;
    if (!Array.isArray(experiences) || !experiences.every((item) =>
      typeof item.title === "string" && typeof item.organization === "string" &&
      typeof item.date === "string" && Array.isArray(item.details) &&
      item.details.every((detail) => typeof detail === "string")) ||
      !Array.isArray(skills) || !skills.every((item) => typeof item.name === "string") ||
      !Array.isArray(projectRows) || !projectRows.every((item) =>
        typeof item.title === "string" && typeof item.description === "string" &&
        typeof item.technology === "string" &&
        (item.url === null || typeof item.url === "string"))) {
      throw new Error("Les données Supabase ne correspondent pas au format attendu.");
    }

    cv.experiences = experiences.map(({ date, title, organization, details }) =>
      ({ date, title, organization, details }));
    cv.skills = skills.map((skill) => skill.name);
    projects = projectRows.map(({ title, description, technology, url }) =>
      ({ title, description, technology, url }));
    renderCv();
    populateEditor();
    adminForm.dataset.ready = "true";
    supabaseStatus.textContent = "";
    supabaseStatus.classList.add("d-none");
  } catch (error) {
    supabaseStatus.textContent = `Chargement Supabase impossible : ${error.message}`;
    supabaseStatus.classList.remove("d-none");
  }
}

renderCv();
populateEditor();
adminForm.dataset.ready = "true";
applyLanguage();
loadSupabaseContent();
