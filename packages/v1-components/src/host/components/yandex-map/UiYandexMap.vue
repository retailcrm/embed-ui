<template>
    <div class="ui-v1-yandex-map">
        <UiLoader
            v-if="!ready"
            :transition="null"
        />

        <iframe
            ref="iframe"
            :key="apiUrlVersion"
            allow="geolocation"
            @load="loadApi"
        />

        <div
            v-if="ready"
            class="ui-v1-yandex-map__control-group ui-v1-yandex-map__control-group_left"
        >
            <UiButton
                class="ui-v1-yandex-map__control-button"
                appearance="secondary"
                size="sm"
                type="button"
                aria-label="Определить текущее местоположение"
                :disabled="locating || !canLocateCurrentPosition"
                @click="locateCurrentPosition"
            >
                <IconNavigate />
            </UiButton>
        </div>

        <div
            v-if="ready"
            class="ui-v1-yandex-map__control-group ui-v1-yandex-map__control-group_right"
        >
            <UiButton
                class="ui-v1-yandex-map__control-button"
                appearance="secondary"
                size="sm"
                type="button"
                aria-label="Уменьшить масштаб"
                @click="zoomOut"
            >
                <IconRemove />
            </UiButton>

            <UiButton
                class="ui-v1-yandex-map__control-button"
                appearance="secondary"
                size="sm"
                type="button"
                aria-label="Увеличить масштаб"
                @click="zoomIn"
            >
                <IconAdd />
            </UiButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { LngLat } from '@yandex/ymaps3-types'
import type {
  YandexMapLocatorPlugin,
  YandexMapPlugin,
} from '@/common/components/yandex-map'
import type {
  YMapCenterZoomLocation,
  YMapDefaultFeaturesLayerProps,
  YMapLocationRequest,
} from '@yandex/ymaps3-types'

import {
  computed,
  inject,
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
} from 'vue'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconNavigate from '~assets/sprites/map-and-places/navigate.svg'
import IconRemove from '~assets/sprites/actions/remove.svg'
import UiButton from '@/host/components/button/UiButton.vue'
import UiLoader from '@/host/components/loader/UiLoader.vue'

import { I18nInjectKey } from '@/host/i18n/plugin'
import { YANDEX_MAP_PLUGIN } from '@/common/components/yandex-map'

import { load as loadScript } from './loadScript'

type YMapNamespace = typeof ymaps3
type YMapRuntime = InstanceType<YMapNamespace['YMap']>
type YMapLocationState = YMapCenterZoomLocation
type YMapMarkerEntity = InstanceType<YMapNamespace['YMapMarker']>
type YMapMarkerRuntime = {
  entity: YMapMarkerEntity,
  update: (props: {
    coordinates: LngLat,
    title?: string
  }) => void
}

const PLAIN_OBJECT_PROTOTYPES = [Object.prototype, null]
const MAP_IFRAME_STYLE = `
  html, body, #map {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .ui-v1-yandex-map-marker {
    position: relative;
    transform: translate(-10px, -76px);
    width: 0;
    height: 0;
    cursor: grab;
    user-select: none;
  }

  .ui-v1-yandex-map-marker:active {
    cursor: grabbing;
  }

  .ui-v1-yandex-map-marker__pin {
    position: absolute;
    left: 0;
    top: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #ff5547;
    box-shadow: 0 12px 24px rgba(255, 85, 71, 0.28);
  }

  .ui-v1-yandex-map-marker__pin::before {
    content: '';
    position: absolute;
    left: 16px;
    bottom: -13px;
    width: 12px;
    height: 16px;
    background: #ff5547;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  }

  .ui-v1-yandex-map-marker__pin::after {
    content: '';
    position: absolute;
    left: 14px;
    bottom: -26px;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    background: #ff5547;
    box-sizing: border-box;
  }

  .ui-v1-yandex-map-marker__hint {
    position: absolute;
    left: 56px;
    top: 4px;
    min-width: 152px;
    padding: 7px 12px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 8px 24px rgba(36, 48, 77, 0.16);
    color: #24304d;
    font: 400 14px/20px Arial, sans-serif;
    white-space: nowrap;
  }
`

const props = defineProps({
  apiKey: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: '',
  },

  plugins: {
    type: Array as () => YandexMapPlugin[],
    default: () => [],
  },
})

const emit = defineEmits([
  'change',
  'update:address',
])

const i18nBus = inject(I18nInjectKey, null)

const LOCATION: YMapLocationState = {
  center: [37.64, 55.76],
  zoom: 10,
}

const iframe = ref<HTMLIFrameElement | null>(null)
const map = shallowRef<YMapRuntime | null>(null)
const marker = shallowRef<YMapMarkerRuntime | null>(null)
const mapLocation = ref<YMapLocationState>({
  center: [...LOCATION.center],
  zoom: LOCATION.zoom,
})
const activeLoadToken = ref(0)
const locating = ref(false)

const getIFrameDocument = () => iframe.value?.contentDocument ?? null
const getIFrameWindow = () => iframe.value?.contentWindow ?? null

const getIFrameYMaps = (): YMapNamespace | null => {
  const iframeWindow = getIFrameWindow()
  if (iframeWindow && 'ymaps3' in iframeWindow) {
    return iframeWindow['ymaps3'] as YMapNamespace
  }

  return null
}
const waitIFrameContentLoaded = (retry = 5) => {
  if (iframe.value?.contentDocument) {
    return Promise.resolve()
  }

  if (retry <= 1) {
    throw new Error('iframe contentDocument wasn\'t loaded')
  }

  return new Promise(resolve => setTimeout(async () => {
    await waitIFrameContentLoaded(retry - 1)
    resolve(0)
  }, 100))
}

const ready = ref(false)

const apiLocale = computed(() => ({
  'en-GB': 'en_US',
  'es-ES': 'en_US',
  'ru-RU': 'ru_RU',
}[i18nBus?.locale ?? 'en-GB']))

const apiUrl = computed(() => `https://api-maps.yandex.ru/v3/?apikey=${props.apiKey}&lang=${apiLocale.value}`)
const apiUrlVersion = ref(0)

const getGeocodeApiUrl = (geocode: string) => `https://geocode-maps.yandex.ru/1.x/?apikey=${props.apiKey}&geocode=${geocode}&lang=${apiLocale.value}&format=json`

const createLoadToken = () => {
  activeLoadToken.value++
  return activeLoadToken.value
}

const isCurrentLoadToken = (token: number) => activeLoadToken.value === token

const disposeMapRuntime = () => {
  map.value?.destroy()
  map.value = null
  marker.value = null
  mapLocation.value = {
    center: [...LOCATION.center],
    zoom: LOCATION.zoom,
  }
}

const cancelMapRuntime = () => {
  activeLoadToken.value++
  disposeMapRuntime()
}

const updateMapLocation = (location: Partial<YMapLocationState>) => {
  const nextLocation: YMapLocationState = {
    center: location.center ? [...location.center] as YMapLocationState['center'] : mapLocation.value.center,
    zoom: typeof location.zoom === 'number' ? location.zoom : mapLocation.value.zoom,
  }

  mapLocation.value = nextLocation

  map.value?.setLocation({
    ...nextLocation,
    duration: 200,
    easing: 'ease-in-out',
  } satisfies YMapLocationRequest)
}

const zoomIn = () => {
  updateMapLocation({ zoom: mapLocation.value.zoom + 1 })
}

const zoomOut = () => {
  updateMapLocation({ zoom: mapLocation.value.zoom - 1 })
}

const getMarkerDetails = (coordinates: LngLat) => ({
  longitude: `Longitude: ${coordinates[0].toFixed(2)}`,
  latitude: `Latitude: ${coordinates[1].toFixed(2)}`,
})

const updateMarker = (coordinates: LngLat) => {
  const details = getMarkerDetails(coordinates)

  marker.value?.update({
    coordinates,
    title: `${details.longitude}\n${details.latitude}`,
  })
}

const getCurrentCoordinates = () => new Promise<LngLat>((resolve, reject) => {
  if (!('geolocation' in navigator)) {
    reject(new Error('Geolocation is unavailable'))
    return
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve([coords.longitude, coords.latitude]),
    reject,
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  )
})

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  return PLAIN_OBJECT_PROTOTYPES.includes(Object.getPrototypeOf(value))
}

const locatorPlugin = computed<YandexMapLocatorPlugin | null>(() => props.plugins.find((plugin): plugin is YandexMapLocatorPlugin => (
  isPlainObject(plugin)
  && plugin.type === YANDEX_MAP_PLUGIN.LOCATOR
  && typeof plugin.url === 'string'
  && plugin.url.length > 0
)) ?? null)

const canUseBrowserGeolocation = computed(() => 'geolocation' in navigator && isSecureContext)
const canUseLocatorFallback = computed(() => locatorPlugin.value !== null)
const canLocateCurrentPosition = computed(() => canUseBrowserGeolocation.value || canUseLocatorFallback.value)

const fetchLocatorFallbackCoordinates = async (reason: string, error: unknown = null): Promise<LngLat> => {
  if (!locatorPlugin.value) {
    throw new Error('Locator plugin is not configured')
  }

  const response = await fetch(locatorPlugin.value.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locale: apiLocale.value,
      reason,
      secureContext: isSecureContext,
      browserGeolocationAvailable: 'geolocation' in navigator,
      error: error instanceof Error ? error.message : null,
    }),
  })

  if (!response.ok) {
    throw new Error(`Locator adapter request failed with status ${response.status}`)
  }

  const result = await response.json() as {
    coordinates?: [number, number] | null,
  }

  if (!Array.isArray(result.coordinates) || result.coordinates.length !== 2) {
    throw new Error('Locator adapter returned invalid coordinates payload')
  }

  return [Number(result.coordinates[0]), Number(result.coordinates[1])]
}

const locateCurrentPosition = async () => {
  locating.value = true

  try {
    const coordinates = canUseBrowserGeolocation.value
      ? await getCurrentCoordinates()
      : await fetchLocatorFallbackCoordinates('browser_geolocation_unavailable')

    updateMarker(coordinates)
    updateMapLocation({
      center: coordinates,
      zoom: Math.max(mapLocation.value.zoom, 15),
    })

    const address = await fetchAddressFromCoordinates(coordinates)

    emit('change', address)
    emit('update:address', address)
  } catch (error) {
    if (canUseLocatorFallback.value && canUseBrowserGeolocation.value) {
      try {
        const coordinates = await fetchLocatorFallbackCoordinates('browser_geolocation_failed', error)

        updateMarker(coordinates)
        updateMapLocation({
          center: coordinates,
          zoom: Math.max(mapLocation.value.zoom, 15),
        })

        const address = await fetchAddressFromCoordinates(coordinates)

        emit('change', address)
        emit('update:address', address)
        return
      } catch (fallbackError) {
        console.error('Failed to get current location via locator fallback', fallbackError)
      }
    }

    console.error('Failed to get current location', error)
  } finally {
    locating.value = false
  }
}

function onDragEndHandler(coordinates: LngLat) {
  fetchAddressFromCoordinates(coordinates).then(address => {
    emit('change', address)
    emit('update:address', address)
  })
}

const fetchAddressFromCoordinates = async (coordinates: LngLat): Promise<string> => {
  const response = await fetch(getGeocodeApiUrl(coordinates.toString()))
  const result = await response.json()
  return result.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted ?? ''
}

const fetchCoordinatesFromAddress = async (address: string): Promise<string> => {
  const response = await fetch(getGeocodeApiUrl(address))
  const result = await response.json()
  return result.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point.pos ?? ''
}

const createMarkerRuntime = (
  _ymaps3: YMapNamespace,
  iframeDocument: Document,
  coordinates: LngLat,
  onDragMove: (coordinates: LngLat) => void,
  onDragEnd: (coordinates: LngLat) => void
): YMapMarkerRuntime => {
  const { YMapMarker } = _ymaps3

  const markerElement = iframeDocument.createElement('div')
  markerElement.className = 'ui-v1-yandex-map-marker'

  const pinElement = iframeDocument.createElement('div')
  pinElement.className = 'ui-v1-yandex-map-marker__pin'

  const hintElement = iframeDocument.createElement('div')
  hintElement.className = 'ui-v1-yandex-map-marker__hint'

  const longitudeElement = iframeDocument.createElement('div')
  const latitudeElement = iframeDocument.createElement('div')

  hintElement.append(longitudeElement, latitudeElement)
  markerElement.append(pinElement, hintElement)

  const markerRuntime = new YMapMarker({
    coordinates,
    draggable: true,
    mapFollowsOnDrag: true,
    zIndex: 2500,
    onDragMove,
    onDragEnd,
  }, markerElement)

  const update = ({ coordinates: nextCoordinates }: { coordinates: LngLat }) => {
    const details = getMarkerDetails(nextCoordinates)

    longitudeElement.textContent = details.longitude
    latitudeElement.textContent = details.latitude

    markerRuntime.update({
      coordinates: nextCoordinates,
    })
  }

  update({ coordinates })

  return {
    entity: markerRuntime,
    update,
  }
}

const loadApi = async () => {
  ready.value = false

  const loadToken = createLoadToken()

  disposeMapRuntime()

  await waitIFrameContentLoaded()

  if (!isCurrentLoadToken(loadToken)) {
    return
  }

  const iframeDocument = getIFrameDocument()
  if (iframeDocument) {
    const style = iframeDocument.createElement('style')

    style.innerHTML = MAP_IFRAME_STYLE

    iframeDocument.head.appendChild(style)

    await loadScript(iframeDocument, apiUrl.value)

    if (!isCurrentLoadToken(loadToken)) return

    await getIFrameYMaps()?.ready

    if (!isCurrentLoadToken(loadToken)) return

    const _ymaps3 = getIFrameYMaps() as YMapNamespace

    const {
      YMap,
      YMapDefaultFeaturesLayer,
      YMapDefaultSchemeLayer,
    } = _ymaps3

    if (props.address) {
      const pos = await fetchCoordinatesFromAddress(props.address)

      if (!isCurrentLoadToken(loadToken)) {
        return
      }

      if (pos) {
        LOCATION.center = pos.split(' ').map((c: string) => Number(c)) as [number, number]
      }
    }

    const el = iframeDocument.createElement('div')

    el.setAttribute('id', 'map')

    iframeDocument.body.appendChild(el)

    const onDragMoveHandler = (coordinates: LngLat) => {
      updateMarker(coordinates)
    }

    const markerRuntime = createMarkerRuntime(
      _ymaps3,
      iframeDocument,
      LOCATION.center,
      onDragMoveHandler,
      onDragEndHandler
    )
    marker.value = markerRuntime

    mapLocation.value = {
      center: [...LOCATION.center],
      zoom: LOCATION.zoom,
    }

    map.value = new YMap(el, { location: LOCATION }, [
      new YMapDefaultSchemeLayer({}),
      new YMapDefaultFeaturesLayer({ id: 'features' } as YMapDefaultFeaturesLayerProps),
      markerRuntime.entity,
    ])

    if (!isCurrentLoadToken(loadToken)) {
      map.value?.destroy()
      map.value = null
      return
    }

    ready.value = true
  }
}

watch(apiUrl, async (newUrl, oldUrl) => {
  if (iframe.value && newUrl !== oldUrl) {
    cancelMapRuntime()
    ready.value = false
    apiUrlVersion.value++
  }
})

onBeforeUnmount(() => {
  cancelMapRuntime()
})
</script>

<style lang="less" src="./yandex-map.less" />
