# Changelog


## [0.9.10](https://github.com/retailcrm/embed-ui/compare/v0.9.9...v0.9.10) (2026-02-18)

### Features

* **v1-contexts:** Added fields customer.id, customer.externalId to order/card context ([5c54adc](https://github.com/retailcrm/embed-ui/commit/5c54adc32def1c4df93cab6ee652119e36e6bb5e))
## [0.9.10-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.9.9...v0.9.10-alpha.1) (2026-02-17)

### Features

* **v1-contexts:** Added fields customer.id, customer.externalId to order/card context ([03e0778](https://github.com/retailcrm/embed-ui/commit/03e077840d7859416a562410c21a1499728fd43a))
## [0.9.9](https://github.com/retailcrm/embed-ui/compare/v0.9.8...v0.9.9) (2026-02-12)

### Bug Fixes

* **v1-components:** apply vue plugins to storybook worker build ([5054dd7](https://github.com/retailcrm/embed-ui/commit/5054dd700948770b1eecabd37f9ec67a32ab4e55))
## [0.9.8](https://github.com/retailcrm/embed-ui/compare/v0.9.7...v0.9.8) (2026-02-12)

### Features

* **v1-components:** UiSelect, UiMenuItem components added ([7980397](https://github.com/retailcrm/embed-ui/commit/7980397c83c20bf92453b5c9b2ba3eda4f6da93f))

### Bug Fixes

* CreateRoot host registry was synchronized with v1-components render graph ([eaa04a8](https://github.com/retailcrm/embed-ui/commit/eaa04a88712116ffeb7c4af047d419abff4e8847))
## [0.9.7](https://github.com/retailcrm/embed-ui/compare/v0.9.6...v0.9.7) (2026-01-13)

### Bug Fixes

* **v1-components:** Missing host.d.ts ([2082c4d](https://github.com/retailcrm/embed-ui/commit/2082c4da7708e957ff333882b6ebaddf70593a5f))
## [0.9.6](https://github.com/retailcrm/embed-ui/compare/v0.9.5...v0.9.6) (2026-01-13)

### Bug Fixes

* Was added height property and orbstack domain ([03485b0](https://github.com/retailcrm/embed-ui/commit/03485b0172bcbf1ee517b5f9d392831b928ec08f))
## [0.9.5](https://github.com/retailcrm/embed-ui/compare/v0.9.4...v0.9.5) (2025-12-09)

### Features

* **v1-components:** Added rows/cols native textarea attributes to UiTextbox (works only for multiline=true) ([c1784bb](https://github.com/retailcrm/embed-ui/commit/c1784bb340dec27ca39decf49ba8dc2cb88f1b9b))
## [0.9.4](https://github.com/retailcrm/embed-ui/compare/v0.9.3...v0.9.4) (2025-12-08)

### Bug Fixes

* **v1-components:** Attributes inheritance for UiModalSidebar ([3c775c9](https://github.com/retailcrm/embed-ui/commit/3c775c9aee5211e0cf0efb8dcf351807089a437c))
## [0.9.3](https://github.com/retailcrm/embed-ui/compare/v0.9.2...v0.9.3) (2025-11-24)

### Bug Fixes

* Replaced useTemplateRef with shallowRef ([8382815](https://github.com/retailcrm/embed-ui/commit/8382815a28f1f7e0c1b298d7058f6e64136efbb7))
* Style for disabled textbox ([45bb4a4](https://github.com/retailcrm/embed-ui/commit/45bb4a40e23664c1d7e742ab6735c0d856539caa))
## [0.9.2](https://github.com/retailcrm/embed-ui/compare/v0.9.1...v0.9.2) (2025-11-24)

### Bug Fixes

* Height of UiTextbox in multiline mode ([bdcf4a4](https://github.com/retailcrm/embed-ui/commit/bdcf4a4c7152b8a096e3d3de9d8ce8fb293310fb))
## [0.9.1](https://github.com/retailcrm/embed-ui/compare/v0.9.1-alpha.2...v0.9.1) (2025-11-24)

### Features

* Added goTo method to host callables for navigation inside CRM ([25d72dc](https://github.com/retailcrm/embed-ui/commit/25d72dc84fb4476abe1f9275763fd8a7d6a9a7cd))
* UiTextbox component - basic text input ([28eda2a](https://github.com/retailcrm/embed-ui/commit/28eda2a659eefdd7a1dbaad8d1c5a40b8e613345))

### Bug Fixes

* Fixed en-GB locale for UiTag ([debe5a5](https://github.com/retailcrm/embed-ui/commit/debe5a5e72579d399f42bbe23a58ddf0f3f501c0))
## [0.9.1-alpha.2](https://github.com/retailcrm/embed-ui/compare/v0.9.1-alpha.1...v0.9.1-alpha.2) (2025-11-12)

### Features

* ref [#102071](https://github.com/retailcrm/embed-ui/issues/102071) Implementation of a general scheme for a card in the orders section and in chats ([ade5857](https://github.com/retailcrm/embed-ui/commit/ade58571a689a073c9b97b36e424ee5c13ab7162))
## [0.9.1-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.9.0...v0.9.1-alpha.1) (2025-11-05)

### Features

* ref [#102071](https://github.com/retailcrm/embed-ui/issues/102071) Embed targets of the order form in chats ([e3fe25e](https://github.com/retailcrm/embed-ui/commit/e3fe25e90cde30a347d025ad0736da7c131fd3ed))
* **v-contexts:** ref [#102071](https://github.com/retailcrm/embed-ui/issues/102071) Context for embed targets of the order form in chats ([7c3aae2](https://github.com/retailcrm/embed-ui/commit/7c3aae267c04e8709548214106bc2d02ee2f8fbb))
## [0.9.0](https://github.com/retailcrm/embed-ui/compare/v0.8.4...v0.9.0) (2025-09-12)

### ⚠ BREAKING CHANGES

* Заменена цель customer/card:appeals на цели customer/card:inWork.before и customer/card:inWork.after

### Features

* Заменена цель customer/card:appeals на цели customer/card:inWork.before и customer/card:inWork.after ([5763fd8](https://github.com/retailcrm/embed-ui/commit/5763fd8d3aa9d4e823c5f142d0e18d930d51c946))
## [0.8.4](https://github.com/retailcrm/embed-ui/compare/v0.8.3...v0.8.4) (2025-09-10)

### Bug Fixes

* Изменено описание для цели customer/card:appeals ([7129d33](https://github.com/retailcrm/embed-ui/commit/7129d334c28abaadf2f9a8b686042287e98dd615))
## [0.8.3](https://github.com/retailcrm/embed-ui/compare/v0.8.2...v0.8.3) (2025-09-09)

### Features

* Добавлен новая цель customer/card:appeals ([e65ae36](https://github.com/retailcrm/embed-ui/commit/e65ae36b0b0f1c82aa4409745db56344e208f047))
## [0.8.2](https://github.com/retailcrm/embed-ui/compare/v0.8.1...v0.8.2) (2025-08-14)

### Features

* Updated metadata for order/card targets ([ca9dee2](https://github.com/retailcrm/embed-ui/commit/ca9dee2eaf6ed71385fcb8409999c9ea4e5774ef))
## [0.8.1](https://github.com/retailcrm/embed-ui/compare/v0.8.0...v0.8.1) (2025-07-29)

### Features

* Added field 'code' to OrderItemStatus ([892ebdd](https://github.com/retailcrm/embed-ui/commit/892ebdd0fa008d33abf0668e6c5ba3a51bc6886e))
## [0.8.0](https://github.com/retailcrm/embed-ui/compare/v0.7.0...v0.8.0) (2025-07-29)

### ⚠ BREAKING CHANGES

* **v1-contexts:** Changing status by code instead of id, because id is not available in CRM's REST API

### Bug Fixes

* **v1-contexts:** Changing status by code instead of id, because id is not available in CRM's REST API ([a36df1c](https://github.com/retailcrm/embed-ui/commit/a36df1ce9f8eb0ee9fe34c3f9f726b02cc784893))
## [0.7.0](https://github.com/retailcrm/embed-ui/compare/v0.6.1...v0.7.0) (2025-07-28)

### ⚠ BREAKING CHANGES

* **v1-contexts:** Убрана возможность передать null в качестве statusId в действии changeItemStatus, переименовано поле в действии createItem priceCode => priceTypeCode

### Bug Fixes

* **v1-contexts:** Убрана возможность передать null в качестве statusId в действии changeItemStatus, переименовано поле в действии createItem priceCode => priceTypeCode ([548be18](https://github.com/retailcrm/embed-ui/commit/548be184af62f61e36b0780b5ecb80204999df42))
## [0.6.1](https://github.com/retailcrm/embed-ui/compare/v0.6.0...v0.6.1) (2025-07-27)

### Features

* **v1-contexts:** Added changeItemStatus method to order/card actions ([4e8b471](https://github.com/retailcrm/embed-ui/commit/4e8b4719a090824ef379e786a199d1ed06f566e4))
## [0.6.0](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.8...v0.6.0) (2025-07-24)
## [0.5.23-alpha.8](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.7...v0.5.23-alpha.8) (2025-07-23)

### Features

* **v1-contexts:** Host rejections in actions ([894e635](https://github.com/retailcrm/embed-ui/commit/894e635febf104440d673abfaea13ad8514b883f))
## [0.5.23-alpha.7](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.6...v0.5.23-alpha.7) (2025-07-22)

### Bug Fixes

* Fixed shape analysis if a key exists and its value is undefined ([c337650](https://github.com/retailcrm/embed-ui/commit/c337650fc1ab6a330563542954a4ef176f4b70b9))
## [0.5.23-alpha.6](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.5...v0.5.23-alpha.6) (2025-07-22)

### Features

* **v1-contexts:** Added method for changing order items' manual discounts ([ff23336](https://github.com/retailcrm/embed-ui/commit/ff23336c314607c075ee1ea03c1902df92bfac34))

### Bug Fixes

* Arguments names of changeItemQuantity action ([520a575](https://github.com/retailcrm/embed-ui/commit/520a575ef091689b5489cce1546a22a934bdfcdd))
## [0.5.23-alpha.5](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.4...v0.5.23-alpha.5) (2025-07-21)

### Bug Fixes

* **v1-contexts:** Returning undefined instead of throwing error if unknown method was requested ([9f0296e](https://github.com/retailcrm/embed-ui/commit/9f0296e5e2cdb9c1b46ae0555c81823c8372a6ef))
## [0.5.23-alpha.4](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.3...v0.5.23-alpha.4) (2025-07-20)

### ⚠ BREAKING CHANGES

* **v1-types:** Removed deprecated type ContextSchemaMap, renamed ActionArgs => ActionAccepts, ReturnType replaced with ActionExpects that extracts return type from async functions
* **v1-contexts:** Metadata format, previous data is now accessible by key 'contexts'
* contextsUsage was removed from metadata in flavor to changes of contexts format, actualizing signatures in the root package according to recent features

### Features

* contextsUsage was removed from metadata in flavor to changes of contexts format, actualizing signatures in the root package according to recent features ([94d4486](https://github.com/retailcrm/embed-ui/commit/94d4486d18d4a6408e11abf92c0d676258b7fb22))
* **v1-contexts:** Actions signatures, JSON metadata for actions & types for automatic docs generation ([899cf2b](https://github.com/retailcrm/embed-ui/commit/899cf2b258d6b21c2a3fce0f0d043ff8076c6d8c))
* **v1-contexts:** Added scaffolding logic for order/card:items actions ([0a042d1](https://github.com/retailcrm/embed-ui/commit/0a042d1b3cdaf36d78f7939b1537c206877da774))
* **v1-contexts:** Merged order/card:items context into order/card ([02920bf](https://github.com/retailcrm/embed-ui/commit/02920bf2c104453b0c39d1bf9fd344d67969395e))
* **v1-contexts:** Metadata format, previous data is now accessible by key 'contexts' ([c09bfee](https://github.com/retailcrm/embed-ui/commit/c09bfee5159ddae683a4b1c52a36eabc6df18bd2))
* **v1-contexts:** Signature of createItem action in order/card:items ([3f15da3](https://github.com/retailcrm/embed-ui/commit/3f15da38be9a61168fd83fa96f114d8fa4097015))
* **v1-types:** Added type for i18n translations for objects keys ([5ff68fe](https://github.com/retailcrm/embed-ui/commit/5ff68fe6b163ce81f4af63e90c354def8f051ea7))
* **v1-types:** Added types for actions ([0e23060](https://github.com/retailcrm/embed-ui/commit/0e2306060165b877d572580e08dae8232a75091e))
* **v1-types:** Removed deprecated type ContextSchemaMap, renamed ActionArgs => ActionAccepts, ReturnType replaced with ActionExpects that extracts return type from async functions ([637d3c2](https://github.com/retailcrm/embed-ui/commit/637d3c272bd156764692c86a8a445fa0f4836763))
## [0.5.23-alpha.3](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.2...v0.5.23-alpha.3) (2025-07-11)

### Features

* **v1-contexts:** Added discount.amount, discount.percent, discount.total to order/card context ([c0a23a5](https://github.com/retailcrm/embed-ui/commit/c0a23a5bbaa6e73840d79a6d27d06e3d25eb3cde))
## [0.5.23-alpha.2](https://github.com/retailcrm/embed-ui/compare/v0.5.23-alpha.1...v0.5.23-alpha.2) (2025-07-03)

### Bug Fixes

* **v1-contexts:** Missing order/card:items context in schema list ([2b3d489](https://github.com/retailcrm/embed-ui/commit/2b3d489e45e2a14111bb184814f33a2f7b0d090a))
## [0.5.23-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.5.22...v0.5.23-alpha.1) (2025-07-03)

### Features

* Re-export of order items & settings contexts in the root package ([7b586dc](https://github.com/retailcrm/embed-ui/commit/7b586dcf8d3d6abaa6cee9f215c590a921598185))
* **v1-contexts:** Added context for order items ([030e47e](https://github.com/retailcrm/embed-ui/commit/030e47e25e60be89a2f7dc6b72e25746a7e91b02))
* **v1-contexts:** Added context for OrderItems ([6a93fa1](https://github.com/retailcrm/embed-ui/commit/6a93fa157eca56504b73f8ef526740e31f637acf))
* **v1-contexts:** Added contexts for order card settings ([a0fc9d7](https://github.com/retailcrm/embed-ui/commit/a0fc9d77edabc9dfec3ae5840ea6b684c99d8a06))
* **v1-types:** Added types for basic entities ([608acd7](https://github.com/retailcrm/embed-ui/commit/608acd7db36972b15d82b58607fbdcef53ec517e))
## [0.5.22](https://github.com/retailcrm/embed-ui/compare/v0.5.21...v0.5.22) (2025-02-04)

### Features

* Added new target customer/card:communications.after ([30fda6d](https://github.com/retailcrm/embed-ui/commit/30fda6d7f3b7261a6946af692aa58bd00f5540d8))

### Bug Fixes

* **v1-components:** Missing floating-ui dependencies ([45836bd](https://github.com/retailcrm/embed-ui/commit/45836bd455d931d21bf4acdae1704a18cee19d13))
## [0.5.21](https://github.com/retailcrm/embed-ui/compare/v0.5.20...v0.5.21) (2025-02-03)

### Bug Fixes

* **v1-components:** Fixed date format for spanish locales ([9be1716](https://github.com/retailcrm/embed-ui/commit/9be17164856fd5435c5326acb76aaca2c202b3d5))
## [0.5.20](https://github.com/retailcrm/embed-ui/compare/v0.5.19...v0.5.20) (2025-01-31)

### Bug Fixes

* **v1-components:** Missing UiCopyButton slots definition ([7ac224a](https://github.com/retailcrm/embed-ui/commit/7ac224ad812f19b948473051aa0170217cec97ce))
## [0.5.19](https://github.com/retailcrm/embed-ui/compare/v0.5.18...v0.5.19) (2025-01-31)

### Bug Fixes

* **v1-components:** Missing UiDate in exported remote members ([7a91ba4](https://github.com/retailcrm/embed-ui/commit/7a91ba4251a6a056e2cf927c094c84804832b1ee))
## [0.5.18](https://github.com/retailcrm/embed-ui/compare/v0.5.17...v0.5.18) (2025-01-30)

### Features

* Added popper/tooltip components to known components list ([911df10](https://github.com/retailcrm/embed-ui/commit/911df1068c1bf5dcd4944bab4fb2d35833b30f13))
* Added UiCopyButton to known ui components list ([d3d4cab](https://github.com/retailcrm/embed-ui/commit/d3d4cab6185bfd36fa8a9d40d804063d8d930b63))
* **v1-components:** ref [#99154](https://github.com/retailcrm/embed-ui/issues/99154) UiPopper/UiPopperTarget/UiPopperConnector/UiTooltip components ([2cb529d](https://github.com/retailcrm/embed-ui/commit/2cb529d65226d27add1eed22e1a21316dce839a2))
* **v1-components:** UiCopyButton component ([35e78b3](https://github.com/retailcrm/embed-ui/commit/35e78b33143f3376ca5efae62224dd6a41ddad1a))
## [0.5.17](https://github.com/retailcrm/embed-ui/compare/v0.5.16...v0.5.17) (2025-01-28)

### Bug Fixes

* Missing UiDate component in createRoot utility ([1754b87](https://github.com/retailcrm/embed-ui/commit/1754b8714ca5f11466ddfe0d806d7e84beb8c4b1))
## [0.5.16](https://github.com/retailcrm/embed-ui/compare/v0.5.15...v0.5.16) (2025-01-27)

### Features

* **v1-components:** UiDate & utilities for date/time formatting with automatic vue-i18n locale detection ([41ad8b0](https://github.com/retailcrm/embed-ui/commit/41ad8b07bba29981a3c8132953d90cb5560a00a3))
## [0.5.15](https://github.com/retailcrm/embed-ui/compare/v0.5.14...v0.5.15) (2025-01-24)

### Features

* Composable utility for using @omnicajs/symfony-fouter ([cc9df5a](https://github.com/retailcrm/embed-ui/commit/cc9df5a274fdfefd0ca2ec56bcf87eec8130fe8e))

### Bug Fixes

* **v1-components:** Avatar display style ([b29c9a8](https://github.com/retailcrm/embed-ui/commit/b29c9a864c5a5e4bbd53836a1313d7090917d058))
## [0.5.14](https://github.com/retailcrm/embed-ui/compare/v0.5.13...v0.5.14) (2025-01-24)

### Bug Fixes

* **v1-components:** isURL predicate now returns true for relative URLs without protocol ([7de880e](https://github.com/retailcrm/embed-ui/commit/7de880e5a02995b28d31ef8589a3bcc88f5e48c5))
## [0.5.13](https://github.com/retailcrm/embed-ui/compare/v0.5.12...v0.5.13) (2025-01-24)

### Features

* **v1-components:** Expanded TS type 'Dimensions' with a set of values like `-xM` ([90e270f](https://github.com/retailcrm/embed-ui/commit/90e270f62a1c4af2c05257784910220d2ba3ee5c))

### Bug Fixes

* **v1-components:** Validator for UiLink & UiToolbarLink allows javascript:void(0) ([693e7d4](https://github.com/retailcrm/embed-ui/commit/693e7d4645332d11b91d8041e0dfa918f07f86a7))
## [0.5.12](https://github.com/retailcrm/embed-ui/compare/v0.5.11...v0.5.12) (2025-01-23)

### Features

* **v1-contexts:** Added field for system routing data ([5638050](https://github.com/retailcrm/embed-ui/commit/563805062d3ae2c90f30bb65fc8bda3a18fdc374))
* **v1-contexts:** Added isAdmin/isManager flags to user/current context ([a0c491a](https://github.com/retailcrm/embed-ui/commit/a0c491a030f333c606431b9ea33b4e4b95624024))

### Bug Fixes

* **v1-components:** Adjusting types in package according to the fix from v1-types ([a3e8f1f](https://github.com/retailcrm/embed-ui/commit/a3e8f1fd79e3730df806f372712e59fa0b9853eb))
* **v1-types:** Accepts method of fields in schemas ([deffa6f](https://github.com/retailcrm/embed-ui/commit/deffa6ff04ee3a50c4282d7264e9841f08194411))
## [0.5.11](https://github.com/retailcrm/embed-ui/compare/v0.5.10...v0.5.11) (2025-01-22)

### Bug Fixes

* **v1-components:** If workers array is empty, original image source will be used ([27fa33c](https://github.com/retailcrm/embed-ui/commit/27fa33c1ee5f10dbbf007ad0ddce5c77d7dca48f))
## [0.5.10](https://github.com/retailcrm/embed-ui/compare/v0.5.9...v0.5.10) (2025-01-21)

### Features

* Added UiImage to known components list ([316e39c](https://github.com/retailcrm/embed-ui/commit/316e39cd784aa43cab2d6a3919aeacd0073ba73a))
* **v1-components:** Added logic for image optimizing: resize/crop, UiImage component that implements optimization logic, UiAvatar images optimized by default, if workers array is provided ([6d7dcfa](https://github.com/retailcrm/embed-ui/commit/6d7dcfa34a30fe48684be85082ed8a968c4965a8))
* **v1-contexts:** Added field 'image.workers' to settings context ([38355b2](https://github.com/retailcrm/embed-ui/commit/38355b28dd037c54cebe8dcfd77e9264f3a3560c))
## [0.5.9](https://github.com/retailcrm/embed-ui/compare/v0.5.8...v0.5.9) (2025-01-15)

### Features

* Added customContexts field to targets's metadata used by docs generators ([1bcc318](https://github.com/retailcrm/embed-ui/commit/1bcc318a75e31f9858f29011506be5e62040c6a4))
## [0.5.8](https://github.com/retailcrm/embed-ui/compare/v0.5.7...v0.5.8) (2025-01-14)

### Bug Fixes

* **v1-components:** Missing UiAvatarList in host environment ([a1f1d55](https://github.com/retailcrm/embed-ui/commit/a1f1d55c70a687815eb2169720468e5c65a874bf))
## [0.5.7](https://github.com/retailcrm/embed-ui/compare/v0.5.6...v0.5.7) (2025-01-14)

### Features

* **v1-components:** Added chevron-left icon sprite ([687a69c](https://github.com/retailcrm/embed-ui/commit/687a69c13c858c4ae258f2bad1185bfb116a926e))
* **v1-components:** Added UiAvatar component ([ea6ae32](https://github.com/retailcrm/embed-ui/commit/ea6ae32e6e0a6db7764788fc51774eb5455ba2eb))
## [0.5.6](https://github.com/retailcrm/embed-ui/compare/v0.5.5...v0.5.6) (2025-01-03)

### Bug Fixes

* Updated vue-remote to v0.2.5 with fixes to host tree update mechanism ([72427e5](https://github.com/retailcrm/embed-ui/commit/72427e5883d51090a684b91d5e18ec508fa04389))
## [0.5.5](https://github.com/retailcrm/embed-ui/compare/v0.5.4...v0.5.5) (2024-12-28)

### Features

* Added options to useCustomField so it is possible to narrow it's type & handle errors of interactions with host ([43a08fa](https://github.com/retailcrm/embed-ui/commit/43a08fa3c651775342d59d6eec56b97c3cc56a66))
## [0.5.4](https://github.com/retailcrm/embed-ui/compare/v0.5.3...v0.5.4) (2024-12-25)

### Bug Fixes

* **v1-contexts:** Setting value in reactive state for custom context ([226669d](https://github.com/retailcrm/embed-ui/commit/226669d64604c6246e6fea0e0758394a7f260847))
## [0.5.3](https://github.com/retailcrm/embed-ui/compare/v0.5.3-alpha.1...v0.5.3) (2024-12-25)
## [0.5.3-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.5.2-1.0...v0.5.3-alpha.1) (2024-12-24)
## [0.5.2](https://github.com/retailcrm/embed-ui/compare/v0.5.1...v0.5.2) (2024-12-24)

Special release for the fixes included. Please take a note here that alpha versions' changes were not included.

### Bug Fixes

* Fixed description of target 'order/card:comment.manager.before' ([dbe61c7](https://github.com/retailcrm/embed-ui/commit/dbe61c7425d86a4cf85e56ba3fdc7684d4e75241))
## [0.5.2-alpha.4](https://github.com/retailcrm/embed-ui/compare/v0.5.2-alpha.3...v0.5.2-alpha.4) (2024-12-24)

### Features

* **v1-types:** Removed before/last fields from CustomDictionaryFilter ([54f64ab](https://github.com/retailcrm/embed-ui/commit/54f64aba383016a081d5efe3ff6ee05cb6ecbb47))

### Bug Fixes

* Missing UiCheckbox/UiRadio in components' names list passed to remote root ([2d0981e](https://github.com/retailcrm/embed-ui/commit/2d0981eed28e076c51b4a4afb562a1fa69f0fd40))
## [0.5.2-alpha.3](https://github.com/retailcrm/embed-ui/compare/v0.5.2-alpha.2...v0.5.2-alpha.3) (2024-12-23)

### Bug Fixes

* **v1-contexts:** Missing company.KPP field of order/card context from v0.5.1 ([11c3cc4](https://github.com/retailcrm/embed-ui/commit/11c3cc41e66312b695e3fa500f07b352dde7812d))
## [0.5.2-alpha.2](https://github.com/retailcrm/embed-ui/compare/v0.5.2-alpha.1...v0.5.2-alpha.2) (2024-12-23)

### Bug Fixes

* **v1-components:** Missing UiRadio host export ([8811cf6](https://github.com/retailcrm/embed-ui/commit/8811cf6ca5a74f50aedcd354163e25da172a9c2b))
## [0.5.2-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.5.1-1.0...v0.5.2-alpha.1) (2024-12-23)

### Features

* **v1-components:** Added UiRadio component ([a29ab06](https://github.com/retailcrm/embed-ui/commit/a29ab061f995cb118d4f534ebdf2034e8235cccb))
## [0.5.1](https://github.com/retailcrm/embed-ui/compare/v0.5.0...v0.5.1) (2024-12-23)

Special release for the features included. Please take a note here that alpha versions' changes were not included.

### Features

* New target definition 'order/card:comment.manager.before' for widgets in 'Client comments' block ([556ce64](https://github.com/retailcrm/embed-ui/commit/556ce64ab7b4405297a537a3b4c14a70a1dbe793))
* **v1-contexts:** Added company.KPP field to order/card context ([c188ccb](https://github.com/retailcrm/embed-ui/commit/c188ccb1544904242fe2e00fa5054f8bbb7068bd))

## [0.5.1-alpha.6](https://github.com/retailcrm/embed-ui/compare/v0.5.1-alpha.5...v0.5.1-alpha.6) (2024-12-20)

### Features

* **v1-components:** Added UiCheckbox component ([87cbaa8](https://github.com/retailcrm/embed-ui/commit/87cbaa8b0381056a342bb1c70e5b2b45121641cb))
## [0.5.1-alpha.5](https://github.com/retailcrm/embed-ui/compare/v0.5.1-alpha.4...v0.5.1-alpha.5) (2024-12-19)

### Features

* **v1-contexts:** Adjusted validator to changed custom fields' kinds ([3f730be](https://github.com/retailcrm/embed-ui/commit/3f730bedae5fd2489f7ffcf7bd3cd43e92d0f9f6))
* **v1-contexts:** Removed before & last filters from custom dictionary query ([9e53e28](https://github.com/retailcrm/embed-ui/commit/9e53e28de6da07dfe3e02c92ec9a717e412b6f1f))
* **v1-types:** Renamed custom field kinds, additional custom fields ([0100148](https://github.com/retailcrm/embed-ui/commit/0100148b435b0e188dffd1fa8b4c7563e6f9af20))
## [0.5.1-alpha.4](https://github.com/retailcrm/embed-ui/compare/v0.5.1-alpha.3...v0.5.1-alpha.4) (2024-12-17)

### Bug Fixes

* Missing useCustomField declaration in index.d.ts ([4babd03](https://github.com/retailcrm/embed-ui/commit/4babd0373e2047288e12dd712cc636a530e25a41))
## [0.5.1-alpha.3](https://github.com/retailcrm/embed-ui/compare/v0.5.1-alpha.2...v0.5.1-alpha.3) (2024-12-16)

### Features

* **v1-types:** All fields except 'choice' were made nullable ([0311cb5](https://github.com/retailcrm/embed-ui/commit/0311cb506c97463279381cae17ea3bf0e18797b7))
## [0.5.1-alpha.2](https://github.com/retailcrm/embed-ui/compare/v0.5.1-alpha.1...v0.5.1-alpha.2) (2024-12-16)

### Bug Fixes

* **v1-contexts:** Missing utilities, renaming according to types changes ([5cdd029](https://github.com/retailcrm/embed-ui/commit/5cdd02923015ff12cf10f15699c517a7896099df))
* **v1-types:** Replacing experimental types ([3ebc4d2](https://github.com/retailcrm/embed-ui/commit/3ebc4d2809b80954ed4e53fcab3cf37624dffc97))
## [0.5.1-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.5.0...v0.5.1-alpha.1) (2024-12-13)

### Features

* Added useCustomField composable ([8290af2](https://github.com/retailcrm/embed-ui/commit/8290af2468308de132c24f17bb1be983b5c96d2e))
* **v1-contexts:** Logic of custom contexts ([b4e3dff](https://github.com/retailcrm/embed-ui/commit/b4e3dff92a9c258237d14e5ad8e25be1f87b9f1b))
* **v1-types:** Added types for custom contexts ([a86c795](https://github.com/retailcrm/embed-ui/commit/a86c795e2bd77c4086705c760277ecc03cfd8072))
## [0.5.0](https://github.com/retailcrm/embed-ui/compare/v0.4.9...v0.5.0) (2024-12-11)

### ⚠ BREAKING CHANGES

* Renaming fields of order/card context

### Features

* Renaming fields of order/card context ([cc8f72f](https://github.com/retailcrm/embed-ui/commit/cc8f72f95ee0481b14562a8ae1937d83459517a2))
## [0.4.9](https://github.com/retailcrm/embed-ui/compare/v0.4.8...v0.4.9) (2024-12-10)

### Features

* **v1-contexts:** Added additional value to contragent.type ([95ad354](https://github.com/retailcrm/embed-ui/commit/95ad3548c9dbd5ab2a6bfbc7fad49d179d1f2c28))
## [0.4.8](https://github.com/retailcrm/embed-ui/compare/v0.4.7...v0.4.8) (2024-12-09)

### Features

* **v1-contexts:** Added fields to order/card context ([1320580](https://github.com/retailcrm/embed-ui/commit/1320580af5b05d7b857211c03a76ea5f685f40e3))
* **v1-contexts:** Types clarification, processing errors in changes handler method 'on' of ContextAccessor, created by createContextAccessor ([111a08c](https://github.com/retailcrm/embed-ui/commit/111a08cd4bd46076b5902f8bf095db43c72c3344))
## [0.4.7](https://github.com/retailcrm/embed-ui/compare/v0.4.6...v0.4.7) (2024-12-08)
## [0.4.6](https://github.com/retailcrm/embed-ui/compare/v0.4.5...v0.4.6) (2024-12-08)

### Bug Fixes

* **v1-context:** Fixed exported ContextStore ts type ([5496f3e](https://github.com/retailcrm/embed-ui/commit/5496f3e353b35dd489d60d51674d5bfcd19b2dfb))
* **v1-contexts:** Moved v1-testing to dev dependencies, where it was intended to be ([88f3d06](https://github.com/retailcrm/embed-ui/commit/88f3d06bd47b9d2e4877be6cb9395f7c5c5a212e))
## [0.4.5](https://github.com/retailcrm/embed-ui/compare/v0.4.4...v0.4.5) (2024-12-06)

### Bug Fixes

* **v1-testing:** Missing exports field in package.json - reason why v0.4.4 is missing in npm ([a7601df](https://github.com/retailcrm/embed-ui/commit/a7601dfad9b27f0ba564c2e4d3dfad9551f3eb3e))
* **v1-types:** Missing exports field in package.json - reason why v0.4.4 is missing in npm ([2dcfd9c](https://github.com/retailcrm/embed-ui/commit/2dcfd9cf8cfb61a4387ce66b70ec89d3639e1d0e))
## [0.4.4](https://github.com/retailcrm/embed-ui/compare/v0.4.3...v0.4.4) (2024-12-06)

### Features

* **v1-contexts:** Reactive contexts logic moved to a separated package ([025c68b](https://github.com/retailcrm/embed-ui/commit/025c68bad92c33fb2ef9c84ea41fc0b76a77b041))
* **v1-testing:** Package for testing utils ([2670e5a](https://github.com/retailcrm/embed-ui/commit/2670e5a2a8d67e4538c0005c271a663aa881ba07))
* **v1-types:** Package for basic types ([a80bf8f](https://github.com/retailcrm/embed-ui/commit/a80bf8f3046ec93cb130e0e247a56d0eae3b4902))

### Bug Fixes

* **v1-components:** Updated @omnicajs/vue-remote to v0.2.3 with fixed logic of TouchEvent serialization ([09d447f](https://github.com/retailcrm/embed-ui/commit/09d447f3f82f554fb3b5bb1ad7eeac7b55abe49e))
## [0.4.3](https://github.com/retailcrm/embed-ui/compare/v0.4.2...v0.4.3) (2024-12-03)
## [0.4.2](https://github.com/retailcrm/embed-ui/compare/v0.4.1...v0.4.2) (2024-12-02)

### Bug Fixes

* Exporting types from scaffolding.d.ts ([504500f](https://github.com/retailcrm/embed-ui/commit/504500f1ed978bf965ef29e6379f5a1031e4f11b))
## [0.4.1](https://github.com/retailcrm/embed-ui/compare/v0.4.1-beta.4...v0.4.1) (2024-11-29)

### Bug Fixes

* **v1-components:** Fallback i18n injection to null ([2c9250f](https://github.com/retailcrm/embed-ui/commit/2c9250fc2e9639404455af0be5fbc00390e586ba))
## [0.4.1-beta.4](https://github.com/retailcrm/embed-ui/compare/v0.4.1-beta.3...v0.4.1-beta.4) (2024-11-29)

### Bug Fixes

* **v1-components:** Missing event in UiYandexMap remote component declaration, replaced CrmYandexMap with UiYandexMap in remote root known components list ([e18c3cf](https://github.com/retailcrm/embed-ui/commit/e18c3cf6deb8768e3982c393be692605e80a35a6))
## [0.4.1-beta.3](https://github.com/retailcrm/embed-ui/compare/v0.4.1-beta.2...v0.4.1-beta.3) (2024-11-29)

### Features

* **v1-components:** Added experimental component - UiYandexMap ([19219dd](https://github.com/retailcrm/embed-ui/commit/19219ddcfb326810554a262d54d0ca88ec4c2a68))
## [0.4.1-beta.2](https://github.com/retailcrm/embed-ui/compare/v0.4.1-beta.1...v0.4.1-beta.2) (2024-11-29)

### Features

* Replaced typeCode / siteCode with type / site in order/card schema ([102124b](https://github.com/retailcrm/embed-ui/commit/102124b2a591f034a89a53976b094979985fc48a))
## [0.4.1-beta.1](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.25...v0.4.1-beta.1) (2024-11-29)

### Features

* Added typeCode / siteCode to order/card schema ([c3c4a27](https://github.com/retailcrm/embed-ui/commit/c3c4a278497aceb179791a5476df08a7666d36fa))

### Bug Fixes

* **v1-components:** Styles of ellipsis modifier of UiLink ([c3b2189](https://github.com/retailcrm/embed-ui/commit/c3b2189712a036bec982360f1e7fcccd75038423))
## [0.4.1-alpha.25](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.24...v0.4.1-alpha.25) (2024-11-28)
## [0.4.1-alpha.24](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.23...v0.4.1-alpha.24) (2024-11-28)
## [0.4.1-alpha.23](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.22...v0.4.1-alpha.23) (2024-11-28)
## [0.4.1-alpha.22](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.21...v0.4.1-alpha.22) (2024-11-28)

### Bug Fixes

* **v1-components:** Added slot 'icon' to remote UiLink definition ([c15bd98](https://github.com/retailcrm/embed-ui/commit/c15bd989d0c1ed08f185b35104e09e678e90dfb6))
## [0.4.1-alpha.21](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.20...v0.4.1-alpha.21) (2024-11-27)

### Bug Fixes

* **v1-components:** Missing VueI18n export ([ed6ef3a](https://github.com/retailcrm/embed-ui/commit/ed6ef3ab50a5879c18b205d24db0c3c9c9da537a))
## [0.4.1-alpha.20](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.19...v0.4.1-alpha.20) (2024-11-27)

### Bug Fixes

* **v1-components:** Missing i18n plugin ([635b839](https://github.com/retailcrm/embed-ui/commit/635b839b0d533e00c04fba00e8293b4793bd0b42))
## [0.4.1-alpha.19](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.18...v0.4.1-alpha.19) (2024-11-27)

### Features

* Added field 'photo' to 'user/current' context ([4d6aece](https://github.com/retailcrm/embed-ui/commit/4d6aece931d23ad74d2afa54fcfc1cc821846ca2))
## [0.4.1-alpha.18](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.17...v0.4.1-alpha.18) (2024-11-27)

### Bug Fixes

* Missing components info for remote root ([ee0cf4a](https://github.com/retailcrm/embed-ui/commit/ee0cf4a33d5f9fe41462f66eb65b1715081cd8c8))
## [0.4.1-alpha.17](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.16...v0.4.1-alpha.17) (2024-11-27)
## [0.4.1-alpha.16](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.15...v0.4.1-alpha.16) (2024-11-27)

### Bug Fixes

* **v1-components:** exports configuration ([4756f47](https://github.com/retailcrm/embed-ui/commit/4756f4723afb79238c4f543bc8ddabebd55411d1))
## [0.4.1-alpha.15](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.14...v0.4.1-alpha.15) (2024-11-26)

### Bug Fixes

* Types across schemas, removed artifacts from unsuccessful rebase ([d34514d](https://github.com/retailcrm/embed-ui/commit/d34514df0e6fcdd9b0e9a1a2e9c909e299138284))
## [0.4.1-alpha.14](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.13...v0.4.1-alpha.14) (2024-11-26)
## [0.4.1-alpha.13](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.12...v0.4.1-alpha.13) (2024-11-26)
## [0.4.1-alpha.12](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.11...v0.4.1-alpha.12) (2024-11-26)
## [0.4.1-alpha.11](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.10...v0.4.1-alpha.11) (2024-11-26)

### Features

* **v1-components:** Added links validator for UiButton and UiLink ([94788df](https://github.com/retailcrm/embed-ui/commit/94788df863f1c25d80ec5ad537fe40b2b10d27ef))
* **v1-components:** Added UiToolbar, UiToolbarButton and UiToolbarLink ([2bba2b5](https://github.com/retailcrm/embed-ui/commit/2bba2b5ba422ced4649f4d634672b3fdf52c8b01))
## [0.4.1-alpha.10](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.9...v0.4.1-alpha.10) (2024-11-26)

### Bug Fixes

* Missing import of ReadonlyField ([5a068ce](https://github.com/retailcrm/embed-ui/commit/5a068cead28bb40ee5c2b66116c4ae615b9661ad))
## [0.4.1-alpha.9](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.8...v0.4.1-alpha.9) (2024-11-26)

### Bug Fixes

* Types declaration in index.d.ts ([2751630](https://github.com/retailcrm/embed-ui/commit/2751630db649592bc4e8f2b8e16aaf86a7971e0f))
* **v1-components:** Missing slot of remote UiModalWindow definition ([2bf97a3](https://github.com/retailcrm/embed-ui/commit/2bf97a33e2eee41090195038733bc89baf72bc3d))
## [0.4.1-alpha.8](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.7...v0.4.1-alpha.8) (2024-11-25)

### Bug Fixes

* Missing contexts in meta.json ([52d3529](https://github.com/retailcrm/embed-ui/commit/52d3529519c43580ef846a98881cec1dbd3265e8))
## [0.4.1-alpha.7](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.6...v0.4.1-alpha.7) (2024-11-25)
## [0.4.1-alpha.6](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.5...v0.4.1-alpha.6) (2024-11-25)
## [0.4.1-alpha.5](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.4...v0.4.1-alpha.5) (2024-11-25)
## [0.4.1-alpha.4](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.3...v0.4.1-alpha.4) (2024-11-25)
## [0.4.1-alpha.3](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.2...v0.4.1-alpha.3) (2024-11-25)
## [0.4.1-alpha.2](https://github.com/retailcrm/embed-ui/compare/v0.4.1-alpha.1...v0.4.1-alpha.2) (2024-11-25)

### Bug Fixes

* **v1-components:** Missing exported files ([9166a30](https://github.com/retailcrm/embed-ui/commit/9166a30ea3fdcca3533d61a0530bcaa8ce850261))
## [0.4.1-alpha.1](https://github.com/retailcrm/embed-ui/compare/v0.4.0...v0.4.1-alpha.1) (2024-11-25)

### Features

* **v1-components:** Added UiButton, UiLink, UiLoader, UiTransition & scaffolding ([9685390](https://github.com/retailcrm/embed-ui/commit/96853906bea7e7e9a69245d0f5ac35b97458c39f))
* **v1-components:** Added UiError, UiScrollBox, UiTag, i18n and documentation for UiButton and UiLink ([e2d2b21](https://github.com/retailcrm/embed-ui/commit/e2d2b219cd8dddc00e4467fdabe3c1558d720008))
* **v1-components:** Added UiModal, UiModalSidebar, UiModalWindow and UiModalWindowSurface ([24d3705](https://github.com/retailcrm/embed-ui/commit/24d3705cb9ec3b33970cf8a6e50743c19f8e631d))
## [0.4.0](https://github.com/retailcrm/embed-ui/compare/v0.3.7...v0.4.0) (2024-11-25)


### ⚠ BREAKING CHANGES

* Удалены поля order.templates.number.api и 
order.templates.number.crm из контекста settings

### Features

* ref [#98287](https://github.com/retailcrm/embed-ui/issues/98287) Completed order/card with data ([23129cc](https://github.com/retailcrm/embed-ui/commit/23129cc47e8f4b84b5f357954b5fa4c4a501ea1b))
* ref [#98287](https://github.com/retailcrm/embed-ui/issues/98287) Контекст с данными о текущем пользователе  ([a6cdb78](https://github.com/retailcrm/embed-ui/commit/a6cdb7872b0650bbda6bdac694cac2c30a4e4c55))

### [0.3.7](https://github.com/retailcrm/embed-ui/compare/v0.3.6...v0.3.7) (2024-11-25)


### Fixes

* Added generation of meta.json to ci ([1b3b776](https://github.com/retailcrm/embed-ui/commit/1b3b77648a4a7cf71264566f71cd1ff81e792f44))

### [0.3.6](https://github.com/retailcrm/embed-ui/compare/v0.3.5...v0.3.6) (2024-11-22)

### 0.3.5 (2024-11-22)


### Fixes

* TypeScript types: Writable, WidgetRunner ([4b0f656](https://github.com/retailcrm/embed-ui/commit/4b0f656cb88494e3a60ca2bc5afced33f75219b7))

### 0.3.4 (2024-11-21)

### [0.3.3](https://github.com/retailcrm/embed-ui/compare/v0.3.2...v0.3.3) (2024-11-20)


### Features

* Добавил блок со списком использований контекстов ([6bdd5d6](https://github.com/retailcrm/embed-ui/commit/6bdd5d65e4516811ae249c128e51f4f302f33589))
* Добавил испанские переводы ([0329323](https://github.com/retailcrm/embed-ui/commit/032932359996693b70fb48ed05040dd66d5015ac))


### Fixes

* Corrections of documentation types ([dc9f297](https://github.com/retailcrm/embed-ui/commit/dc9f297b9f0bae028c25fef9e9480a18953ca15c))
* tsconfig module type ([a0f01c1](https://github.com/retailcrm/embed-ui/commit/a0f01c1bf396b80c2fced1337eb4acb24ac6b90d))

### [0.3.2](https://github.com/retailcrm/embed-ui/compare/v0.3.1...v0.3.2) (2024-11-20)


### Fixes

* Fixed import of SchemaList in index.d.ts ([3da857a](https://github.com/retailcrm/embed-ui/commit/3da857a22767e8a41da3501b9aeae4b551b19e8e))

### [0.3.1](https://github.com/retailcrm/embed-ui/compare/v0.3.0...v0.3.1) (2024-11-19)

## [0.3.0](https://github.com/retailcrm/embed-ui/compare/v0.2.9...v0.3.0) (2024-11-19)


### ⚠ BREAKING CHANGES

* Removed targets order/card:store.after, order/card:dimensions.after

### Features

* Removed targets order/card:store.after, order/card:dimensions.after ([4fe9240](https://github.com/retailcrm/embed-ui/commit/4fe9240ec7bad33cfd9218c11a0616aeb76dbb9b))

### [0.2.9](https://github.com/retailcrm/embed-ui/compare/v0.2.8...v0.2.9) (2024-11-18)


### Features

* Added new targets' definitions for order/card ([6054272](https://github.com/retailcrm/embed-ui/commit/60542721c4380e702fd7353993304ee37a0d3ac8))

### [0.2.8](https://github.com/retailcrm/embed-ui/compare/v0.2.7...v0.2.8) (2024-11-14)


### Features

* 'payload' argument of httpCall methods was made optional ([103b6a4](https://github.com/retailcrm/embed-ui/commit/103b6a4b608a252d6dc27334ae7bffdd8acbb23b))

### [0.2.7](https://github.com/retailcrm/embed-ui/compare/v0.2.6...v0.2.7) (2024-11-13)


### Features

* Added useHost composable for calling host methods & first method httpCall ([72ec875](https://github.com/retailcrm/embed-ui/commit/72ec87502b8a08238c9e1aa8d3016ee0e2705a86))


### Fixes

* Fixed customer/card.phone => customer.card:phone naming ([9356313](https://github.com/retailcrm/embed-ui/commit/9356313b57ae314b65735f83900bb8742dd03c3c))

### [0.2.6](https://github.com/retailcrm/embed-ui/compare/v0.2.5...v0.2.6) (2024-11-11)


### Fixes

* Metadata types for protection from missing fields & generation ([c6541f3](https://github.com/retailcrm/embed-ui/commit/c6541f3cffc8f50a0b1439838e19b4ae08a9a309))

### [0.2.5](https://github.com/retailcrm/embed-ui/compare/v0.2.4...v0.2.5) (2024-11-04)


### Fixes

* dts plugin removed from build configuration ([d5c6991](https://github.com/retailcrm/embed-ui/commit/d5c6991dfbfc2e228b67bbf42410943d0fba7d20))

### [0.2.4](https://github.com/retailcrm/embed-ui/compare/v0.2.3...v0.2.4) (2024-11-04)


### Fixes

* Types declaration of the main entrypoint ([4c50e51](https://github.com/retailcrm/embed-ui/commit/4c50e51c3b71b30c05871f101617440b32cb2a4c))

### [0.2.3](https://github.com/retailcrm/embed-ui/compare/v0.2.2...v0.2.3) (2024-11-04)


### Fixes

* Types declaration generation ([e555013](https://github.com/retailcrm/embed-ui/commit/e5550137889f40ebfa35e27dc13c133d5c28b49e))

### [0.2.2](https://github.com/retailcrm/embed-ui/compare/v0.2.1...v0.2.2) (2024-11-04)


### Fixes

* Missing types field in package.json manifest ([71fe0a5](https://github.com/retailcrm/embed-ui/commit/71fe0a5ea11761a61f076486ea66b2a13b5f302b))

### [0.2.1](https://github.com/retailcrm/embed-ui/compare/v0.2.0...v0.2.1) (2024-11-04)


### Features

* Added CrmYandexMap to known components ([90621b0](https://github.com/retailcrm/embed-ui/commit/90621b079465970b558d783d5e65bb01aef54586))


### Fixes

* ContextAccessor getter return type ([5a98241](https://github.com/retailcrm/embed-ui/commit/5a98241fd230ef0341f4bb8b935d8cf33ae8db11))

## [0.2.0](https://github.com/retailcrm/embed-ui/compare/v0.1.0...v0.2.0) (2024-11-02)


### ⚠ BREAKING CHANGES

* Removed all types from types/endpoint.d.ts, old ones were replaced with types from types/widget.d.ts
* Removed previous pages API, which was replaced with reactive context API

### Features

* Scaffolding logic for widgets, reactive context, json metadata for creating documentation ([9ddd8f8](https://github.com/retailcrm/embed-ui/commit/9ddd8f89759fbeb964556a1401c8f23af6c51467))

## [0.1.0](https://github.com/retailcrm/embed-ui/compare/v0.0.1...v0.1.0) (2024-04-27)


### ⚠ BREAKING CHANGES

* @remote-ui/core types replaced with alternatives from @omnicajs/vue-remote

### Features

* @remote-ui/core types replaced with alternatives from @omnicajs/vue-remote ([c265070](https://github.com/retailcrm/embed-ui/commit/c265070c404cc7fb376234d402f28b030c241e23))

### 0.0.1 (2024-04-26)


### Features

* Added basic types ([6bb2706](https://github.com/retailcrm/embed-ui/commit/6bb27060b3a9eca281865029e1688e44117f03f7))
