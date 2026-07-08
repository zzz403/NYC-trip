import L from 'leaflet'

// 修复 Leaflet 默认图标在打包环境下丢失的问题（我们全用自定义图标，这里做兜底）
delete L.Icon.Default.prototype._getIconUrl

// 站点图钉：按天配色 + 序号，需预约的加一枚"蜡封"徽记
export function stopIcon({ color, ink, index, reservation, active, dim }) {
  const stamp =
    reservation === 'required'
      ? `<span class="pin-stamp" title="需预约">✦</span>`
      : reservation === 'suggested'
        ? `<span class="pin-stamp pin-stamp--soft" title="建议预约">✦</span>`
        : ''
  return L.divIcon({
    className: 'pin-wrap',
    html: `
      <div class="pin ${active ? 'pin--active' : ''} ${dim ? 'pin--dim' : ''}"
           style="--pin:${color};--pin-ink:${ink}">
        <span class="pin-body">
          <span class="pin-num">${index}</span>
        </span>
        <span class="pin-tip"></span>
        ${stamp}
      </div>`,
    iconSize: [40, 50],
    iconAnchor: [20, 46],
    popupAnchor: [0, -44],
  })
}

// 酒店：起点/终点的星标
export function hotelIcon() {
  return L.divIcon({
    className: 'pin-wrap',
    html: `
      <div class="hotel-pin">
        <span class="hotel-star">★</span>
        <span class="hotel-ring"></span>
      </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  })
}
