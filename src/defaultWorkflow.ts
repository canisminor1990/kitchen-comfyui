import { PersistedGraph } from '@/utils'

const defaultWorkflow: PersistedGraph = {
  data: {
    '066285d0-38a4-49d9-a6fd-9bc718b0d066': {
      value: { widget: 'Group', fields: {} },
      position: { x: 478, y: 1289 },
      width: 1260,
      height: 1000,
    },
    '2e19ea7c-a469-4aee-ba5f-50546f7b6856': {
      value: {
        widget: 'PreviewImage',
        fields: {},
        images: [{ filename: 'ComfyUI_00008_.png', subfolder: '', type: 'temp' }],
      },
      position: { x: 700, y: 60 },
      width: 525,
      height: 494,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
    },
    '2d69027b-18cb-4fba-a6f7-3cc6191da27a': {
      value: { widget: 'EmptyLatentImage', fields: { width: 512, height: 512, batch_size: 1 } },
      position: { x: 40, y: 720 },
      width: 270,
      height: 246,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
    },
    'df10802c-dcb3-45cb-b61a-ed21c9435e54': {
      value: { widget: 'VAEDecode', fields: {} },
      position: { x: 380, y: 540 },
      width: 240,
      height: 96,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
    },
    '3ab52db7-7835-409b-9742-cdbb84283789': {
      value: {
        widget: 'KSampler',
        fields: {
          seed: 8086337028137083000,
          steps: 24,
          cfg: 8,
          sampler_name: 'dpm_2',
          scheduler: 'normal',
          denoise: 0.99,
        },
      },
      position: { x: 380, y: 60 },
      width: 240,
      height: 461,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
    },
    '03e009af-40ce-40f8-8678-ee811fe31f41': {
      value: { widget: 'CLIPTextEncode', fields: { text: 'bad had' }, modify: { color: '#f5222d' } },
      position: { x: 40, y: 480 },
      width: 270,
      height: 228,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
    },
    '18d73b78-7fd7-4411-a39e-b8a17e677892': {
      value: { widget: 'CLIPTextEncode', fields: { text: 'beautiful mountain scenery' }, modify: { color: '#52c41a' } },
      position: { x: 40, y: 240 },
      width: 270,
      height: 228,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
    },
    '1ab1ba4a-5dfb-4ced-bc06-2b55af930969': {
      value: {
        widget: 'CheckpointLoaderSimple',
        fields: { ckpt_name: 'CmShota\\CmShotaMix-Unreal.safetensors' },
        modify: { color: '#fadb14' },
      },
      position: { x: 40, y: 60 },
      width: 271,
      height: 168,
      parentNode: '066285d0-38a4-49d9-a6fd-9bc718b0d066',
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
    {
      source: '1ab1ba4a-5dfb-4ced-bc06-2b55af930969',
      sourceHandle: 'MODEL',
      target: '3ab52db7-7835-409b-9742-cdbb84283789',
      targetHandle: 'model',
    },
    {
      source: '1ab1ba4a-5dfb-4ced-bc06-2b55af930969',
      sourceHandle: 'CLIP',
      target: '18d73b78-7fd7-4411-a39e-b8a17e677892',
      targetHandle: 'clip',
    },
    {
      source: '1ab1ba4a-5dfb-4ced-bc06-2b55af930969',
      sourceHandle: 'CLIP',
      target: '03e009af-40ce-40f8-8678-ee811fe31f41',
      targetHandle: 'clip',
    },
    {
      source: '1ab1ba4a-5dfb-4ced-bc06-2b55af930969',
      sourceHandle: 'VAE',
      target: 'df10802c-dcb3-45cb-b61a-ed21c9435e54',
      targetHandle: 'vae',
    },
    {
      source: '03e009af-40ce-40f8-8678-ee811fe31f41',
      sourceHandle: 'CONDITIONING',
      target: '3ab52db7-7835-409b-9742-cdbb84283789',
      targetHandle: 'negative',
    },
    {
      source: '18d73b78-7fd7-4411-a39e-b8a17e677892',
      sourceHandle: 'CONDITIONING',
      target: '3ab52db7-7835-409b-9742-cdbb84283789',
      targetHandle: 'positive',
    },
    {
      source: '2d69027b-18cb-4fba-a6f7-3cc6191da27a',
      sourceHandle: 'LATENT',
      target: '3ab52db7-7835-409b-9742-cdbb84283789',
      targetHandle: 'latent_image',
    },
    {
      source: '3ab52db7-7835-409b-9742-cdbb84283789',
      sourceHandle: 'LATENT',
      target: 'df10802c-dcb3-45cb-b61a-ed21c9435e54',
      targetHandle: 'samples',
    },
    {
      source: 'df10802c-dcb3-45cb-b61a-ed21c9435e54',
      sourceHandle: 'IMAGE',
      target: '2e19ea7c-a469-4aee-ba5f-50546f7b6856',
      targetHandle: 'images',
    },
  ],
}

export default defaultWorkflow
