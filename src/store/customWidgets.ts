import { Widget, WidgetKey } from '@/types'

const customWidgets: Record<WidgetKey, Widget> = {
  Group: {
    input: {
      required: {},
    },
    output: [],
    output_name: [],
    name: 'Group',
    category: 'Utils',
  },
  Reroute: {
    input: { required: { ['*']: ['*'] } },
    output: ['*'],
    output_name: [],
    name: 'Reroute',
    category: 'Utils',
  },
}

export default customWidgets
