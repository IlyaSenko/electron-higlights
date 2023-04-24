module.exports = function override(config, env) {
  return {
    ...config,
    target: "electron-renderer",
  };
};
