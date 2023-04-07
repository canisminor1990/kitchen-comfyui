import { ActionIcon, Input } from '@/components'
import { ColorMenu, colorList } from '@/components/NodeComponent/ColorMenu'
import { useAppStore } from '@/store'
import { ImageItem, type Widget } from '@/types'
import { CopyOutlined, DeleteOutlined, EditOutlined, HighlightOutlined, MoreOutlined } from '@ant-design/icons'
import { Dropdown, Progress, type MenuProps } from 'antd'
import { useTheme } from 'antd-style'
import { mix, rgba } from 'polished'
import React, { useEffect, useRef, useState } from 'react'
import { NodeResizeControl, type NodeProps } from 'reactflow'
import { shallow } from 'zustand/shallow'
import SdNode from './SdNode'
import { GroupCard, NodeCard } from './style'

export const NODE_IDENTIFIER = 'sdNode'

export interface ImagePreview {
  image: ImageItem
  index: number
}

const NodeComponent: React.FC<NodeProps<Widget>> = (node) => {
  const ref: any = useRef(null)
  const { progressBar, onDuplicateNode, onDeleteNode, onModifyChange } = useAppStore(
    (st) => ({
      progressBar: st.nodeInProgress?.id === node.id ? st.nodeInProgress.progress : undefined,
      onPropChange: st.onPropChange,
      onDuplicateNode: st.onDuplicateNode,
      onDeleteNode: st.onDeleteNode,
      onModifyChange: st.onModifyChange,
    }),
    shallow
  )

  const theme = useTheme()
  const [nicknameInput, setNicknameInput] = useState<boolean>(false)
  const isInProgress = progressBar !== undefined
  const isSelected = node.selected
  const name = node.data?.nickname || node.data.name
  const isGroup = node.data.name === 'Group'
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

  const StyledCard = isGroup ? GroupCard : NodeCard
  let background
  if (isGroup) {
    background = node.data?.color ? rgba(node.data.color, 0.2) : theme.colorFill
  } else {
    background = node.data?.color ? mix(0.8, theme.colorBgContainer, node.data.color) : theme.colorBgContainer
  }

  useEffect(() => {
    if (isGroup) {
      const parenet = ref.current?.parentNode
      parenet.setAttribute('type', 'group')
    }
  }, [])

  return (
    <StyledCard
      ref={ref}
      size="small"
      style={{ background }}
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
      hoverable={!isGroup}
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
      <SdNode {...node} />
      {isSelected && <NodeResizeControl minWidth={80} minHeight={120} />}
    </StyledCard>
  )
}

export default React.memo(NodeComponent)
