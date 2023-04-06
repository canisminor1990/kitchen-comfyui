import { Select } from '@/components'
import { getBackendUrl } from '@/config'
import { useAppStore } from '@/store'
import { FileImageTwoTone } from '@ant-design/icons'
import { Space, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

interface SelectUploadInputProps {
  value: string
  input: any[][]
  onChange: (val: any) => void
  name: string
}

const SelectUploadInput: React.FC<SelectUploadInputProps> = ({ value, input, onChange, name }) => {
  const [options, setOptions] = useState()

  const { onRefresh, widgets } = useAppStore(
    (st) => ({
      onRefresh: st.onRefresh,
      widgets: st.widgets,
    }),
    shallow
  )

  useEffect(() => {
    let data: any
    if (name === 'image') {
      data = widgets.LoadImage.input.required.image[0]
    } else {
      data = input[0]
    }
    let opt: any = []
    const newData: any = {}
    const flatDat: any = []
    data.forEach((o: any) => {
      if (o.includes('\\')) {
        const group = o.split('\\')[0]
        const name = o.split('\\')[1]
        if (!newData[group]) newData[group] = []
        newData[group].push({
          value: o,
          label: name,
        })
      } else {
        flatDat.push({
          value: o,
          label: o,
        })
      }
    })

    if (flatDat) opt = flatDat
    if (newData)
      opt = [
        ...opt,
        ...Object.entries(newData).map(([key, value]) => ({
          label: key,
          options: value,
        })),
      ]
    setOptions(opt)
  }, [input, widgets])

  return (
    <>
      {name === 'image' && (
        <Upload.Dragger
          accept=".png, .jpg, .jpeg, .webp"
          style={{ margin: '8px 0' }}
          itemRender={() => null}
          name="image"
          action={() => getBackendUrl('/upload/image')}
          maxCount={1}
          onChange={(info) => {
            if (info.file.status === 'done') onRefresh()
            const name = info.file.response?.name
            if (name) onChange(name)
          }}
        >
          <Space>
            <FileImageTwoTone />
            Click or drag img to upload
          </Space>
        </Upload.Dragger>
      )}
      <Select
        showSearch
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(v, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(v.toLowerCase())
        }
        style={{ width: '100%' }}
        size="small"
        value={value}
        defaultValue={input[0][0]}
        onChange={onChange}
        options={options}
      />
    </>
  )
}

export default React.memo(SelectUploadInput)
