import { defineComponent } from 'vue'
import Map2D from './components/map/Map2D'

const App = defineComponent({
  name: 'MapApp',
  setup() {
    return () => {
      return (
        <>
          <Map2D></Map2D>
        </>
      )
    }
  },
})

export default App
