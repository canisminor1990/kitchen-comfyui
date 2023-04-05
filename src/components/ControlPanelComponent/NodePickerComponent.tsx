import { useAppStore } from '@/store'
import type { Widget } from '@/types'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import NodePickerGroup from './NodePickerGroup'
import { PanelBody, PanelHeader } from './style'

const { Search } = Input

const NodePickerComponent: React.FC = () => {
  const { widgets, onAddNode } = useAppStore((st) => ({ widgets: st.widgets, onAddNode: st.onAddNode }), shallow)
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
        <Space.Compact style={{ marginLeft: 8 }}>
          <Button icon={<ArrowsAltOutlined />} onClick={() => setGlobalExpand(true)} />
          <Button icon={<ShrinkOutlined />} onClick={() => setGlobalExpand(false)} />
        </Space.Compact>
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
