<template>
    <div class="ui-v1-yandex-map">
        <UiLoader v-if="!ready" />

        <iframe
            v-show="ready"
            ref="iframe"
            :key="apiUrlVersion"
            @load="loadApi"
        />
    </div>
</template>

<script lang="ts" setup>
import type {
  LngLat,
  YMapCenterLocation,
  YMapDefaultFeaturesLayerProps,
  YMapLocationRequest,
} from '@yandex/ymaps3-types'

import UiLoader from '@/host/components/loader/UiLoader.vue'

import {
  computed,
  inject,
  ref,
  watch,
} from 'vue'

import { load as loadScript } from './loadScript'

import { I18nInjectKey } from '@/host/i18n/plugin'

type YMapNamespace = typeof ymaps3

const props = defineProps({
  apiKey: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: '',
  },
})

const emit = defineEmits([
  'change',
  'update:address',
])

const i18nBus = inject(I18nInjectKey, null)

const iframe = ref<HTMLIFrameElement | null>(null)

const getIFrameDocument = () => iframe.value?.contentDocument ?? null
const getIFrameWindow = () => iframe.value?.contentWindow ?? null

const getIFrameYMaps = (): YMapNamespace | null => {
  const iframeWindow = getIFrameWindow()
  if (iframeWindow && 'ymaps3' in iframeWindow) {
    return iframeWindow['ymaps3'] as YMapNamespace
  }

  return null
}

const LOCATION: YMapLocationRequest = {
  center: [37.64, 55.76],
  zoom: 10,
}

const waitIFrameContentLoaded = (retry = 5) => {
  if (iframe.value?.contentDocument) {
    return Promise.resolve()
  }

  if (retry <= 1) {
    throw new Error('iframe contentDocument wasn\'t loaded')
  }

  return new Promise(resolve => setTimeout(async () => {
    await waitIFrameContentLoaded(retry--)
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

const loadApi = async () => {
  await waitIFrameContentLoaded()

  const iframeDocument = getIFrameDocument()
  if (iframeDocument) {
    const style = iframeDocument.createElement('style')

    style.innerHTML = 'body { margin: 0; }'

    iframeDocument.head.appendChild(style)

    await loadScript(iframeDocument, apiUrl.value)
    await getIFrameYMaps()?.ready

    const el = iframeDocument.createElement('div')

    el.setAttribute('id', 'map')

    iframeDocument.body.appendChild(el)

    ready.value = true

    const _ymaps3 = getIFrameYMaps() as YMapNamespace

    const {
      YMap,
      YMapControls,
      YMapDefaultFeaturesLayer,
      YMapDefaultSchemeLayer,
    } = _ymaps3

    const { YMapZoomControl, YMapGeolocationControl } = await _ymaps3.import('@yandex/ymaps3-controls@0.0.1')
    const { YMapDefaultMarker } = await _ymaps3.import('@yandex/ymaps3-markers@0.0.1')

    if (props.address) {
      const pos = await fetchCoordinatesFromAddress(props.address)

      if (pos) {
        LOCATION.center = pos.split(' ').map((c: string) => Number(c)) as [number, number]
      }
    }

    const map = new YMap(el, { location: LOCATION })

    map.addChild(new YMapDefaultSchemeLayer({}))
    map.addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})))
    map.addChild(new YMapDefaultFeaturesLayer({ id: 'features' } as YMapDefaultFeaturesLayerProps))
    map.addChild(new YMapControls({ position: 'left' }).addChild(new YMapGeolocationControl({})))

    const onDragMoveHandler = (coordinates: LngLat) => {
      const longitude = `Longitude: ${coordinates[0].toFixed(2)}`
      const latitude = `Latitude: ${coordinates[1].toFixed(2)}`
      draggableMarker.update({ coordinates, title: `${longitude} <br> ${latitude}` })
    }

    const draggableMarker = new YMapDefaultMarker({
      coordinates: (LOCATION as YMapCenterLocation).center,
      draggable: true,
      title: `Longitude: ${(LOCATION as YMapCenterLocation).center[0].toFixed(2)} <br>
              Latitude ${(LOCATION as YMapCenterLocation).center[1].toFixed(2)}`,
      onDragMove: onDragMoveHandler,
      onDragEnd: onDragEndHandler,
    })

    map.addChild(draggableMarker)
  }
}

watch(apiUrl, async (newUrl, oldUrl) => {
  if (iframe.value && newUrl !== oldUrl) {
    ready.value = false
    apiUrlVersion.value++
  }
})
</script>

<style lang="less" src="./yandex-map.less" />
