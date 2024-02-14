# Trevan's Jekyll Site

This is Trevan Hetzel's personal blog built with Jekyll. The `master` branch of this repository contains the source Jekyll app, while `gh-pages` contains just the Jekyll generated `_site` files (because GitHub Pages does not support building the [Paginate V2](https://github.com/sverrirs/jekyll-paginate-v2) gem).


## Developing locally

```bash
bundle install
bundle exec jekyll serve
```

## Creating new articles

Markdown articles must be placed in the `_posts` folder with the file name convention `yyyy-mm-dd-title-of-article.md`. Then either run the server locally or run a one-time bundle with `bundle exec jekyll build` and push the contents of `_site` to the `gh-pages` branch.

## License

[MIT](https://choosealicense.com/licenses/mit/)