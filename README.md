# tomlresume

TOML-based standard for resumes, compliant with [JSON Resume Schema](https://github.com/jsonresume/resume-schema)

## Installation

    $ git clone https://github.com/sprql/tomlresume.git
    $ cd tomlresume


## Usage


Create your copy from template:

    $ cp resume.toml.template resume.toml

Fill your resume:

    $ $EDITOR resume.toml

Build `HTML` variant of your resume:

    $ bin/tomlresume html --template templates/resume.html.mustache resume.toml > resume.html




