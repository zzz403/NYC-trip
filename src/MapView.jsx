import { Fragment, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { HOTEL, DAYS } from './data'
import { stopIcon, hotelIcon } from './icons'

const ALL_STOPS = [HOTEL, ...DAYS.flatMap((d) => d.stops)]

// 当筛选变化时，平滑地把视野框到相关点
function Framer({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    const bounds = L.latLngBounds(points)
    map.flyToBounds(bounds, { padding: [70, 70], duration: 0.9, maxZoom: 15 })
  }, [points, map])
  return null
}

// 点击某个站点时，柔和地把它挪到视野中央
function PanTo({ id }) {
  const map = useMap()
  useEffect(() => {
    if (!id) return
    const target = ALL_STOPS.find((s) => s.id === id)
    if (!target) return
    map.panTo(target.coord, { animate: true, duration: 0.6 })
  }, [id, map])
  return null
}


export default function MapView({ visibleDays, activeDay, selectedId, onSelect }) {
  // 每天的路线 = 酒店 → 各站 → 酒店
  const routes = useMemo(
    () =>
      DAYS.map((d) => ({
        ...d,
        line: [HOTEL.coord, ...d.stops.map((s) => s.coord), HOTEL.coord],
      })),
    [],
  )

  const framePoints = useMemo(() => {
    const pts = [HOTEL.coord]
    visibleDays.forEach((d) => d.stops.forEach((s) => pts.push(s.coord)))
    return pts
  }, [visibleDays])

  const isSingle = activeDay != null

  return (
    <MapContainer
      center={[40.74, -73.99]}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom
      className="leaflet-canvas"
    >
      {/* 做旧滤镜只加在瓦片图层上（marker/路线在各自图层，图钉与路线始终鲜亮）。
          纯 filter、无 mix-blend-mode，因此平移不会闪；will-change 提升为 GPU 合成层，缩放流畅。 */}
      <TileLayer
        className="vintage-tiles"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* 路线：先画每条的"纸底描边"，再画彩色虚线 */}
      {routes.map((d) => {
        const shown = activeDay == null || activeDay === d.id
        return (
          <Fragment key={`route-${d.id}`}>
            <Polyline
              positions={d.line}
              pathOptions={{
                color: '#F3E7CC',
                weight: shown ? 9 : 4,
                opacity: shown ? 0.9 : 0.15,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            <Polyline
              positions={d.line}
              pathOptions={{
                color: d.color,
                weight: shown ? 3.5 : 2,
                opacity: shown ? 0.95 : 0.18,
                dashArray: '2 9',
                lineCap: 'round',
              }}
            />
          </Fragment>
        )
      })}

      {/* 站点图钉 */}
      {DAYS.map((d) => {
        const shown = activeDay == null || activeDay === d.id
        return d.stops.map((s, i) => (
          <Marker
            key={s.id}
            position={s.coord}
            zIndexOffset={selectedId === s.id ? 1000 : shown ? 400 : 100}
            icon={stopIcon({
              color: d.color,
              ink: d.ink,
              index: i + 1,
              reservation: s.reservation,
              active: selectedId === s.id,
              dim: !shown,
            })}
            eventHandlers={{ click: () => onSelect(s.id) }}
          />
        ))
      })}

      {/* 酒店星标 */}
      <Marker
        position={HOTEL.coord}
        zIndexOffset={selectedId === 'hotel' ? 1200 : 900}
        icon={hotelIcon()}
        eventHandlers={{ click: () => onSelect('hotel') }}
      />

      <Framer points={isSingle ? framePoints : [HOTEL.coord, ...framePoints]} />
      <PanTo id={selectedId} />
    </MapContainer>
  )
}
