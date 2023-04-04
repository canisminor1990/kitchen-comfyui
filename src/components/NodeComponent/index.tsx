import { ActionIcon, Input } from '@/components'
import { ColorMenu, colorList } from '@/components/NodeComponent/ColorMenu'
import { useAppStore } from '@/store'
import { ImageItem, type Widget } from '@/types'
import { checkInput } from '@/utils'
import { CopyOutlined, DeleteOutlined, EditOutlined, HighlightOutlined, MoreOutlined } from '@ant-design/icons'
import { Dropdown, Progress, type MenuProps } from 'antd'
import { useTheme } from 'antd-style'
import { mix } from 'polished'
import React, { useState } from 'react'
import { NodeResizeControl, type NodeProps } from 'reactflow'
import { shallow } from 'zustand/shallow'
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

const NodeComponent: React.FC<NodeProps<Widget>> = (node) => {
  const { progressBar, imagePreviews, onDuplicateNode, onDeleteNode, onModifyChange, getNodeFieldsData } = useAppStore(
    (st) => ({
      progressBar: st.nodeInProgress?.id === node.id ? st.nodeInProgress.progress : undefined,
      imagePreviews: st.graph[node.id]?.images?.map((image, index) => {
        return {
          image,
          index,
        }
      }),
      onPropChange: st.onPropChange,
      onDuplicateNode: st.onDuplicateNode,
      onDeleteNode: st.onDeleteNode,
      onModifyChange: st.onModifyChange,
      getNodeFieldsData: st.getNodeFieldsData,
    }),
    shallow
  )

  const theme = useTheme()
  const [nicknameInput, setNicknameInput] = useState<boolean>(false)
  const params: any[] = []
  const inputs: any[] = []
  const outputs: any[] = node.data.output
  const isInProgress = progressBar !== undefined
  const isSelected = node.selected
  const inputImg: any = getNodeFieldsData(node.id, 'image')
  const name = node.data?.nickname || node.data.name

  for (const [property, input] of Object.entries(node.data.input.required)) {
    if (checkInput.isParameterOrList(input)) {
      params.push({ name: property, type: input[0], input })
    } else {
      inputs.push({ name: property, type: input[0] })
    }
  }

  const handleNickname = (e: any) => {
    const nickname = e.target.value
    onModifyChange(node.id, 'nickname', nickname)
    setNicknameInput(false)
  }

  const handleNodeColor: MenuProps['onClick'] = ({ key }: any) => {
    onModifyChange(node.id, 'color', colorList[key])
  }

  const extraMenu: MenuProps['items'] = [
    {
      icon: <EditOutlined />,
      label: 'Rename',
      key: 'rename',
      onClick: () => setNicknameInput(true),
    },
    {
      icon: <HighlightOutlined />,
      label: 'Colors',
      key: 'colors',
      children: ColorMenu,
      onClick: handleNodeColor,
    },
    {
      type: 'divider',
    },
    {
      icon: <CopyOutlined />,
      label: 'Copy',
      key: 'copy',
      onClick: () => onDuplicateNode(node.id),
    },
    {
      icon: <DeleteOutlined />,
      label: 'Delete',
      key: 'delete',
      onClick: () => onDeleteNode(node.id),
    },
  ]

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
              <Dropdown menu={{ items: extraMenu }} trigger={['click']}>
                <ActionIcon icon={<MoreOutlined />} onClick={(e) => e.preventDefault()} />
              </Dropdown>
            )
      }
    >
      <SpaceGrid>
        <NodeInputs data={inputs} />
        <NodeOutpus data={outputs} />
      </SpaceGrid>
      <NodeParams data={params} nodeId={node.id} />
      <NodeImgPreview
        data={
          imagePreviews ||
          (inputImg && [
            {
              image: {
                filename: inputImg,
                type: 'input',
              },
              index: 0,
            },
          ])
        }
      />
      {isSelected && <NodeResizeControl />}
    </NodeCard>
  )
}

export default React.memo(NodeComponent)
