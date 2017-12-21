chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('admin.html', {
        'state': 'maximized'
    });
});