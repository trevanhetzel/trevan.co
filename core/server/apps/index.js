
var _           = require('lodash'),
    when        = require('when'),
    errors      = require('../errorHandling'),
    api         = require('../api'),
    loader      = require('./loader'),
    // Holds the available apps
    availableApps = {};


function getInstalledApps() {
    return api.settings.read('installedApps').then(function (installed) {
        installed.value = installed.value || '[]';

        try {
            installed = JSON.parse(installed.value);
        } catch (e) {
            return when.reject(e);
        }

        return installed;
    });
}

function saveInstalledApps(installedApps) {
    return getInstalledApps().then(function (currentInstalledApps) {
        var updatedAppsInstalled = _.uniq(installedApps.concat(currentInstalledApps));

        return api.settings.edit('installedApps', updatedAppsInstalled);
    });
}

module.exports = {
    init: function () {
        var appsToLoad;

        try {
            // We have to parse the value because it's a string
            api.settings.read('activeApps').then(function (aApps) {
                appsToLoad = JSON.parse(aApps.value) || [];
            });
        } catch (e) {
            errors.logError(
                'Failed to parse activeApps setting value: ' + e.message,
                'Your apps will not be loaded.',
                'Check your settings table for typos in the activeApps value. It should look like: ["app-1", "app2"] (double quotes required).'
            );
            return when.resolve();
        }

        // Grab all installed apps, install any not already installed that are in appsToLoad.
        return getInstalledApps().then(function (installedApps) {
            var loadedApps = {},
                recordLoadedApp = function (name, loadedApp) {
                    // After loading the app, add it to our hash of loaded apps
                    loadedApps[name] = loadedApp;

                    return when.resolve(loadedApp);
                },
                loadPromises = _.map(appsToLoad, function (app) {
                    // If already installed, just activate the app
                    if (_.contains(installedApps, app)) {
                        return loader.activateAppByName(app).then(function (loadedApp) {
                            return recordLoadedApp(app, loadedApp);
                        });
                    }

                    // Install, then activate the app
                    return loader.installAppByName(app).then(function () {
                        return loader.activateAppByName(app);
                    }).then(function (loadedApp) {
                        return recordLoadedApp(app, loadedApp);
                    });
                });

            return when.all(loadPromises).then(function () {
                // Save our installed apps to settings
                return saveInstalledApps(_.keys(loadedApps));
            }).then(function () {
                // Extend the loadedApps onto the available apps
                _.extend(availableApps, loadedApps);
            }).otherwise(function (err) {
                errors.logError(
                    err.message || err,
                    'The app will not be loaded',
                    'Check with the app creator, or read the app documentation for more details on app requirements'
                );
            });
        });
    },
    availableApps: availableApps
};