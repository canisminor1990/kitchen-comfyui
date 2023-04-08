/**
 * 连线对象
 * @property source - 连线起点 ID
 * @property sourceHandle - 连线起点锚点 ID
 * @property target - 连线终点 ID
 * @property targetHandle - 连线终点锚点 ID
 */
export interface Connection {
  source: string
  sourceHandle: string
  target: string
  targetHandle: string
}
