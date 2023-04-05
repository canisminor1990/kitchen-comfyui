import { useAppStore } from '@/store'
import { Card, Col, Row } from 'antd'
import { useThemeMode } from 'antd-style'
import React from 'react'
import ReactJson from 'react-json-view'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const View = styled.div`
  padding: 16px;
`

const JsonView = styled.div`
  height: 88vh;
  overflow-y: auto;
`

const DataView: React.FC = () => {
  const { isDarkMode } = useThemeMode()
  const { graph, nodes, edges } = useAppStore(
    (st) => ({
      graph: st.graph,
      nodes: st.nodes,
      edges: st.edges,
    }),
    shallow
  )

  const dataList = [
    {
      title: 'Nodes',
      src: nodes,
    },
    {
      title: 'Edges',
      src: edges,
    },
    {
      title: 'Graph',
      src: graph,
    },
  ]

  return (
    <View>
      <Row gutter={[8, 8]}>
        {dataList.map((item) => (
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
