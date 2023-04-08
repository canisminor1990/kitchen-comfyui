import { useAppStore } from '@/store'
import { Card, Col, Row } from 'antd'
import { useThemeMode } from 'antd-style'
import React, { useMemo } from 'react'
import ReactJson from 'react-json-view'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const dataList: {
  title: string
  key: 'nodes' | 'edges' | 'graph'
}[] = [
  {
    title: 'Nodes',
    key: 'nodes',
  },
  {
    title: 'Edges',
    key: 'edges',
  },
  {
    title: 'Graph',
    key: 'graph',
  },
]

/******************************************************
 *********************** Style *************************
 ******************************************************/

const View = styled.div`
  padding: 16px;
`

const JsonView = styled.div`
  height: 88vh;
  overflow-y: auto;
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const DataView: React.FC = () => {
  const { isDarkMode } = useThemeMode()
  const state = useAppStore((st) => st, shallow)

  const memoizedDataList = useMemo(() => {
    return dataList.map((item) => ({ ...item, src: state[item.key] }))
  }, [state.nodes, state.edges, state.graph])

  return (
    <View>
      <Row gutter={[8, 8]}>
        {memoizedDataList.map((item) => (
          <Col span={8} key={item.title}>
            <Card size="small" title={item.title}>
              <JsonView>
                <ReactJson src={item.src} theme={isDarkMode ? 'monokai' : 'rjv-default'} />
              </JsonView>
            </Card>
          </Col>
        ))}
      </Row>
    </View>
  )
}

export default React.memo(DataView)
