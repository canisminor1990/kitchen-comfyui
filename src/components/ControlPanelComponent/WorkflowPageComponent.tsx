import defaultWorkflow from '@/defaultWorkflow'
import { useAppStore } from '@/store'
import {
  cleanTempWorkflow,
  deleteLocalWorkflowFromId,
  LocalPersistedGraphs,
  PersistedGraph,
  readWorkflowFromFile,
  retrieveLocalWorkflows,
} from '@/utils'
import { DownloadOutlined, FileAddOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Empty, Input, List, message, Space, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { PanelBody, PanelHeader } from './style'
import WorkflowItem from './WorkflowItem'

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
  } = useAppStore(
    (st) => ({
      onLoadWorkflow: st.onLoadWorkflow,
      onDownloadWorkflow: st.onDownloadWorkflow,
      onSaveLocalWorkFlow: st.onSaveLocalWorkFlow,
      onUpdateLocalWorkFlowGraph: st.onUpdateLocalWorkFlowGraph,
      onUpdateLocalWorkFlowTitle: st.onUpdateLocalWorkFlowTitle,
    }),
    shallow
  )

  useEffect(() => {
    setLocalWorkflowList(retrieveLocalWorkflows().sort((a, b) => b.time - a.time))
  }, [count])

  const handleSave = () => {
    onSaveLocalWorkFlow(title)
    setCount(count + 1)
    messageApi.success(`Success! ${title ?? 'Your workflow'} have been saved.`)
  }

  const handleDelete = (id: string, name: string) => {
    deleteLocalWorkflowFromId(id)
    setCount(count + 1)
    messageApi.info(`${name} has been deleted.`)
  }

  const handleLoad = (graph: PersistedGraph, name: string) => {
    onLoadWorkflow(graph)
    setCount(count + 1)
    messageApi.success(`Success! ${name} have been loaded.`)
  }

  const handleUpload = (file: File) => {
    readWorkflowFromFile(file, onLoadWorkflow)
    setCount(count + 1)
    messageApi.success(`Success! the workflow have been loaded.`)
  }

  const handleUpdate = (id: string, name: string) => {
    onUpdateLocalWorkFlowGraph(id)
    setCount(count + 1)
    messageApi.success(`Success! ${name} have been update.`)
  }

  const handleRename = (id: string, name: string) => {
    onUpdateLocalWorkFlowTitle(id, name)
    setCount(count + 1)
    messageApi.success(`Success! the workflow have been renamed to ${name} .`)
  }

  const handleNew = () => {
    cleanTempWorkflow()
    onLoadWorkflow(defaultWorkflow)
    setCount(count + 1)
    messageApi.success(`Success! load default workflow.`)
  }

  const renderList = (item: LocalPersistedGraphs, index: number) => (
    <WorkflowItem
      item={item}
      index={index}
      handleLoad={handleLoad}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      handleRename={handleRename}
    />
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
