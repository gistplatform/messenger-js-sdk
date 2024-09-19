const scriptElementId = "_gist_npm_loader";

const gistMethods = ['trackPageView', 'identify', 'track', 'setAppId', 'init'];

const gistFactory = function(t: string) {
  return function(...args: any[]) {
    const e = Array.prototype.slice.call(args);
    e.unshift(t);
    window.gist.push(e);
    return window.gist;
  };
};

const addWidgetToPage = function () {
  var d = document;
  if (d.getElementById(scriptElementId)) {
    return;
  }
  var s = d.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.id = scriptElementId;
  s.src = "https://widget-testing.getgist.com";
  var x = d.getElementsByTagName("head")[0];
  x.appendChild(s);
  s.addEventListener('load', function(e) {}, false);
};

export const init = () => {
  var w = window as any;
  w.gist = w.gist || [];

  for (var i = 0; i < gistMethods.length; i++) {
    var c = gistMethods[i];
    w.gist[c] = gistFactory(c);
  }

  addWidgetToPage();

  if (w.gistSettings) {
    w.gist.setAppId(w.gistSettings.app_id);
  }

  w.gist.trackPageView();
};