import { ActionIcon, Input } from '@/components'
import { LocalPersistedGraphs, PersistedGraph, writeWorkflowToFile } from '@/utils'
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
import React, { useState } from 'react'

interface WorkflowItemProps {
  item: LocalPersistedGraphs
  index: number
  handleRename: (id: string, title: string) => void
  handleUpdate: (id: string, title: string) => void
  handleDelete: (id: string, title: string) => void
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
  const [showRename, setShowRename] = useState<boolean>(false)

  const handleRenameDone = (e: any) => {
    setShowRename(false)
    const newTitle = e.target.value
    if (newTitle) handleRename(item.id, newTitle)
  }

  return (
    <List.Item
      key={item.id}
      extra={
        <Space.Compact>
          <ActionIcon title="Rename" icon={<EditOutlined />} onClick={() => setShowRename(true)} />
          <ActionIcon title="Update" icon={<SaveOutlined />} onClick={() => handleUpdate(item.id, item.title)} />
          <ActionIcon
            title="Download"
            icon={<DownloadOutlined />}
            onClick={() => writeWorkflowToFile(item.graph, item.title)}
          />
          <ActionIcon title="Delete" icon={<DeleteOutlined />} onClick={() => handleDelete(item.id, item.title)} />
        </Space.Compact>
      }
    >
      <List.Item.Meta
        avatar={
          <a title="Load" onClick={() => handleLoad(item.graph, item.title)}>
            <Avatar size={44} shape="square">
              {item.title[0].toUpperCase()}
            </Avatar>
          </a>
        }
        title={
          showRename ? (
            <Input defaultValue={item.title} onBlur={handleRenameDone} onPressEnter={handleRenameDone} />
          ) : (
            <a title="Load" onClick={() => handleLoad(item.graph, item.title)}>
              {item.title}
              {index === 0 && (
                <Tag color="blue" style={{ marginLeft: 4 }}>
                  Recent
                </Tag>
              )}
            </a>
          )
        }
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
