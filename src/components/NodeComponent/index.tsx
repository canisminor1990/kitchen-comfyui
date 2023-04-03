import { ActionIcon } from '@/components'
import { ImageItem, type NodeId, type Widget } from '@/types'
import { checkInput } from '@/utils'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Progress, Space } from 'antd'
import React from 'react'
import { NodeResizeControl, type NodeProps } from 'reactflow'
import NodeImgPreview from './NodeImgPreview'
import NodeInputs from './NodeInputs'
import NodeOutpus from './NodeOutpus'
import NodeParams from './NodeParams'
import { NodeCard, SpaceGrid } from './style'

export const NODE_IDENTIFIER = 'sdNode'

export interface ImagePreview {
  image: ImageItem
  index: number
}

interface NodeComponentProps {
  node: NodeProps<Widget>
  progressBar?: number
  imagePreviews?: ImagePreview[]
  onPreviewImage: (idx: number) => void
  onDuplicateNode: (id: NodeId) => void
  onDeleteNode: (id: NodeId) => void
  onUpdateNodes: (id: NodeId, data: any) => void
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  progressBar,
  imagePreviews,
  onDuplicateNode,
  onDeleteNode,
  onUpdateNodes,
}) => {
  const params: any[] = []
  const inputs: any[] = []
  const outputs: any[] = node.data.output
  for (const [property, input] of Object.entries(node.data.input.required)) {
    if (checkInput.isParameterOrList(input)) {
      params.push({ name: property, type: input[0], input })
    } else {
      inputs.push({ name: property, type: input[0] })
    }
  }

  const isInProgress = progressBar !== undefined
  const isSelected = node.selected

  if (isSelected) console.log(node)

  return (
    <NodeCard
      size="small"
      title={node.data.name}
      active={isInProgress || isSelected ? 1 : 0}
      style={{
        width: node.data?.width || 'unset',
        height: node.data?.height || 'unset',
      }}
      hoverable
      extra={
        isInProgress
          ? progressBar > 0 && <Progress steps={4} percent={Math.floor(progressBar * 100)} />
          : isSelected && (
              <Space>
                <ActionIcon icon={<CopyOutlined />} onClick={() => onDuplicateNode(node.id)} />
                <ActionIcon icon={<DeleteOutlined />} onClick={() => onDeleteNode(node.id)} />
              </Space>
            )
      }
    >
      <SpaceGrid>
        <NodeInputs data={inputs} />
        <NodeOutpus data={outputs} />
      </SpaceGrid>
      <NodeParams data={params} nodeId={node.id} />
      <NodeImgPreview data={imagePreviews} />
      {isSelected && (
        <NodeResizeControl onResizeEnd={(_, { width, height }) => onUpdateNodes(node.id, { width, height })} />
      )}
    </NodeCard>
  )
}

export default React.memo(NodeComponent)
