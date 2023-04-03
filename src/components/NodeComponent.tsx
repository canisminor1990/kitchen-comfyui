import { InputContainer } from '@/components'
import { getBackendUrl } from '@/config'
import { CopyIcon, ExitFullScreenIcon, TrashIcon } from '@radix-ui/react-icons'
import queryString from 'query-string'
import React from 'react'
import { Handle, Position, type HandleType, type NodeProps } from 'reactflow'
import { ImageItem, Input, type NodeId, type Widget } from '../types'
import './NodeComponent.css'

export const NODE_IDENTIFIER = 'sdNode'

interface ImagePreview {
  image: ImageItem
  index: number
}

interface NodeComponentProps {
  node: NodeProps<Widget>
  progressBar?: number
  imagePreviews?: ImagePreview[]
  onPreviewImage: (idx: number) => void
  onDuplicateNode: (id: NodeId) => void
  onDeleteNode: (id: NodeId) => void
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  progressBar,
  imagePreviews,
  onPreviewImage,
  onDuplicateNode,
  onDeleteNode,
}) => {
  const params = []
  const inputs = []
  for (const [property, input] of Object.entries(node.data.input.required)) {
    if (Input.isParameterOrList(input)) {
      params.push({ property, input })
    } else {
      inputs.push(property)
    }
  }

  const isInProgress = progressBar !== undefined
  const defaultClasses = [
    'drop-shadow-md',
    'rounded-md',
    'bg-stone-900',
    'border-2',
    'flex',
    'flex-col',
    'overflow-hidden',
    'graph-node',
  ]
  const borderClasses = isInProgress ? ['border-teal-500'] : node.selected ? ['border-stone-100'] : ['border-stone-400']

  return (
    <div className={defaultClasses.concat(borderClasses).join(' ')}>
      <div className="bg-stone-800 flex justify-between relative">
        <h2 className="font-semibold px-2">{node.data.name}</h2>
        {isInProgress ? <div className="progress-bar bg-teal-800" style={{ width: `${progressBar * 100}%` }} /> : <></>}
        {node.selected ? (
          <div className="flex items-center px-1">
            <CopyIcon className="h-5 w-5 text-zinc-200 cursor-pointer" onClick={() => onDuplicateNode(node.id)} />
            <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => onDeleteNode(node.id)} />
            <ExitFullScreenIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="px-2 py-2 flex space-x-2 justify-between">
        <div className="flex flex-col grow-0 py-1">
          {inputs.map((k) => (
            <Slot key={k} id={k} label={k} type="target" position={Position.Left} />
          ))}
        </div>
        <div className="flex flex-col items-start grow p-1 space-y-1 text-sm">
          {params.map(({ property, input }) => (
            <InputContainer key={property} name={property} id={node.id} input={input} />
          ))}
        </div>
        <div className="flex flex-col py-1">
          {node.data.output.map((k) => (
            <Slot key={k} id={k} label={k} type="source" position={Position.Right} />
          ))}
        </div>
      </div>
      <div className="m-auto flex flex-wrap max-w-xs mb-2">
        {imagePreviews
          ?.map(({ image, index }) => (
            <div className="flex grow basis-1/2" key={index}>
              <img
                className="w-full rounded-xl drop-shadow-md p-1"
                src={getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))}
                onClick={() => onPreviewImage(index)}
              />
            </div>
          ))
          .reverse()}
      </div>
    </div>
  )
}

export default React.memo(NodeComponent)

interface SlotProps {
  id: string
  label: string
  type: HandleType
  position: Position
}

const Slot: React.FC<SlotProps> = ({ id, label, type, position }) => {
  return (
    <div className={position === Position.Right ? 'flex flex-row-reverse' : 'flex'}>
      <Handle id={id} type={type} position={position} className="w-3 h-3 !bg-teal-500 relative" />
      <h5 className="font-semibold text-xs" style={{ marginBottom: 2 }}>
        {label.toUpperCase()}
      </h5>
    </div>
  )
}
