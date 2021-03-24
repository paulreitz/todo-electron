module.exports = function override(config, env) {
    config.target = 'electron-renderer';
    if (env === 'development') {
        const pluginIndex = config.plugins.findIndex(e => {
            return e.constructor.name === 'ReactRefreshPlugin';
        });
        if (pluginIndex > -1) {
            config.plugins[pluginIndex].options.exclude = [/node_modules/i, /public/i];
        }
    }
    return config;
}