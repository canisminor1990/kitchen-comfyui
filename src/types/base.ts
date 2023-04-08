/**
 * Widget 的 key
 */
export type WidgetKey = string

/**
 * Property 的 key
 */
export type PropertyKey = string

/**
 * 节点的 ID
 */
export type NodeId = string

/**
 * 连线的类型
 * - 'default' 默认类型
 * - 'step' 折线
 * - 'smoothstep' 平滑折线
 * - 'straight' 直线
 */
export type EdgeTypes = 'default' | 'step' | 'smoothstep' | 'straight'
