module.exports = {
  extends: ['semantic-release-config-gitmoji'],
  branches: ['master'],
  plugins: [
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'web.zip',
            label: 'To install: download this file, unzip and replace ComfyUI/web',
          },
        ],
      },
    ],
  ],
}
