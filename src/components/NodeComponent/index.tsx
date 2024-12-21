import { Input } from '@/components'
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

/**
 * @title 图片预览参数
 */
export interface ImagePreview {
  /**
   * @title 预览的图片对象
   */
  image: ImageItem
  /**
   * @title 预览的图片索引
   */
  index: number
}

/******************************************************
 ************************* Dom *************************
 ******************************************************/

/**
 * @interface Props
 * @description 组件的 props 类型
 * @generic T - 节点数据类型的泛型
 * @param node - 节点相关的信息
 */
const NodeComponent: React.FC<NodeProps<Widget>> = (node) => {
  const ref: any = useRef(null)

  const { progressBar, onDuplicateNode, onDeleteNode, onModifyChange } = useAppStore(
    (st) => ({
      ...st,
      progressBar: st.nodeInProgress?.id === node.id ? st.nodeInProgress.progress : undefined,
    }),
    shallow,
  )

  const theme = useTheme()
  const [nicknameInput, setNicknameInput] = useState<boolean>(false)
  const isInProgress = progressBar !== undefined
  const isSelected = node.selected
  const name = node.data?.nickname || node.data.name
  const isGroup = node.data.name === 'Group'
  /**
   * @function handleNickname
   * @description 处理修改昵称
   * @param e - 事件对象
   */
  const handleNickname = (e: any) => {
    const nickname = e.target.value
    onModifyChange(node.id, 'nickname', nickname)
    setNicknameInput(false)
  }

  /**
   * @function handleNodeColor
   * @description 处理节点颜色
   * @param key - 颜色 key
   */
  const handleNodeColor: MenuProps['onClick'] = ({ key }: any) => {
    onModifyChange(node.id, 'color', colorList[key])
  }

  /**
   * @constant extraMenu
   * @description 节点额外菜单
   * @type {Array}
   */
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

  /**
   * @constant StyledCard
   * @description 样式卡片
   * @type {React.FC}
   */
  const StyledCard = isGroup ? GroupCard : NodeCard
  let background
  if (isGroup) {
    background = node.data?.color ? rgba(node.data.color, 0.2) : theme.colorFill
  } else {
    background = node.data?.color ? mix(0.8, theme.colorBgContainer, node.data.color) : theme.colorBgContainer
  }

  useEffect(() => {
    const parenet = ref.current?.parentNode
    parenet.setAttribute('type', node.data.name)
    ref.current.setAttribute('type', node.data.name)
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
              <Dropdown menu={{ items: extraMenu }} trigger={['click', 'hover']}>
                <div onClick={(e) => e.preventDefault()}>
                  <MoreOutlined />
                </div>
              </Dropdown>
            )
      }
    >
      <SdNode {...node} />
      {isSelected && <NodeResizeControl minWidth={80} minHeight={40} />}
    </StyledCard>
  )
}

export default React.memo(NodeComponent)
