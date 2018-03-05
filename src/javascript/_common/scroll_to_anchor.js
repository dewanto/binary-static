const ScrollToAnchor = (() => {
    const scroll = () => {
        const query = getQueryObject(window.location.search);
        // scroll to the element with id === query.anchor
        const val = query.anchor;
        const el = document.querySelector(`[data-anchor="${val}"]`);
        if (el) {
            el.scrollIntoView();
        }
    };

    const getQueryObject = (query_string) => query_string
        .slice(1)
        .split('&')
        .map(pair => pair.split('='))
        .reduce((obj, [ key, val ]) => {
            obj[key] = val;
            return obj;
        }, {});

    return {
        scroll,
        getQueryObject,
    };
})();

module.exports = ScrollToAnchor;