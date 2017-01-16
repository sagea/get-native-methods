window.getNativeMethods = (function () {
    const classes = 'Array Array.prototype String String.prototype Number Number.prototype Boolean Boolean.prototype Object Object.prototype'.split(' ');


    function getNativeMethods(nativeClasses = classes) {
        return new Promise(function (resolve) {
            let iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = getHTMLString();

            iframe.onload = function () {
                let iframeWindow = iframe.contentWindow;
                window.addEventListener('message', function (e) {
                    resolve(JSON.parse(e.data));
                    iframe.parentNode.removeChild(iframe);
                });

                iframeWindow.postMessage(JSON.stringify(nativeClasses), '*');
            };
            document.body.appendChild(iframe);
        });
    }


    function getHTMLString() {
        return 'data:text/html;charset=utf-8,' + encodeURI(`<!DOCTYPE html><html lang="en"><head><title></title></head><body><script>
    window.addEventListener('message', function (event) {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            console.log(e);
            alert('PARSING DATA FAILED!');
            return;
        }
        let res = JSON.stringify(getList(data));
        window.top.postMessage(res, '*');
    });
    function getList (items) {
        let obj = {b: {c: 'foo'}};
        let result = {};
        items.forEach(function (val) {
            let obj = get(window, val);
            result[val] = getNonEnumerableProperties (obj);
        });
        return result;
    }

    function getNonEnumerableProperties (obj) {
        let k = Object.keys(obj);
        return Object.getOwnPropertyNames(obj).filter(propertyName => {
            return k.indexOf(propertyName) === -1 && typeof obj[propertyName] === 'function';
        });
    }
    // DON'T USE THIS IN ANY PRODUCTION SOFTWARE. THE USE OF window.eval IS SLOW AND A POTENTIAL SECURITY RISK
    function get (obj, prop) {
        window._____THIS_IS_A_HACK_TO_MAKE_MY_LIFE_EASY_____ = obj;
        let result = window.eval('window._____THIS_IS_A_HACK_TO_MAKE_MY_LIFE_EASY_____.' + prop);
        delete window._____THIS_IS_A_HACK_TO_MAKE_MY_LIFE_EASY_____;
        return result;}<\/script ></body></html>`);
    }

    return getNativeMethods
})();
