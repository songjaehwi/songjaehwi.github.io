# Jaehwi Song — personal website

A single-page research homepage built with Jekyll for GitHub Pages. Introduction, publications, projects, education, experience, and honors are visible on the homepage. Publication videos play inline; entries without a video can use an expandable research figure.

## Local preview

With Jekyll installed:

```sh
jekyll serve --host 127.0.0.1
```

Open http://127.0.0.1:4000. To generate the static site:

```sh
jekyll build
```

GitHub Pages uses `_config.yml`; keep `url` set to the public origin and use `baseurl` only when hosting under a project subpath.

## Editing

- `_data/main_info.yaml`: name, profile photo, email, social links.
- `_data/publications.yaml`: publications, authors, videos, figures, and links. Use `video_mp4` with a local `video_poster` for native video, or `video_embed` for an embedded player. Both have a descriptive `video_title` for accessibility. Media captions are omitted; publication details appear beside the media. Keep `image_alt` descriptive and `image_source` pointed at the original research figure. Paper URLs support both local paths and external URLs.
- `_data/selected_projects.yaml`: the four homepage projects.
- `_data/experience.yaml`: education, experience, and local institution logos. Entries with `education: true` appear in Education.
- `index.html`: introduction, honors, and the homepage sections.
- `_layouts/personal.html`: page metadata, navigation, footer, and figure viewer.
- `libs/custom/personal.css` and `personal.js`: responsive styling and progressive enhancements. The content and image links remain usable with JavaScript disabled.

Fonts, institution logos, research figures, and the HABIT video poster are hosted locally. Their sources and font licenses are under `assets/fonts/`, `assets/logos/`, and `assets/research/`. Videos stream from the original project website or YouTube and require those services to be reachable.

The legacy project pages and their original layout are retained. The original site was based on [Martin Saveski's personal website template](https://github.com/msaveski/www_personal).
