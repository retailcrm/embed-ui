# example-order-sidebar

Demo extension fixture for sandbox runtime e2e tests.

The fixture is intentionally stored under `tests/__fixtures__` and served through
the package fixture server so Playwright tests can load the built sandbox first,
then pass this extension URL through the sandbox UI or sandbox API:

```bash
yarn serve:fixture --fixture example-order-sidebar --host 127.0.0.1 --port 4274
```

```text
http://127.0.0.1:4274/index.html
```

Scenario contract:

- widget mode target: `order/card:common.after`;
- page mode code: `orders-dashboard`;
- sandbox fixture: `order-basic`;
- the extension uses the public SDK entrypoint and target routing;
- the widget renders a toolbar action that opens an in-widget details block.
