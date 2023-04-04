import { ActionIcon, Input } from '@/components'
import { ColorMenu, colorList } from '@/components/NodeComponent/ColorMenu'
import { OnPropChange } from '@/store'
import { ImageItem, type NodeId, type Widget } from '@/types'
import { checkInput } from '@/utils'
import { CopyOutlined, EditOutlined, HighlightOutlined } from '@ant-design/icons'
import { Dropdown, Progress, Space, type MenuProps } from 'antd'
import { useTheme } from 'antd-style'
import { mix } from 'polished'
import React, { useState } from 'react'
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
  onModifyChange: OnPropChange
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  progressBar,
  imagePreviews,
  onDuplicateNode,
  onModifyChange,
}) => {
  const theme = useTheme()
  const [nicknameInput, setNicknameInput] = useState<boolean>(false)
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

  const name = node.data?.nickname || node.data.name

  const handleNickname = (e: any) => {
    const nickname = e.target.value
    onModifyChange(node.id, 'nickname', nickname)
    setNicknameInput(false)
  }

  const handleNodeColor: MenuProps['onClick'] = ({ key }: any) => {
    onModifyChange(node.id, 'color', colorList[key])
  }

  return (
    <NodeCard
      size="small"
      style={node.data?.color ? { background: mix(0.8, theme.colorBgContainer, node.data.color) } : {}}
      title={
        nicknameInput ? (
          <Input
            autoFocus
            defaultValue={name}
            onPressEnter={handleNickname}
            onBlur={handleNickname}
            size={'small'}
            style={{ margin: '4px 0', width: '100%' }}
          />
        ) : (
          name
        )
      }
      active={isInProgress || isSelected ? 1 : 0}
      hoverable
      extra={
        isInProgress
          ? progressBar > 0 && <Progress steps={4} percent={Math.floor(progressBar * 100)} />
          : isSelected && (
              <Space size={2} style={{ marginLeft: 8 }}>
                <Dropdown menu={{ items: ColorMenu, onClick: handleNodeColor }} trigger={['click']}>
                  <ActionIcon icon={<HighlightOutlined />} onClick={(e) => e.preventDefault()} />
                </Dropdown>
                <ActionIcon icon={<EditOutlined />} onClick={() => setNicknameInput(true)} />
                <ActionIcon icon={<CopyOutlined />} onClick={() => onDuplicateNode(node.id)} />
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
      {isSelected && <NodeResizeControl />}
    </NodeCard>
  )
}

export default React.memo(NodeComponent)
