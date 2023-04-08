import { CollapseTitle, PreviewNode } from '@/components'
import { NodeItem, Widget } from '@/types'
import { Button, Popover, Space } from 'antd'
import { startCase } from 'lodash-es'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const CARD_LIST_PADDING = '8px 4px'

/******************************************************
 *********************** Style *************************
 ******************************************************/

const CardList = styled.div`
  padding: ${CARD_LIST_PADDING};
  cursor: pointer;
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/

/**
 * @title 节点选择器分组组件属性
 */
interface NodePickerGroupProps {
  /**
   * @title 分组类别
   */
  cat: string
  /**
   * @title 分组数据
   */
  data: Widget[]
  /**
   * @title 添加节点事件回调函数
   * @param nodeItem - 节点项
   */
  onAddNode: (nodeItem: NodeItem) => void
  /**
   * @title 全局展开状态
   * @default false
   */
  globalExpand: boolean
  /**
   * @title 卡片视图状态
   * @default false
   */
  cardView: boolean
}
const NodePickerGroup: React.FC<NodePickerGroupProps> = ({ cat, data, onAddNode, globalExpand, cardView }) => {
  const [expand, setExpand] = useState<boolean>(true)

  useEffect(() => {
    setExpand(globalExpand)
  }, [globalExpand])

  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement> | any, i: Widget) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(i))
    event.dataTransfer.effectAllowed = 'move'
  }, [])

  const renderCardView = useCallback(() => {
    return (
      <div>
        {data.map((i) => (
          <CardList
            key={i.name}
            draggable
            onDragStart={(event) => handleDrag(event, i)}
            onClick={() => onAddNode({ widget: i })}
          >
            <PreviewNode data={i} />
          </CardList>
        ))}
      </div>
    )
  }, [data, handleDrag, onAddNode])

  const renderButtonView = useCallback(() => {
    return (
      <Space wrap align="baseline">
        {data.map((i) => (
          <Popover
            key={i.name}
            content={<PreviewNode data={i} />}
            placement="left"
            overlayStyle={{ pointerEvents: 'none' }}
            destroyTooltipOnHide
          >
            <Button onClick={() => onAddNode({ widget: i })} draggable onDragStart={(event) => handleDrag(event, i)}>
              {startCase(i.name)}
            </Button>
          </Popover>
        ))}
      </Space>
    )
  }, [data, handleDrag, onAddNode])

  const handleExpandChange = useCallback((expanded: boolean) => {
    setExpand(expanded)
  }, [])

  return (
    <CollapseTitle title={startCase(cat)} key={cat} expand={expand} onExpandChange={handleExpandChange}>
      {cardView ? renderCardView() : renderButtonView()}
    </CollapseTitle>
  )
}

export default React.memo(NodePickerGroup)
