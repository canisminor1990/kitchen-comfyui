import defaultWorkflow from '@/defaultWorkflow'
import { useAppStore } from '@/store'
import type { LocalPersistedGraphs, PersistedGraph } from '@/types'
import { cleanTempWorkflow, deleteLocalWorkflowFromId, readWorkflowFromFile, retrieveLocalWorkflows } from '@/utils'
import { DownloadOutlined, FileAddOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Empty, Input, List, Space, Upload, message } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import WorkflowItem from './WorkflowItem'
import { PanelBody, PanelHeader } from './style'

const WorkflowPageComponent = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [title, setTitle] = useState<string>()
  const [localWorkflowList, setLocalWorkflowList] = useState<LocalPersistedGraphs[]>()
  const [count, setCount] = useState<number>(0)

  const {
    onLoadWorkflow,
    onDownloadWorkflow,
    onSaveLocalWorkFlow,
    onUpdateLocalWorkFlowGraph,
    onUpdateLocalWorkFlowTitle,
  } = useAppStore((st) => st, shallow)

  /**
   * @title 保存本地工作流
   * @param title - 工作流标题
   * @returns void
   */
  const handleSave = useCallback(() => {
    onSaveLocalWorkFlow(title)
    setCount(count + 1)
    messageApi.success(`Success! ${title ?? 'Your workflow'} have been saved.`)
  }, [count, messageApi, onSaveLocalWorkFlow, title])

  /**
   * @title 删除本地工作流
   * @param id - 工作流 ID
   * @param name - 工作流名称
   * @returns void
   */
  const handleDelete = useCallback(
    (id: string, name: string) => {
      deleteLocalWorkflowFromId(id)
      setCount(count + 1)
      messageApi.info(`${name} has been deleted.`)
    },
    [count, messageApi]
  )

  /**
   * @title 加载工作流
   * @param graph - 工作流图形数据
   * @param name - 工作流名称
   * @returns void
   */
  const handleLoad = useCallback(
    (graph: PersistedGraph, name: string) => {
      onLoadWorkflow(graph)
      setCount(count + 1)
      messageApi.success(`Success! ${name} have been loaded.`)
    },
    [count, messageApi, onLoadWorkflow]
  )

  /**
   * @title 上传工作流文件
   * @param file - 工作流文件
   * @returns void
   */
  const handleUpload = useCallback(
    (file: File) => {
      readWorkflowFromFile(file, onLoadWorkflow)
      setCount(count + 1)
      messageApi.success(`Success! the workflow have been loaded.`)
    },
    [count, messageApi, onLoadWorkflow]
  )

  /**
   * @title 更新本地工作流图形数据
   * @param id - 工作流 ID
   * @param name - 工作流名称
   * @returns void
   */
  const handleUpdate = useCallback(
    (id: string, name: string) => {
      onUpdateLocalWorkFlowGraph(id)
      setCount(count + 1)
      messageApi.success(`Success! ${name} have been update.`)
    },
    [count, messageApi, onUpdateLocalWorkFlowGraph]
  )

  /**
   * @title 重命名本地工作流
   * @param id - 工作流 ID
   * @param name - 新工作流名称
   * @returns void
   */
  const handleRename = useCallback(
    (id: string, name: string) => {
      onUpdateLocalWorkFlowTitle(id, name)
      setCount(count + 1)
      messageApi.success(`Success! the workflow have been renamed to ${name} .`)
    },
    [count, messageApi, onUpdateLocalWorkFlowTitle]
  )

  /**
   * @title 加载默认工作流
   * @returns void
   */
  const handleNew = useCallback(() => {
    cleanTempWorkflow()
    onLoadWorkflow(defaultWorkflow)
    setCount(count + 1)
    messageApi.success(`Success! load default workflow.`)
  }, [count, messageApi, onLoadWorkflow])

  useEffect(() => {
    setLocalWorkflowList(retrieveLocalWorkflows().sort((a, b) => b.time - a.time))
  }, [count])

  const renderList = useCallback(
    (item: LocalPersistedGraphs, index: number) => (
      <WorkflowItem
        item={item}
        index={index}
        handleLoad={handleLoad}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleRename={handleRename}
      />
    ),
    [handleDelete, handleLoad, handleRename, handleUpdate]
  )

  return (
    <>
      {contextHolder}
      <PanelHeader>
        <Space.Compact style={{ width: '100%' }}>
          <Input placeholder="Name the workflow to save" onChange={(e) => setTitle(e.target.value)} />
          <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>
            Save
          </Button>
        </Space.Compact>
        <Space.Compact style={{ marginLeft: 8 }}>
          <Button title="New" icon={<FileAddOutlined />} onClick={handleNew} />
          <Button title="Download" icon={<DownloadOutlined />} onClick={onDownloadWorkflow} />
          <Upload accept=".json" maxCount={1} itemRender={() => null} beforeUpload={handleUpload}>
            <Button title="Upload" icon={<UploadOutlined />} />
          </Upload>
        </Space.Compact>
      </PanelHeader>
      <PanelBody>
        <h5>Local Workflows</h5>
        {localWorkflowList?.length === 0 ? (
          <Empty
            style={{ marginTop: '40vh' }}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description="Nothing here yet!"
          />
        ) : (
          <List dataSource={localWorkflowList} renderItem={renderList} />
        )}
      </PanelBody>
    </>
  )
}

export default React.memo(WorkflowPageComponent)
