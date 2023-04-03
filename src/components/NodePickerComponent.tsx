import type { NodeItem, Widget, WidgetKey } from '@/types'
import { PlusIcon } from '@radix-ui/react-icons'
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
    <div className="flex flex-row p-1 h-full w-full overflow-x-scroll">
      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} className="flex flex-col px-1">
          <h3 className="text-md font-bold mx-auto">{cat}</h3>
          <div className="overflow-y-scroll">
            {items.map((i) => (
              <div
                key={i.name}
                className="text-xs p-1 my-1 bg-stone-800 hover:bg-stone-700 rounded-md cursor-pointer whitespace-nowrap"
                onClick={() => onAddNode({ widget: i })}
              >
                <PlusIcon className="h-4 w-4 inline" />
                <span className="align-middle px-0.5">{i.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(NodePickerComponent)
