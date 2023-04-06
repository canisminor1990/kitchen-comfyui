import { Select } from '@/components'
import { getBackendUrl } from '@/config'
import { FileImageTwoTone } from '@ant-design/icons'
import { Space, Upload } from 'antd'
import React from 'react'

interface SelectUploadInputProps {
  value: string
  input: any[][]
  onChange: (val: any) => void
  name: string
}

const SelectUploadInput: React.FC<SelectUploadInputProps> = ({ value, input, onChange, name }) => {
  const data = input[0]
  let options: any = []
  const newData: any = {}
  const flatDat: any = []
  data.forEach((o) => {
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

  if (flatDat) options = flatDat
  if (newData)
    options = [
      ...options,
      ...Object.entries(newData).map(([key, value]) => ({
        label: key,
        options: value,
      })),
    ]

  return (
    <>
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
      {name === 'image' && (
        <Upload.Dragger style={{ margin: '8px 0' }} action={() => getBackendUrl('/upload/image')} maxCount={1}>
          <Space>
            <FileImageTwoTone />
            Click or drag img to upload
          </Space>
        </Upload.Dragger>
      )}
    </>
  )
}

export default React.memo(SelectUploadInput)
