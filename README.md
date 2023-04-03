# Kitchen ComfyUI

## Installation

clone ComfyUI follow the README.md installing there

```shell
git clone https://github.com/comfyanonymous/ComfyUI
```

replace `ComfyUI/web` frontend with `dist` build


## Development

place this repo anywhere, just edit `ComfyUI/server.py`, add `response.headers['Access-Control-Allow-Origin'] = '*'`

```py
@web.middleware
async def cache_control(request: web.Request, handler):
    response: web.Response = await handler(request)
    response.headers['Access-Control-Allow-Origin'] = '*'
    if request.path.endswith('.js') or request.path.endswith('.css'):
        response.headers.setdefault('Cache-Control', 'no-cache')
    return response
```


## Credits
- ComfyUI - https://github.com/comfyanonymous/ComfyUI
- comfyweb - https://github.com/jac3km4/comfyweb