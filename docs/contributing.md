# Contributing

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" data-ea-keywords="web|react|javascript|python|database|node|mongo" id="contributing"></div>

Notice something that needs fixing? Or something that could be improved? Awesome! Here are some guidelines below that'll help you to do just that.

In general, there are two main types of contribution,

- **General improvements:**
    - Typo corrections.
    - Fixing broken refs and links.
    - Correcting inaccurate or out of date info.
    - Offering better explanations through clear writings and examples.

- **New Pages or features**
    - Adding a page of documentation that we haven't covered yet.
    - Documenting a new feature that had been added to this project since its last release.


## Before contributing

1. Read the [CONTRIBUTING.md](https://github.com/react-auth-kit/react-auth-kit/blob/master/CONTRIBUTING.md) first if you haven't yet.

2. Familiarize yourself with [Mkdocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) with which we created the documentation.

3. Read through some of our existing documents and get a feel about the overall structure and style.

4. Read our ['Best practices'](#best-practices) section and please ensure your PR meets those.


## Steps for local setup

1. We use [Github Flow](https://guides.github.com/introduction/flow/index.html), all code changes happen through [Pull Requests](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests). Follow the steps specified at [CONTRIBUTING.md](https://github.com/react-auth-kit/react-auth-kit/blob/master/CONTRIBUTING.md) to set up a local repo of the project.

2. Install Material for MkDocs.

    === "Pip"

        ``` sh
        pip install mkdocs-material
        ```

        This will automatically install compatible versions of all dependencies: [MkDocs](https://www.mkdocs.org/), [Markdown](https://python-markdown.github.io/), [Pygments](https://pygments.org/) and [Python Markdown Extensions](https://facelessuser.github.io/pymdown-extensions/).

    === "Docker"

        The official [Docker image](https://hub.docker.com/r/squidfunk/mkdocs-material/) is a great way to get up and running in a few minutes, as it comes with all dependencies pre-installed. Pull the image for the `latest` version with:

        ``` sh
        docker pull squidfunk/mkdocs-materiall
        ```

        The mkdocs executable is provided as an entry point and serve is the default command.

    === "Git"

        Material for MkDocs can be directly used from [GitHub](https://www.github.com/) by cloning the repository into a subfolder of your project root which might be useful if you want to use the very latest version:

        ``` sh
        git clone https://github.com/squidfunk/mkdocs-material.git
        ```

        The theme will reside in the folder mkdocs-material/material. When cloning from git, you must install all required dependencies yourself:

        ``` sh
        pip install -r mkdocs-material/requirements.txt
        ```

3. All the contents are in the `docs` folder and the mkdocs config in `mkdocs.yml` relative to the project root directory.

4. MkDocs includes a live preview server, so you can preview your changes as you modify the documentation. The server will automatically rebuild the site upon saving. Start it with:

    ``` sh
    mkdocs serve
    ```

5. You are now all set up and ready to contribute!


## Best practices

1. All pages must include a proper title and an introduction.

2. If the document contains a technical term, it must be highlighted using \*term\* markdown syntax.

3. If the document contains an acronym or initialism, it should be first introduced highlighted in its expanded form followed by the commonly-accepted abbreviation in brackets (like Free and open-source software (FOSS)).

4. Use paragraphs to introduce a single concept and move on to a new paragraph before introducing another or expanding upon the first concept. Keep the size of those paragraphs to no more than four to five lines.

5. If you find you're putting commas in a sentence consider splitting it into two or more sentences for improved clarity.

6. Split the document up into as many sub-sections as makes sense. This is especially helpful for the readers who want to skip ahead for reference, as we can also use subheads as navigational anchors.

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
