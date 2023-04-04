export default {
  data: {
    '1': {
      value: {
        widget: 'CheckpointLoaderSimple',
        fields: { ckpt_name: 'CmShota\\CmShotaMix-Unreal.safetensors' },
        modify: { color: '#fadb14' },
      },
      position: { x: -180, y: -555 },
      width: 271,
      height: 168,
    },
    '2': {
      value: { widget: 'CLIPTextEncode', fields: { text: 'beautiful mountain scenery' }, modify: { color: '#52c41a' } },
      position: { x: -180, y: -375 },
      width: 270,
      height: 228,
    },
    '3': {
      value: { widget: 'CLIPTextEncode', fields: { text: 'bad had' }, modify: { color: '#f5222d' } },
      position: { x: -180, y: -135 },
      width: 270,
      height: 228,
    },
    '4': {
      value: {
        widget: 'KSampler',
        fields: { seed: 232131, steps: 24, cfg: 8, sampler_name: 'dpm_2', scheduler: 'normal', denoise: 0.99 },
      },
      position: { x: 165, y: -555 },
      width: 240,
      height: 461,
    },
    '5': { value: { widget: 'VAEDecode', fields: {} }, position: { x: 165, y: -75 }, width: 240, height: 96 },
    '7': {
      value: { widget: 'EmptyLatentImage', fields: { width: 512, height: 512, batch_size: 1 } },
      position: { x: -180, y: 105 },
      width: 270,
      height: 246,
    },
    '9': {
      value: {
        widget: 'PreviewImage',
        fields: {},
        images: [{ filename: 'ComfyUI_00008_.png', subfolder: '', type: 'temp' }],
      },
      position: { x: 495, y: -555 },
      width: 525,
      height: 494,
    },
  },
  connections: [
    { source: '1', sourceHandle: 'MODEL', target: '4', targetHandle: 'model' },
    { source: '1', sourceHandle: 'CLIP', target: '2', targetHandle: 'clip' },
    { source: '1', sourceHandle: 'CLIP', target: '3', targetHandle: 'clip' },
    { source: '1', sourceHandle: 'VAE', target: '5', targetHandle: 'vae' },
    { source: '3', sourceHandle: 'CONDITIONING', target: '4', targetHandle: 'negative' },
    { source: '2', sourceHandle: 'CONDITIONING', target: '4', targetHandle: 'positive' },
    { source: '7', sourceHandle: 'LATENT', target: '4', targetHandle: 'latent_image' },
    { source: '4', sourceHandle: 'LATENT', target: '5', targetHandle: 'samples' },
    { source: '5', sourceHandle: 'IMAGE', target: '9', targetHandle: 'images' },
  ],
}
