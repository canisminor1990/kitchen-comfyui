<a name="readme-top"></a>

<div align="center">
  
<img width="160" src="https://gw.alipayobjects.com/mdn/rms_7d1485/afts/img/A*XDYxSJXBjjwAAAAAAAAAAAAAARQnAQ">

<h1 align="center">Kitchen ComfyUI</h1>

A reactflow base stable diffusion GUI as ComfyUI alternative interface.

[Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![release][release-shield]][release-url] [![releaseDate][release-date-shield]][release-date-url] [![ciTest][ci-test-shield]][ci-test-url] [![ciRelease][ci-release-shield]][ci-release-url] <br/> [![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

</div>

![](https://raw.githubusercontent.com/canisminor1990/kitchen-comfyui/dev/assets/screenshot-1.webp)

## 🔨 TODO List

- Keyboard Shortcuts
  - [x] **Delete:** <kbd>Delete</kbd> / <kbd>Backspace</kbd>
  - [x] **Multi Selection:** <kbd>Shift</kbd>
  - [x] **Copy/Paste:** <kbd>Ctrl</kbd> + <kbd>C</kbd> / <kbd>V</kbd>
  - [x] **Group Selection:** <kbd>Ctrl</kbd> + <kbd>G</kbd>
  - [ ] **Undo/Redo**: <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
- Image Nodes
  - [x] Image node upload adaptation
  - [ ] Drag and drop images to automatically upload and generate nodes
- Grouping
  - [x] Basic grouping functionality
  - [ ] Convert local flow to component
- Nodes
  - [x] Relay node, supports relaying one to multiple variables
  - [ ] WIFI wireless node, output node/receiving node
  - [ ] Switch node, controls whether the flow continues downward
  - [ ] ...

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 👀 Screenshot

#### Light Mode

![](https://raw.githubusercontent.com/canisminor1990/kitchen-comfyui/dev/assets/screenshot-2.webp)

#### Connection Styles

![](https://raw.githubusercontent.com/canisminor1990/kitchen-comfyui/dev/assets/connections.webp)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Installation

clone ComfyUI follow the README.md installing there

```shell
git clone https://github.com/comfyanonymous/ComfyUI
```

replace `ComfyUI/web` frontend with [release](https://github.com/canisminor1990/kitchen-comfyui/releases) build

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Development

⌨️ Local Development

You can use Gitpod for online development:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-url]

Or clone it for local development:

```bash
$ git clone https://github.com/canisminor1990/kitchen-comfyui
$ cd kitchen-comfyui
$ pnpm install
$ pnpm dev
```

Place this repo anywhere, and edit `ComfyUI/server.py`

> **👉 Note:** Check [assets/modify-server.py](https://github.com/canisminor1990/kitchen-comfyui/blob/master/assets/modify-server.py)

```py
@web.middleware
async def cors_handler(request: web.Request, handler):
    response = await handler(request)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-requested-with'
    return response
```

```py
class PromptServer():
......
    self.app = web.Application(client_max_size=20971520, middlewares=[cache_control, cors_handler])
......
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**4**</kbd>

<a href="https://github.com/apps/dependabot" title="dependabot[bot]">
  <img src="https://avatars.githubusercontent.com/in/29110?v=4" width="50" />
</a>
<a href="https://github.com/canisminor1990" title="canisminor1990">
  <img src="https://avatars.githubusercontent.com/u/17870709?v=4" width="50" />
</a>
<a href="https://github.com/actions-user" title="actions-user">
  <img src="https://avatars.githubusercontent.com/u/65916846?v=4" width="50" />
</a>
<a href="https://github.com/arvinxx" title="arvinxx">
  <img src="https://avatars.githubusercontent.com/u/28616219?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 Credits

- ComfyUI - https://github.com/comfyanonymous/ComfyUI
- comfyweb - https://github.com/jac3km4/comfyweb

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---
#### 📝 License

Copyright © 2023 [CanisMinor][profile-url]. <br />
This project is [MIT](./LICENSE) licensed. 


<!-- LINK GROUP -->

[profile-url]: https://github.com/canisminor1990
[issues-url]: https://github.com/canisminor1990/lobe-commit/issues/new/choose
[gitpod-url]: https://gitpod.io/#https://github.com/canisminor1990/kitchen-comfyui

<!-- SHIELD LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

<!-- release -->

[release-shield]: https://img.shields.io/github/v/release/canisminor1990/kitchen-comfyui?style=flat&sort=semver&logo=github
[release-url]: https://github.com/canisminor1990/kitchen-comfyui/releases

<!-- releaseDate -->

[release-date-shield]: https://img.shields.io/github/release-date/canisminor1990/kitchen-comfyui?style=flat
[release-date-url]: https://github.com/canisminor1990/kitchen-comfyui/releases

<!-- ciTest -->

[ci-test-shield]: https://github.com/canisminor1990/kitchen-comfyui/workflows/Test%20CI/badge.svg
[ci-test-url]: https://github.com/canisminor1990/kitchen-comfyui/actions/workflows/test.yml

<!-- ciRelease -->

[ci-release-shield]: https://github.com/canisminor1990/kitchen-comfyui/workflows/Build%20and%20Release/badge.svg
[ci-release-url]: https://github.com/canisminor1990/kitchen-comfyui/actions/workflows/release.yml

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/canisminor1990/kitchen-comfyui.svg?style=flat
[contributors-url]: https://github.com/canisminor1990/kitchen-comfyui/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/canisminor1990/kitchen-comfyui.svg?style=flat
[forks-url]: https://github.com/canisminor1990/kitchen-comfyui/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/canisminor1990/kitchen-comfyui.svg?style=flat
[stargazers-url]: https://github.com/canisminor1990/kitchen-comfyui/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/canisminor1990/kitchen-comfyui.svg?style=flat
[issues-url]: https://img.shields.io/github/issues/canisminor1990/kitchen-comfyui.svg?style=flat
