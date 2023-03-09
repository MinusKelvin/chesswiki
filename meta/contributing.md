---
title: Contributing
permalink: /contributing.html
categories:
- meta
---
This wiki is hosted on {% include link to="https://pages.github.com/" text="GitHub Pages" %} using static site generation via {% include link to="https://jekyllrb.com/" text="Jekyll" %}.

# Testing locally

1. Follow the {% include link to="https://jekyllrb.com/docs/installation/" text="Jekyll installation instructions" %} for your operating system.
2. Clone the {% include link to="https://github.com/MinusKelvin/chesswiki" text="repository" %} and open a terminal in the repo root.
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

The page content can then be written using {% include link to="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" text="GitHub Flavored Markdown" %} for formatting, although please do not use Markdown links for anything other than `#` links.
Some additional functionality is provided via {% include link to="https://jekyllrb.com/docs/liquid/" text="Liquid" %}.
The first sentence of the page will appear in search results.

## Linking

To create a link, use the `link` include.
The page to link to is specified using the `to` parameter.

When linking internally, the text for the link can be specified using the `text` parameter, and if omitted defaults to the title of the page, which can be made lowercase using the `lowercase=true` parameter.
If the specified page does not exist, a red link to {% include link to="meta/contributing.md" %} will be made instead.

When linking externally, the text for the link must be specified using the `text` parameter.

Example:
{% raw %}
```liquid
- {% include link to="content/alpha-beta.md" %}
- {% include link to="content/alpha-beta.md" text="the link text" %}
- {% include link to="content/alpha-beta.md" lowercase=true %}
- {% include link to="wherever/does-not-exist.md" %}
- {% include link to="https://example.com" text="External link" %}
```
{% endraw %}

Produces:

- {% include link to="content/alpha-beta.md" %}
- {% include link to="content/alpha-beta.md" text="the link text" %}
- {% include link to="content/alpha-beta.md" lowercase=true %}
- {% include link to="wherever/does-not-exist.md" %}
- {% include link to="https://example.com" text="External link" %}
