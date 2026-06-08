const featuredRoot = document.querySelector("#featured-projects");
const moreRoot = document.querySelector("#more-projects");
const galleryRoot = document.querySelector("#prototype-gallery");
const galleryFiltersRoot = document.querySelector("#gallery-filters");
const yearRoot = document.querySelector("#year");
const videoModal = document.querySelector("#video-modal");
const videoTitle = document.querySelector("#video-modal-title");
const videoFrame = document.querySelector("#video-frame");
const videoClose = document.querySelector("#video-close");

yearRoot.textContent = new Date().getFullYear();

const fallbackData = {
  featured: [],
  more: []
};

const fallbackGallery = {
  filters: [],
  items: []
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

function createTextList(items, className) {
  const list = document.createElement("ul");
  list.className = className;

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  });

  return list;
}

function createDemoGallery(demos) {
  const gallery = document.createElement("div");
  gallery.className = "demo-gallery";

  demos.forEach((demo) => {
    const card = document.createElement("a");
    card.className = "demo-card";
    card.href = demo.url;
    card.target = "_blank";
    card.rel = "noreferrer";

    if (demo.image) {
      card.classList.add("has-demo-image");
      const image = document.createElement("img");
      image.src = demo.image;
      image.alt = `${demo.title} showcase thumbnail`;
      image.loading = "lazy";
      card.append(image);
    }

    const overlay = document.createElement("span");
    overlay.className = "demo-overlay";
    const genre = document.createElement("span");
    genre.className = "demo-genre";
    genre.textContent = demo.genre;
    const title = document.createElement("strong");
    title.textContent = demo.title;
    overlay.append(genre, title);
    card.append(overlay);
    gallery.append(card);
  });

  return gallery;
}

function closeVideoModal() {
  videoModal.setAttribute("aria-hidden", "true");
  videoFrame.replaceChildren();
}

function openVideoModal(item) {
  videoTitle.textContent = `${item.title} gameplay`;
  videoFrame.replaceChildren();

  if (item.video.provider === "youtube") {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${item.video.id}?autoplay=1&rel=0`;
    iframe.title = `${item.title} gameplay video`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    videoFrame.append(iframe);
  }

  if (item.video.provider === "mp4") {
    const video = document.createElement("video");
    video.src = item.video.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    videoFrame.append(video);
  }

  videoModal.setAttribute("aria-hidden", "false");
  videoClose.focus();
}

function renderFeatured(projects) {
  featuredRoot.replaceChildren();

  projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "project-card";
    article.style.setProperty("--accent-index", index + 1);
    if (project.demos?.length) {
      article.classList.add("has-demos");
    }

    const elements = [];
    if (project.image) {
      article.classList.add("has-media");

      const media = document.createElement("figure");
      media.className = "project-media";
      const image = document.createElement("img");
      image.src = project.image.src;
      image.alt = project.image.alt;
      image.loading = "lazy";
      media.append(image);
      elements.push(media);
    }

    const content = document.createElement("div");
    content.className = "project-content";

    const header = document.createElement("div");
    header.className = "project-header";

    const meta = document.createElement("div");
    meta.className = "project-meta";
    const type = document.createElement("span");
    type.textContent = project.type;
    const year = document.createElement("span");
    year.textContent = project.year;
    meta.append(type, year);

    const title = document.createElement("h3");
    title.textContent = project.title;
    header.append(meta, title);

    const facts = document.createElement("dl");
    facts.className = "project-facts";
    [
      ["Genre", project.genre],
      ["Role", project.role],
      ["Status", project.status]
    ].forEach(([label, value]) => {
      if (!value) return;
      const group = document.createElement("div");
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      group.append(term, description);
      facts.append(group);
    });

    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = project.summary;

    const impact = document.createElement("p");
    impact.className = "impact";
    impact.textContent = project.impact;

    const highlights = createTextList(project.highlights || [], "project-highlights");

    const stack = document.createElement("ul");
    stack.className = "tag-list";
    project.stack.forEach((item) => {
      const tag = document.createElement("li");
      tag.textContent = item;
      stack.append(tag);
    });

    const links = document.createElement("div");
    links.className = "project-links";
    if (!project.demos?.length) {
      (project.shortcuts || project.links).forEach((link) => links.append(createLink(link)));
    }

    content.append(header, facts, highlights, summary, impact, stack, links);
    article.append(...elements, content);
    if (project.demos?.length) {
      article.append(createDemoGallery(project.demos));
    }
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

function renderGalleryItems(items) {
  galleryRoot.replaceChildren();

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "gallery-card";
    article.dataset.genre = item.genre;

    const media = document.createElement("figure");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = `${item.title} gameplay thumbnail`;
    image.loading = "lazy";
    media.append(image);

    const content = document.createElement("div");
    const meta = document.createElement("span");
    meta.textContent = `${item.genre} / ${item.type}`;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const note = document.createElement("p");
    note.textContent = item.note;
    const tags = createTextList(item.tags, "gallery-tags");

    content.append(meta, title, note, tags);

    if (item.video) {
      const videoButton = document.createElement("button");
      videoButton.type = "button";
      videoButton.className = "video-button";
      videoButton.textContent = item.video.label || "Watch gameplay";
      videoButton.addEventListener("click", () => openVideoModal(item));
      content.append(videoButton);
    }

    article.append(media, content);
    galleryRoot.append(article);
  });
}

function renderGallery(gallery) {
  galleryFiltersRoot.replaceChildren();

  gallery.filters.forEach((filter, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = filter;
    button.className = "filter-button";
    if (index === 0) button.classList.add("active");

    button.addEventListener("click", () => {
      galleryFiltersRoot.querySelectorAll(".filter-button").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      const filteredItems = filter === "All"
        ? gallery.items
        : gallery.items.filter((item) => item.tags.includes(filter));
      renderGalleryItems(filteredItems);
    });

    galleryFiltersRoot.append(button);
  });

  renderGalleryItems(gallery.items);
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

async function loadGallery() {
  try {
    const response = await fetch("data/gallery.json");
    if (!response.ok) throw new Error("Gallery data request failed");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback gallery data.", error);
    return fallbackGallery;
  }
}

Promise.all([loadProjects(), loadGallery()]).then(([data, gallery]) => {
  renderFeatured(data.featured);
  renderMore(data.more);
  renderGallery(gallery);
});

videoClose.addEventListener("click", closeVideoModal);
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) closeVideoModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal.getAttribute("aria-hidden") === "false") {
    closeVideoModal();
  }
});
