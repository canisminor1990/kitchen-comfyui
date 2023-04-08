import { Select } from '@/components'
import { useAppStore } from '@/store'
import { getBackendUrl } from '@/utils'
import { FileImageTwoTone } from '@ant-design/icons'
import { Space, Upload } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

/**
 * @title 选择上传输入框参数
 */
interface SelectUploadInputProps {
  /**
   * @title 当前选中值
   */
  value: string
  /**
   * @title 输入框数据
   */
  input: any[][]
  /**
   * @title 值变化的回调函数
   * @param val - 变化后的值
   */
  onChange: (val: any) => void
  /**
   * @title 输入框名称
   */
  name: string
}

const SelectUploadInput: React.FC<SelectUploadInputProps> = ({ value, input, onChange, name }) => {
  const [options, setOptions] = useState<any[]>([])
  const { onRefresh, widgets } = useAppStore((st) => st, shallow)

  useEffect(() => {
    const { LoadImage } = widgets
    const data: any = name === 'image' ? LoadImage?.input?.required?.image?.[0] : input?.[0]
    const flatData = data?.filter((o: string) => !o.includes('\\')).map((o: string) => ({ value: o, label: o })) ?? []
    const groupedData =
      data
        ?.filter((o: string) => o.includes('\\'))
        .reduce((acc: any, o: string) => {
          const [group, label] = o.split('\\')
          if (!acc[group]) acc[group] = []
          acc[group].push({ value: o, label })
          return acc
        }, {}) ?? {}
    const newOptions = [
      ...flatData,
      ...Object.entries(groupedData).map(([key, value]) => ({ label: key, options: value })),
    ]
    setOptions(newOptions)
  }, [input, name, widgets])

  const handleUploadChange = useCallback(
    (info: any) => {
      if (info.file.status === 'done') onRefresh()
      const name = info.file.response?.name
      if (name) onChange(name)
    },
    [onChange, onRefresh]
  )

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
          onChange={handleUploadChange}
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
