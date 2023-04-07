import { SpaceGrid } from '@/components/NodeComponent/style'
import { useAppStore } from '@/store'
import { Widget } from '@/types'
import { checkInput } from '@/utils'
import React from 'react'
import { NodeProps } from 'reactflow'
import { shallow } from 'zustand/shallow'
import NodeImgPreview from './NodeImgPreview'
import NodeInputs from './NodeInputs'
import NodeOutpus from './NodeOutpus'
import NodeParams from './NodeParams'

const SdNode: React.FC<NodeProps<Widget>> = (node) => {
  const { imagePreviews, inputImgPreviews } = useAppStore(
    (st) => ({
      imagePreviews: st.graph?.[node.id]?.images
        ?.map((image, index) => {
          return {
            image,
            index,
          }
        })
        .filter(Boolean),
      inputImgPreviews: [
        {
          image: {
            filename: st.onGetNodeFieldsData(node.id, 'image'),
            type: 'input',
          },
          index: 0,
        },
      ].filter((i) => i.image.filename),
      onPropChange: st.onPropChange,
    }),
    shallow
  )

  const params: any[] = []
  const inputs: any[] = []
  const outputs: any[] = node.data.output

  for (const [property, input] of Object.entries(node.data.input.required)) {
    if (checkInput.isParameterOrList(input)) {
      params.push({ name: property, type: input[0], input })
    } else {
      inputs.push({ name: property, type: input[0] })
    }
  }

  return (
    <>
      <SpaceGrid>
        <NodeInputs data={inputs} />
        <NodeOutpus data={outputs} />
      </SpaceGrid>
      <NodeParams data={params} nodeId={node.id} />
      <NodeImgPreview data={imagePreviews || inputImgPreviews} />
    </>
  )
}

export default React.memo(SdNode)
