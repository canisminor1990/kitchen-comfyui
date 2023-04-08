import { useAppStore } from '@/store'
import type { Widget } from '@/types'
import { AppstoreOutlined, ArrowsAltOutlined, MenuOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import NodePickerGroup from './NodePickerGroup'
import { PanelBody, PanelHeader } from './style'

const { Search } = Input

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const NodePickerComponent: React.FC = () => {
  const { widgets, onAddNode } = useAppStore((state) => state, shallow)
  const [category, setCategory] = useState<Record<string, Widget[]>>({})
  const [keywords, setKeywords] = useState<string>('')
  const [globalExpand, setGlobalExpand] = useState<boolean>(true)
  const [cardView, setCardView] = useState<boolean>(false)

  useEffect(() => {
    const byCategory: Record<string, Widget[]> = {}
    let widgetsValues = Object.values(widgets)
    if (keywords) {
      widgetsValues = widgetsValues.filter((widget) => widget.name.toLowerCase().includes(keywords.toLowerCase()))
    }
    for (const widget of widgetsValues) {
      if (byCategory[widget.category]) {
        byCategory[widget.category].push(widget)
      } else {
        byCategory[widget.category] = [widget]
      }
    }
    setCategory(byCategory)
  }, [widgets, keywords])

  const handleKeywordsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value)
  }, [])

  const handleCardViewToggle = useCallback(() => {
    setCardView((prevCardView) => !prevCardView)
  }, [])

  const handleExpandAll = useCallback(() => {
    setGlobalExpand(true)
  }, [])

  const handleCollapseAll = useCallback(() => {
    setGlobalExpand(false)
  }, [])

  return (
    <>
      <PanelHeader>
        <Search placeholder="Input search text" onChange={handleKeywordsChange} style={{ width: '100%' }} />
        <Space.Compact style={{ marginLeft: 8 }}>
          <Button
            title="Switch Card/List View"
            icon={cardView ? <AppstoreOutlined /> : <MenuOutlined />}
            onClick={handleCardViewToggle}
          />
          <Button title="Expand All" icon={<ArrowsAltOutlined />} onClick={handleExpandAll} />
          <Button title="Collapse All" icon={<ShrinkOutlined />} onClick={handleCollapseAll} />
        </Space.Compact>
      </PanelHeader>
      <PanelBody>
        {Object.entries(category).map(([cat, items]) => (
          <NodePickerGroup
            key={cat}
            data={items}
            cat={cat}
            onAddNode={onAddNode}
            globalExpand={globalExpand}
            cardView={cardView}
          />
        ))}
      </PanelBody>
    </>
  )
}

export default React.memo(NodePickerComponent)
