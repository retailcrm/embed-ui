# Changelog


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
