/**
 * Flow 类型
 * - 'MODEL' 模型
 * - 'CONDITIONING' 向量引导
 * - 'CLIP' CLIP
 * - 'IMAGE' 图像
 * - 'LATENT' 潜空间
 * - 'CONTROL_NET' 控制网络
 * - 'MASK' 掩模
 * - 'VAE' 变分自编码器
 * - 'INT' 整数
 * - 'FLOAT' 浮点数
 * - 'STRING' 字符串
 * - '*' 所有
 */
export type Flow =
  | 'MODEL'
  | 'CONDITIONING'
  | 'CLIP'
  | 'IMAGE'
  | 'LATENT'
  | 'CONTROL_NET'
  | 'MASK'
  | 'VAE'
  | 'INT'
  | 'FLOAT'
  | 'STRING'
  | '*'
