import { CollapseTitle, PreviewNode } from '@/components'
import type { Widget } from '@/types'
import { NodeItem } from '@/types'
import { Button, Popover, Space } from 'antd'
import { startCase } from 'lodash-es'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const CardList = styled.div`
  padding: 8px 4px;
  cursor: pointer;
`

interface NodePickerGroupProps {
  cat: string
  data: Widget[]
  onAddNode: (nodeItem: NodeItem) => void
  globalExpand: boolean
  cardView: boolean
}

const NodePickerGroup: React.FC<NodePickerGroupProps> = ({ cat, data, onAddNode, globalExpand, cardView }) => {
  const [expand, setExpand] = useState(true)

  useEffect(() => {
    setExpand(globalExpand)
  }, [globalExpand])

  const handleDrag = (event: any, i: Widget) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(i))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <CollapseTitle title={startCase(cat)} key={cat} expand={expand} onExpandChange={setExpand}>
      {cardView ? (
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
      ) : (
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
      )}
    </CollapseTitle>
  )
}

export default React.memo(NodePickerGroup)
