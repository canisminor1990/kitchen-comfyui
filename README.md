# Kitchen ComfyUI

| Dark                                                                                        | Light                                                                                       |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![](https://github.com/canisminor1990/kitchen-comfyui/blob/master/assets/screenshot-1.webp) | ![](https://github.com/canisminor1990/kitchen-comfyui/blob/master/assets/screenshot-2.webp) |

## TODO List

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
  - [ ] 中继节点，支持一个到多个变量中继
  - [ ] WIFI 无线节点，输出节点/接受节点
  - [ ] 开关节点，控制流程是否往下
  - [ ] ...

## Installation

clone ComfyUI follow the README.md installing there

```shell
git clone https://github.com/comfyanonymous/ComfyUI
```

replace `ComfyUI/web` frontend with `dist` build

## Development

place this repo anywhere, just edit `ComfyUI/server.py`, add `cors_handler`

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

## Credits

- ComfyUI - https://github.com/comfyanonymous/ComfyUI
- comfyweb - https://github.com/jac3km4/comfyweb
