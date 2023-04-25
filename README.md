<p align="center">
  <img width="160" src="https://gw.alipayobjects.com/mdn/rms_7d1485/afts/img/A*XDYxSJXBjjwAAAAAAAAAAAAAARQnAQ">
</p>
<h1 align="center">Kitchen ComfyUI</h1>

<div align="center">
  A reactflow base stable diffusion GUI as ComfyUI alternative interface.

<br/>
<br/>

<!-- SHIELD GROUP -->

[![release][release-shield]][release-url] [![releaseDate][release-date-shield]][release-date-url] [![ciTest][ci-test-shield]][ci-test-url] [![ciRelease][ci-release-shield]][ci-release-url] <br/> [![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

</div>

<br/>

![](https://raw.githubusercontent.com/canisminor1990/kitchen-comfyui/dev/assets/screenshot-1.webp)

<br/>

## 🔨 TODO List

- 键盘快捷键
  - [x] **Delete:** <kbd>Delete</kbd> / <kbd>Backspace</kbd>
  - [x] **Multi Selection:** <kbd>Shift</kbd>
  - [x] **Copy/Paste:** <kbd>Ctrl</kbd> + <kbd>C</kbd> / <kbd>V</kbd>
  - [x] **Group Selection:** <kbd>Ctrl</kbd> + <kbd>G</kbd>
  - [ ] **Undo/Redo**: <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
- 图片节点
  - [x] 图片节点上传适配
  - [ ] 拖拽图片自动上传并生成节点
- 编组

  - [x] 编组相关基础功能
  - [ ] 局部 Flow 转换为组件

- 节点
  - [x] 中继节点，支持一个到多个变量中继
  - [ ] WIFI 无线节点，输出节点/接受节点
  - [ ] 开关节点，控制流程是否往下
  - [ ] ...

<br/>

## 👀 Screenshot

#### Light Mode

![](https://raw.githubusercontent.com/canisminor1990/kitchen-comfyui/dev/assets/screenshot-2.webp)

#### Connection Styles

![](https://raw.githubusercontent.com/canisminor1990/kitchen-comfyui/dev/assets/connections.webp)

<br/>

## 📦 Installation

clone ComfyUI follow the README.md installing there

```shell
git clone https://github.com/comfyanonymous/ComfyUI
```

replace `ComfyUI/web` frontend with [release](https://github.com/canisminor1990/kitchen-comfyui/releases) build

<br/>

## ⌨️ Development

place this repo anywhere, and edit `ComfyUI/server.py`

> check [assets/modify-server.py](https://github.com/canisminor1990/kitchen-comfyui/blob/master/assets/modify-server.py)

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

<br/>

## 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**3**</kbd>

<a href="https://github.com/canisminor1990" title="canisminor1990">
  <img src="https://avatars.githubusercontent.com/u/17870709?v=4" width="50" />
</a>
<a href="https://github.com/apps/dependabot" title="dependabot[bot]">
  <img src="https://avatars.githubusercontent.com/in/29110?v=4" width="50" />
</a>
<a href="https://github.com/arvinxx" title="arvinxx">
  <img src="https://avatars.githubusercontent.com/u/28616219?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<br/>

## 🔗 Credits

- ComfyUI - https://github.com/comfyanonymous/ComfyUI
- comfyweb - https://github.com/jac3km4/comfyweb

<!-- SHIELD LINK GROUP -->

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
