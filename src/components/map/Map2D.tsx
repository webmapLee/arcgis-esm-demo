import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import { defineComponent, onMounted, ref } from 'vue'

const Map2D = defineComponent({
  name: 'Map2D',
  setup() {
    const mapRef = ref<HTMLDivElement>()
    onMounted(() => {
      const map = new Map({
        basemap: 'streets-navigation-vector',
      })
      const mapView = new MapView({
        container: mapRef.value,
        map,
        center: [120.12, 30.16],
        zoom: 12,
      })
      mapView.when(() => {
        const basemapGallery = new BasemapGallery({
          view: mapView,
        })
        mapView.ui.add(basemapGallery, 'top-right')
      })
    })
    return () => {
      return <div ref={mapRef} style="width:100%;height:100%;"></div>
    }
  },
})

export default Map2D
