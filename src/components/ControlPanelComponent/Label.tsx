import React from 'react'

interface LabelProps {
  label: string
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
