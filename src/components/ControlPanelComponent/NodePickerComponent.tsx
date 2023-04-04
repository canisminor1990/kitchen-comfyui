import { ActionIcon } from '@/components'
import type { NodeItem, Widget, WidgetKey } from '@/types'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NodePickerGroup from './NodePickerGroup'

const { Search } = Input

const PanelHeader = styled.div`
  display: flex;
  margin-bottom: 8px;
  > .ant-input-search {
    margin-right: 12px;
  }
`

const PanelBody = styled.div`
  flex: 1;
  overflow: auto;
`

interface NodePickerComponentProps {
  widgets: Record<WidgetKey, Widget>
  onAddNode: (nodeItem: NodeItem) => void
}

const NodePickerComponent: React.FC<NodePickerComponentProps> = ({ widgets, onAddNode }) => {
  const [category, setCategory] = useState<Record<string, Widget[]>>({})
  const [keywords, setKeywords] = useState<string>()
  const [globalExpand, setGlobalExpand] = useState(true)

  useEffect(() => {
    const byCategory: Record<string, Widget[]> = {}
    let widgetsValues = Object.values(widgets)
    if (keywords) {
      widgetsValues = widgetsValues.filter((w) => w.name.toLowerCase().includes(keywords.toLowerCase()))
    }
    for (const widget of widgetsValues) {
      if (byCategory[widget.category] !== undefined) {
        byCategory[widget.category].push(widget)
      } else {
        byCategory[widget.category] = [widget]
      }
    }
    setCategory(byCategory)
  }, [widgets, keywords])

  return (
    <>
      <PanelHeader>
        <Search
          placeholder="input search text"
          onChange={(e) => setKeywords(e.target.value)}
          style={{ width: '100%' }}
        />
        <Space>
          <ActionIcon icon={<ArrowsAltOutlined />} onClick={() => setGlobalExpand(true)} />
          <ActionIcon icon={<ShrinkOutlined />} onClick={() => setGlobalExpand(false)} />
        </Space>
      </PanelHeader>
      <PanelBody>
        {Object.entries(category).map(([cat, items]) => (
          <NodePickerGroup key={cat} data={items} cat={cat} onAddNode={onAddNode} globalExpand={globalExpand} />
        ))}
      </PanelBody>
    </>
  )
}

export default React.memo(NodePickerComponent)
