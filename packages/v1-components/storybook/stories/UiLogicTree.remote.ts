import type { UiLogicTreeNode } from '@/common/components/logic-tree'

import UiLogicTreeRemoteExample from './UiLogicTree.remote.example.vue'

import { createComponentEndpoint } from '../endpoint'

type NodeData = {
  title: string;
  icon?: string;
  controls?: unknown[];
  actions?: Array<{
    id: string;
    kind: Exclude<UiLogicTreeNode['kind'], 'branch'>;
    label: string;
  }>;
  inline?: unknown[];
  removable?: boolean;
}

type Styles = Record<string, string>

createComponentEndpoint<{
  items?: UiLogicTreeNode<NodeData>[];
  styles?: Styles;
}>({
  async run (createApp, root, props) {
    const app = createApp(UiLogicTreeRemoteExample, props)

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)
