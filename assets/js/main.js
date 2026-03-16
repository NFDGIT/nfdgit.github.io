(function () {
  window.getUrlParam = function (name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || null;
  };
})();
