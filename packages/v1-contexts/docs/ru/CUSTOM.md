# Пользовательский контекст

В JS API существует специальный тип реактивного контекста, который используется для взаимодействия с пользовательскими
полями, определенными в CRM.

Для контекста этого типа существует лишь обобщенное определение, в котором наименования полей и их типы не фиксированы,
фиксирован лишь список возможных типов полей и как с ними можно взаимодействовать.

> [!NOTE]
> На данный момент доступен контекст для сущности `order` в целях встраивания `order/card:*`.

## Схема контекста

Схема контекста служит описанием того, как строить начальное состояние контекста на стороне расширения.
Схема включает:

* Символьный код контекста
* Массив описаний полей, каждое из которых содержит:
  * Тип поля
  * Символьный код поля
  * Флаг доступности только для чтения
  * Начальное значение
  Также описание поля может включать дополнительные сведения, такие как символьный код словаря возможных значений

Определение схемы контекста можно обнаружить здесь (`CustomContextSchema`):
[https://github.com/retailcrm/embed-ui/packages/v1-types/context.d.ts#L169-L169](https://github.com/retailcrm/embed-ui/blob/82477ce0a9124e598d3a84db3739c850509c0fcc/packages/v1-types/context.d.ts#L169-L169)

## Хранилище и работа контекста

Для взаимодействия с контекстом на стороне расширения используются хранилища `Pinia`, опирающиеся на определения,
получаемые по запросу со стороны CRM.

В начальном состоянии хранилище контекста содержит только символьный код для идентификации при общении расширения с CRM.
На этой фазе значения полей и их состав не определен. Для того чтобы произвести заполнение хранилища, нужно произвести
инициализацию, при которой расширение посылает CRM postMessage событие с запросом на получение схемы.
Если символьный код корректный и требуемый контекст на странице существует, то CRM отдаст схему контекста, на основе
которой хранилище сформирует реактивные данные и подпишется на события об изменениях, присылаемых CRM.
После чего можно приступать к взаимодействию.

```typescript
/** Импорт composable-утилиты для получения пользовательского контекста. */
import { useContext } from '@retailcrm/embed-ui-v1-contexts/remote/custom'

/** Импорт composable-утилиты для получения вычисляемого поля для пользовательского контекста. */
import { useCustomField } from '@retailcrm/embed-ui'

/**
 * Для получения контекста нужно указать его символьный код. useContext возвращает pinia хранилище
 */
const custom = useContext('order')

/**
 * Метод возвращает `Promise<CustomContextSchema>`
 *
 * Также схему после инициализации можно получить из хранилища: `custom.schema`
 *
 * В метод можно передать в качестве аргумента метод с сигнатурой `(rejection: Rejection) => void` для обработки ошибки,
 * которую может сгенерировать CRM, если указанный контекст не существует.
 * Определение для `Rejection` можно найти здесь:
 * https://github.com/retailcrm/embed-ui/blob/82477ce0a9124e598d3a84db3739c850509c0fcc/packages/v1-types/context.d.ts#L101-L101
 */
custom.initialize()

/**
 * Вычисляемое поле на основе пользовательского контекста.
 * В useCustomField указываем сначала контекст, затем код поля в контексте.
 * Если код не существует (или контекст еще не инициализирован), значение в поле будет равно `null`
 * Если не указывать третьим параметром опции, то утилита вернет WritableComputedRef. Но это не значит, что setter будет
 * гарантированного работать. Если в настройках поля, пришедших из CRM указан флаг `readonly` равный true, то код
 * будет вызывать ошибку. Также ошибка будет появляться при попытки записи, если контекст еще не проинициализирован.
 */
const someField = useCustomField(custom, 'code')

/**
 * Можно указать, какой тип для конкретного поля ожидается, чтобы дальше TypeScript
 * корректно подсвечивал его. Также можно указать дополнительные опции:
 * `readonly` - логический флаг, который укажет, что поле только для чтения; если этот флаг указан как `true`,
 *   вместо WritableComputedRef будет возвращен ComputedRef
 * `onReject` - обработчик отклонения попытки записи в поле на стороне CRM
 *
 * Список доступных значений для параметра kind можно найти здесь:
 * https://github.com/retailcrm/embed-ui/blob/82477ce0a9124e598d3a84db3739c850509c0fcc/packages/v1-types/context.d.ts#L153-L153
 *
 * Если тип поля не совпадает с указанным в присланной CRM схеме, то значение поля всегда будет null
 */
const viewedAt = useCustomField(custom, 'viewedAt', { kind: 'date' })
```

## Работа со словарями

Для полей `dictionary` и `multiselect_dictionary` можно загрузить список значений, используя утилиту
`useDictionary`, которая предоставляет клиент для осуществления запросов списков значений к CRM.

Ниже представлен пример:

```typescript
import type { CustomDictionary } from '@retailcrm/embed-ui-v1-types/context'

import { useContext } from '@retailcrm/embed-ui-v1-contexts/remote/custom'
import { useCustomField } from '@retailcrm/embed-ui'
import { useDictionary } from '@retailcrm/embed-ui-v1-contexts/remote/custom'

const custom = useContext('order')

const dictionary = useDictionary()
const options = ref<CustomDictionary>([])
const loaded = ref(false)

custom.initialize().then(schema => {
  const descriptor = schema?.fields.find(f => f.code === 'accessory')
  if (descriptor && 'dictionaryCode' in descriptor) {
    dictionary.query(descriptor.dictionaryCode).then((result) => {
      options.value = result
      loaded.value = true
    })
  } else {
    throw new Error('No dictionary for field with code ' + props.code)
  }
})

const accessory = useCustomField(custom, 'accessory', { kind: 'dictionary' })
```