// General entry point for all configuration data
//
// This file itself is a wrapper for the root level config.js file.
// All other files that need to reference config.js should use this file.

var path          = require('path'),
    when          = require('when'),
    url           = require('url'),
    _             = require('lodash'),
    requireTree   = require('../require-tree').readAll,
    theme         = require('./theme'),
    configUrl     = require('./url'),
    ghostConfig   = {},
    appRoot       = path.resolve(__dirname, '../../../'),
    corePath      = path.resolve(appRoot, 'core/');

// Are we using sockets? Custom socket or the default?
function getSocket() {
    if (ghostConfig.server.hasOwnProperty('socket')) {
        return _.isString(ghostConfig.server.socket) ? ghostConfig.server.socket : path.join(ghostConfig.paths.contentPath, process.env.NODE_ENV + '.socket');
    }
    return false;
}

function updateConfig(config) {
    var localPath,
        contentPath,
        subdir;

    // Merge passed in config object onto
    // the cached ghostConfig object
    _.merge(ghostConfig, config);

    // Protect against accessing a non-existant object.
    // This ensures there's always at least a paths object
    // because it's referenced in multiple places.
    ghostConfig.paths = ghostConfig.paths || {};

    // Parse local path location
    if (ghostConfig.url) {
        localPath = url.parse(ghostConfig.url).path;
        // Remove trailing slash
        if (localPath !== '/') {
            localPath = localPath.replace(/\/$/, '');
        }
    }

    subdir = localPath === '/' ? '' : localPath;

    // Allow contentPath to be over-written by passed in config object
    // Otherwise default to default content path location
    contentPath = ghostConfig.paths.contentPath || path.resolve(appRoot, 'content');

    _.merge(ghostConfig, {
        paths: {
            'appRoot':          appRoot,
            'subdir':           subdir,
            'config':           ghostConfig.paths.config || path.join(appRoot, 'config.js'),
            'configExample':    path.join(appRoot, 'config.example.js'),
            'corePath':         corePath,

            'contentPath':      contentPath,
            'themePath':        path.resolve(contentPath, 'themes'),
            'appPath':          path.resolve(contentPath, 'apps'),
            'imagesPath':       path.resolve(contentPath, 'images'),
            'imagesRelPath':    'content/images',

            'adminViews':       path.join(corePath, '/server/views/'),
            'helperTemplates':  path.join(corePath, '/server/helpers/tpl/'),
            'exportPath':       path.join(corePath, '/server/data/export/'),
            'lang':             path.join(corePath, '/shared/lang/'),
            'debugPath':        subdir + '/ghost/debug/',

            'availableThemes':  ghostConfig.paths.availableThemes || [],
            'availableApps':    ghostConfig.paths.availableApps || [],
            'builtScriptPath':  path.join(corePath, 'built/scripts/')
        }
    });

    // Also pass config object to
    // configUrl object to maintain
    // clean depedency tree
    configUrl.setConfig(ghostConfig);

    return ghostConfig;
}

function initConfig(rawConfig) {
    // Cache the config.js object's environment
    // object so we can later refer to it.
    // Note: this is not the entirety of config.js,
    // just the object appropriate for this NODE_ENV
    ghostConfig = updateConfig(rawConfig);

    return when.all([requireTree(ghostConfig.paths.themePath), requireTree(ghostConfig.paths.appPath)]).then(function (paths) {
        ghostConfig.paths.availableThemes = paths[0];
        ghostConfig.paths.availableApps = paths[1];
        return ghostConfig;
    });
}

// Returns NODE_ENV config object
function config() {
    // @TODO: get rid of require statement.
    // This is currently needed for tests to load config file
    // successfully.  While running application we should never
    // have to directly delegate to the config.js file.
    if (_.isEmpty(ghostConfig)) {
        try {
            ghostConfig = require(path.resolve(__dirname, '../../../', 'config.js'))[process.env.NODE_ENV] || {};
        } catch (ignore) {/*jslint strict: true */}
        ghostConfig = updateConfig(ghostConfig);
    }

    return ghostConfig;
}

module.exports = config;
module.exports.init = initConfig;
module.exports.theme = theme;
module.exports.getSocket = getSocket;
module.exports.urlFor = configUrl.urlFor;
module.exports.urlForPost = configUrl.urlForPost;
