---
title: Contributing
permalink: /contributing.html
categories:
- meta
---
This wiki is hosted on [GitHub Pages][ghp] using static site generation via [Jekyll].

# Testing locally

1. Follow the [Jekyll installation instructions][jekyll-install] for your operating system.
2. Clone the [repository] and open a terminal in the repo root.
3. Run `bundle install` to install the dependencies.
4. Run `bundle exec jekyll serve` and open a browser window to `http://localhost:4000/chesswiki/`.

# Creating pages

Pages can be created by creating a markdown file (`.md`) in the `content/` directory.
The file should start with [front matter][jekyll-fm]:

```yaml
---
title: My Awesome Page
---
```

The page content can then be written using [GitHub Flavored Markdown][gfm] for formatting.
Some additional functionality is provided via [Liquid].
The first sentence of the page will appear in search results.

## Linking to other wiki pages

To link to another wiki page, use the `link` include.
The page to link to is specified using the `to` parameter.
The text for the link can be specified using the `text` parameter, and if omitted defaults to the title of the page, which can be made lowercase using the `lowercase=true` parameter.
If the specified page does not exist, a red link to {% include link to="meta/contributing.md" %} will be made instead.

Example:
{% raw %}
```liquid
- {% include link to="content/alpha-beta.md" %}
- {% include link to="content/alpha-beta.md" text="the link text" %}
- {% include link to="content/alpha-beta.md" lowercase=true %}
- {% include link to="wherever/does-not-exist.md" %}
```
{% endraw %}

Produces:

- {% include link to="content/alpha-beta.md" %}
- {% include link to="content/alpha-beta.md" text="the link text" %}
- {% include link to="content/alpha-beta.md" lowercase=true %}
- {% include link to="wherever/does-not-exist.md" %}

[ghp]: https://pages.github.com/
[jekyll]: https://jekyllrb.com/
[jekyll-install]: https://jekyllrb.com/docs/installation/
[jekyll-fm]: https://jekyllrb.com/docs/front-matter/
[repository]: https://github.com/MinusKelvin/chesswiki
[gfm]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
[Liquid]: https://jekyllrb.com/docs/liquid/
