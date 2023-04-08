import React from 'react'

interface LabelProps {
  /**
   * @title 标签文本
   */
  label: string
  /**
   * @title 值
   */
  value: string
}

const Label: React.FC<LabelProps> = ({ label, value }) => {
  return (
    <div>
      {label}: {value}
    </div>
  )
}
export default React.memo(Label)
