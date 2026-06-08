const featuredRoot = document.querySelector("#featured-projects");
const moreRoot = document.querySelector("#more-projects");
const yearRoot = document.querySelector("#year");

yearRoot.textContent = new Date().getFullYear();

const fallbackData = {
  featured: [],
  more: []
};

function createLink(link) {
  const anchor = document.createElement("a");
  anchor.href = link.url;
  anchor.textContent = link.label;
  anchor.className = "project-link";
  if (link.url.startsWith("http")) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
  return anchor;
}

function renderFeatured(projects) {
  featuredRoot.replaceChildren();

  projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "project-card";
    article.style.setProperty("--accent-index", index + 1);

    const meta = document.createElement("div");
    meta.className = "project-meta";
    const type = document.createElement("span");
    type.textContent = project.type;
    const year = document.createElement("span");
    year.textContent = project.year;
    meta.append(type, year);

    const title = document.createElement("h3");
    title.textContent = project.title;

    const status = document.createElement("p");
    status.className = "status";
    status.textContent = project.status;

    const summary = document.createElement("p");
    summary.textContent = project.summary;

    const impact = document.createElement("p");
    impact.className = "impact";
    impact.textContent = project.impact;

    const stack = document.createElement("ul");
    stack.className = "tag-list";
    project.stack.forEach((item) => {
      const tag = document.createElement("li");
      tag.textContent = item;
      stack.append(tag);
    });

    const links = document.createElement("div");
    links.className = "project-links";
    project.links.forEach((link) => links.append(createLink(link)));

    article.append(meta, title, status, summary, impact, stack, links);
    featuredRoot.append(article);
  });
}

function renderMore(projects) {
  moreRoot.replaceChildren();

  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "showcase-item";

    const category = document.createElement("span");
    category.textContent = project.category;

    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.description;

    content.append(title, description);
    article.append(category, content);
    moreRoot.append(article);
  });
}

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("Project data request failed");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback project data.", error);
    return fallbackData;
  }
}

loadProjects().then((data) => {
  renderFeatured(data.featured);
  renderMore(data.more);
});
