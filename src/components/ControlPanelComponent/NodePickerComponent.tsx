import { CollapseTitle } from '@/components'
import type { NodeItem, Widget, WidgetKey } from '@/types'
import { Button, Space } from 'antd'
import { startCase } from 'lodash-es'
import React from 'react'

interface NodePickerComponentProps {
  widgets: Record<WidgetKey, Widget>
  onAddNode: (nodeItem: NodeItem) => void
}

const NodePickerComponent: React.FC<NodePickerComponentProps> = ({ widgets, onAddNode }) => {
  const byCategory: Record<string, Widget[]> = {}
  for (const widget of Object.values(widgets)) {
    if (byCategory[widget.category] !== undefined) {
      byCategory[widget.category].push(widget)
    } else {
      byCategory[widget.category] = [widget]
    }
  }

  return (
    <div>
      {Object.entries(byCategory).map(([cat, items]) => (
        <CollapseTitle title={startCase(cat)} key={cat}>
          <Space wrap>
            {items.map((i) => (
              <Button key={i.name} onClick={() => onAddNode({ widget: i })}>
                <span className="align-middle px-0.5">{startCase(i.name)}</span>
              </Button>
            ))}
          </Space>
        </CollapseTitle>
      ))}
    </div>
  )
}

export default React.memo(NodePickerComponent)
