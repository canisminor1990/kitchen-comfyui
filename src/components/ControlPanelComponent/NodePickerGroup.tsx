import { CollapseTitle } from '@/components'
import type { Widget } from '@/types'
import { NodeItem } from '@/types'
import { Button, Space } from 'antd'
import { startCase } from 'lodash-es'
import React, { useEffect, useState } from 'react'

interface NodePickerGroupProps {
  cat: string
  data: Widget[]
  onAddNode: (nodeItem: NodeItem) => void
  globalExpand: boolean
}

const NodePickerGroup: React.FC<NodePickerGroupProps> = ({ cat, data, onAddNode, globalExpand }) => {
  const [expand, setExpand] = useState(true)

  useEffect(() => {
    setExpand(globalExpand)
  }, [globalExpand])

  return (
    <CollapseTitle title={startCase(cat)} key={cat} expand={expand} onExpandChange={setExpand}>
      <Space wrap>
        {data.map((i) => (
          <Button key={i.name} onClick={() => onAddNode({ widget: i })}>
            <span className="align-middle px-0.5">{startCase(i.name)}</span>
          </Button>
        ))}
      </Space>
    </CollapseTitle>
  )
}

export default React.memo(NodePickerGroup)
