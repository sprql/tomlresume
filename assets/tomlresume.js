'use strict';

(function (window) {
    const tomlTemplateURL = 'templates/sprql.resume.toml';
    const htmlTemplateURL = 'templates/resume.html.mustache';

    let tomlTextarea = document.querySelector('[data-behavior=tomlresume-source]');
    let templateTextarea = document.querySelector('[data-behavior=tomlresume-template]');

    let tomlTemplateRequest = fetch(tomlTemplateURL).then(function(response) { return response.text(); });
    let htmlTemplateRequest = fetch(htmlTemplateURL).then(function(response) { return response.text(); })

    let htmlFrame = document.querySelector('[data-behavior=tomlresume-html-resume]');

    let htmlTemplateData = '';

    function render() {
        let json = toml.parse(tomlTextarea.value);
        let html = Mustache.render(htmlTemplateData, json);

        htmlFrame.contentDocument.documentElement.innerHTML = html;
    }

    function print() {
        htmlFrame.contentWindow.print();
        return false;
    }

    Promise.all([tomlTemplateRequest, htmlTemplateRequest]).then(values => {
        let tomlTemplateData = values[0];
        htmlTemplateData = values[1];

        tomlTextarea.value = tomlTemplateData;

        render();
    });

    let printAction = document.querySelector('[data-action=tomlresume-print]');
    printAction.addEventListener('click', print);

    tomlTextarea.addEventListener('keyup', render);
    tomlTextarea.addEventListener('change', render);
})(window);
