import type { PersistedGraph } from '@/types'

const defaultWorkflow: PersistedGraph = {
  data: {
    'd6488046-7e3d-45ce-b0cb-fc461ded790d': {
      value: { widget: 'VAELoader', fields: { vae_name: '[高饱和] vae-ft-mse-840000.safetensors' } },
      position: { x: 320, y: 1219.5 },
      width: 319,
      height: 120,
    },
    '196c7067-dd8c-4b21-95bf-c7da1074359f': {
      value: { widget: 'Group', fields: {}, modify: { nickname: 'Prompt' } },
      position: { x: 320.6155722066724, y: 1360.4647275134319 },
      width: 319,
      height: 539,
    },
    '2e19ea7c-a469-4aee-ba5f-50546f7b6856': {
      value: {
        widget: 'PreviewImage',
        fields: {},
        images: [{ filename: 'ComfyUI_00015_.png', subfolder: '', type: 'temp' }],
      },
      position: { x: 959.9330329915367, y: 1040.5498613443042 },
      width: 535,
      height: 574,
    },
    '2d69027b-18cb-4fba-a6f7-3cc6191da27a': {
      value: { widget: 'EmptyLatentImage', fields: { width: 512, height: 512, batch_size: 1 } },
      position: { x: 680, y: 1040 },
      width: 240,
      height: 246,
    },
    'df10802c-dcb3-45cb-b61a-ed21c9435e54': {
      value: { widget: 'VAEDecode', fields: {} },
      position: { x: 680, y: 1780 },
      width: 240,
      height: 96,
    },
    '3ab52db7-7835-409b-9742-cdbb84283789': {
      value: {
        widget: 'KSampler',
        fields: {
          seed: 13316703440321622000,
          steps: 24,
          cfg: 8,
          sampler_name: 'dpm_2',
          scheduler: 'normal',
          denoise: 0.99,
        },
      },
      position: { x: 680, y: 1300 },
      width: 240,
      height: 461,
    },
    '03e009af-40ce-40f8-8678-ee811fe31f41': {
      value: {
        widget: 'CLIPTextEncode',
        fields: { text: 'bad had' },
        modify: { color: '#f5222d', nickname: 'Negative' },
      },
      position: { x: 19.384427793327575, y: 280.91726159315385 },
      width: 280,
      height: 228,
      parentNode: '196c7067-dd8c-4b21-95bf-c7da1074359f',
    },
    '18d73b78-7fd7-4411-a39e-b8a17e677892': {
      value: {
        widget: 'CLIPTextEncode',
        fields: { text: 'beautiful mountain scenery' },
        modify: { color: '#52c41a', nickname: 'Positive' },
      },
      position: { x: 20, y: 40.91726159315385 },
      width: 278,
      height: 154,
      parentNode: '196c7067-dd8c-4b21-95bf-c7da1074359f',
    },
    '1ab1ba4a-5dfb-4ced-bc06-2b55af930969': {
      value: {
        widget: 'CheckpointLoaderSimple',
        fields: { ckpt_name: 'CmShota\\CmShotaMix-Unreal.safetensors' },
        modify: { color: '#fadb14' },
      },
      position: { x: 321.49999999999994, y: 1041 },
      width: 317,
      height: 148,
    },
  },
  connections: [
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
    {
      source: 'd6488046-7e3d-45ce-b0cb-fc461ded790d',
      sourceHandle: 'VAE',
      target: 'df10802c-dcb3-45cb-b61a-ed21c9435e54',
      targetHandle: 'vae',
    },
  ],
}

export default defaultWorkflow
