import { ActionIcon, Input } from '@/components'
import type { LocalPersistedGraphs, PersistedGraph } from '@/types'
import { writeWorkflowToFile } from '@/utils'
import {
  CalculatorOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  NodeIndexOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { Avatar, List, Space, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'

/**
 * @title 工作流程项属性
 */
interface WorkflowItemProps {
  /**
   * @title 工作流程项数据
   */
  item: LocalPersistedGraphs
  /**
   * @title 工作流程项索引
   */
  index: number
  /**
   * @title 重命名事件回调函数
   * @param id - 工作流程项的 ID
   * @param title - 工作流程项的标题
   */
  handleRename: (id: string, title: string) => void
  /**
   * @title 更新事件回调函数
   * @param id - 工作流程项的 ID
   * @param title - 工作流程项的标题
   */
  handleUpdate: (id: string, title: string) => void
  /**
   * @title 删除事件回调函数
   * @param id - 工作流程项的 ID
   * @param title - 工作流程项的标题
   */
  handleDelete: (id: string, title: string) => void
  /**
   * @title 加载事件回调函数
   * @param graph - 工作流程项的图形数据
   * @param title - 工作流程项的标题
   */
  handleLoad: (graph: PersistedGraph, title: string) => void
}

const WorkflowItem: React.FC<WorkflowItemProps> = ({
  item,
  index,
  handleRename,
  handleUpdate,
  handleDelete,
  handleLoad,
}) => {
  const [showRename, setShowRename] = useState(false)

  const handleRenameDone = useCallback(
    (e: any) => {
      setShowRename(false)
      const newTitle = e.target.value
      if (newTitle) handleRename(item.id, newTitle)
    },
    [handleRename, item.id]
  )

  const handleLoadClick = useCallback(() => {
    handleLoad(item.graph, item.title)
  }, [handleLoad, item.graph, item.title])

  const handleEditClick = useCallback(() => {
    setShowRename(true)
  }, [])

  const handleUpdateClick = useCallback(() => {
    handleUpdate(item.id, item.title)
  }, [handleUpdate, item.id, item.title])

  const handleDownloadClick = useCallback(() => {
    writeWorkflowToFile(item.graph, item.title)
  }, [item.graph, item.title])

  const handleDeleteClick = useCallback(() => {
    handleDelete(item.id, item.title)
  }, [handleDelete, item.id, item.title])

  const renderTitle = useCallback(() => {
    if (showRename) {
      return <Input defaultValue={item.title} onBlur={handleRenameDone} onPressEnter={handleRenameDone} />
    } else {
      return (
        <a title="Load" onClick={handleLoadClick}>
          {item.title}
          {index === 0 && (
            <Tag color="blue" style={{ marginLeft: 4 }}>
              Recent
            </Tag>
          )}
        </a>
      )
    }
  }, [showRename, item.title, index, handleRenameDone, handleLoadClick])

  return (
    <List.Item
      key={item.id}
      extra={
        <Space.Compact>
          <ActionIcon title="Rename" icon={<EditOutlined />} onClick={handleEditClick} />
          <ActionIcon title="Update" icon={<SaveOutlined />} onClick={handleUpdateClick} />
          <ActionIcon title="Download" icon={<DownloadOutlined />} onClick={handleDownloadClick} />
          <ActionIcon title="Delete" icon={<DeleteOutlined />} onClick={handleDeleteClick} />
        </Space.Compact>
      }
    >
      <List.Item.Meta
        avatar={
          <a title="Load" onClick={handleLoadClick}>
            <Avatar size={44} shape="square">
              {item.title[0].toUpperCase()}
            </Avatar>
          </a>
        }
        title={renderTitle()}
        description={
          <Space size={10} align="center">
            <Space size={4} align="center">
              <CalculatorOutlined />
              {Object.keys(item.graph.data).length}
            </Space>
            <Space size={4} align="center">
              <NodeIndexOutlined />
              {item.graph.connections.length}
            </Space>
            <Space size={4} align="center">
              <ClockCircleOutlined />
              {dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}
            </Space>
          </Space>
        }
      />
    </List.Item>
  )
}

export default React.memo(WorkflowItem)
