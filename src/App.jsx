import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MapView from './MapView'
import { HOTEL, DAYS, RESERVATION_META, BOOKING_LIST } from './data'

const KIND_ICON = {
  food: '🍜',
  sight: '📸',
  night: '🎷',
  transit: '⛴',
}

export default function App() {
  const [activeDay, setActiveDay] = useState(null) // null = 全部三天
  const [selectedId, setSelectedId] = useState(null)
  const [showBooking, setShowBooking] = useState(false)

  const visibleDays = useMemo(
    () => (activeDay == null ? DAYS : DAYS.filter((d) => d.id === activeDay)),
    [activeDay],
  )

  // 找到当前选中的站点（含酒店）及其所属天
  const selected = useMemo(() => {
    if (!selectedId) return null
    if (selectedId === 'hotel') return { stop: HOTEL, day: null, index: null }
    for (const d of DAYS) {
      const i = d.stops.findIndex((s) => s.id === selectedId)
      if (i >= 0) return { stop: d.stops[i], day: d, index: i + 1 }
    }
    return null
  }, [selectedId])

  const pickDay = (id) => {
    setActiveDay(id)
    setSelectedId(null)
  }

  return (
    <div className="stage">
      <div className="paper-grain" aria-hidden />
      <MapView
        visibleDays={visibleDays}
        activeDay={activeDay}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {/* 报头 */}
      <header className="masthead">
        <div className="masthead__stamp">EST. 2026</div>
        <p className="masthead__kicker">A Three-Day Field Guide to</p>
        <h1 className="masthead__title">New York City</h1>
        <p className="masthead__sub">纽约曼哈顿 · 三天两晚 · 2026.08.01 – 08.03</p>
        <div className="masthead__rule" />
        <p className="masthead__hotel">
          <span className="masthead__star">★</span>
          {HOTEL.nameEn}
          <span className="masthead__hotel-zh"> · {HOTEL.nameZh}</span>
        </p>
      </header>

      {/* 按天筛选 */}
      <nav className="dayfilter" aria-label="按天筛选">
        <button
          className={`chip chip--all ${activeDay == null ? 'is-on' : ''}`}
          onClick={() => pickDay(null)}
        >
          <span className="chip__dot chip__dot--all" />
          全程 · All
        </button>
        {DAYS.map((d) => (
          <button
            key={d.id}
            className={`chip ${activeDay === d.id ? 'is-on' : ''}`}
            style={{ '--c': d.color, '--ink': d.ink }}
            onClick={() => pickDay(activeDay === d.id ? null : d.id)}
          >
            <span className="chip__dot" />
            <span className="chip__label">{d.label}</span>
            <span className="chip__zone">{d.zone}</span>
          </button>
        ))}
        <button
          className={`chip chip--book ${showBooking ? 'is-on' : ''}`}
          onClick={() => setShowBooking((v) => !v)}
        >
          ✦ 预约清单
        </button>
      </nav>

      {/* 详情卡片 */}
      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selectedId}
            className="detail"
            style={selected.day ? { '--c': selected.day.color, '--ink': selected.day.ink } : {}}
            initial={{ opacity: 0, y: 24, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 24, rotate: 0.6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <button className="detail__close" onClick={() => setSelectedId(null)} aria-label="关闭">
              ✕
            </button>

            {selected.day ? (
              <>
                <div className="detail__head">
                  <span className="detail__idx">{String(selected.index).padStart(2, '0')}</span>
                  <div>
                    <span className="detail__day">{selected.day.label} · {selected.day.zone}</span>
                    <span className="detail__time">{selected.stop.time}</span>
                  </div>
                  <span className="detail__kind">{KIND_ICON[selected.stop.kind] || '📍'}</span>
                </div>
                <h2 className="detail__name">{selected.stop.nameZh}</h2>
                <p className="detail__en">{selected.stop.nameEn}</p>
                {selected.stop.reservation && (
                  <span
                    className="detail__badge"
                    style={{ '--tone': RESERVATION_META[selected.stop.reservation].tone }}
                  >
                    {RESERVATION_META[selected.stop.reservation].label}
                  </span>
                )}
                <p className="detail__note">{selected.stop.note}</p>
              </>
            ) : (
              <>
                <div className="detail__head">
                  <span className="detail__idx detail__idx--star">★</span>
                  <div>
                    <span className="detail__day">大本营 · Base Camp</span>
                    <span className="detail__time">起点 / 终点</span>
                  </div>
                </div>
                <h2 className="detail__name">{HOTEL.nameZh}</h2>
                <p className="detail__en">{HOTEL.nameEn}</p>
                <p className="detail__note">{HOTEL.addr}</p>
                <p className="detail__note">{HOTEL.note}</p>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 预约清单抽屉 */}
      <AnimatePresence>
        {showBooking && (
          <motion.aside
            className="booking"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button className="detail__close" onClick={() => setShowBooking(false)} aria-label="关闭">
              ✕
            </button>
            <h3 className="booking__title">✦ 需提前预约</h3>
            <p className="booking__sub">按紧急程度排序</p>
            <ol className="booking__list">
              {BOOKING_LIST.map((b, i) => {
                const day = DAYS.find((d) => d.id === b.day)
                return (
                  <li key={i} className="booking__item" style={{ '--c': day.color }}>
                    <span className="booking__num">{i + 1}</span>
                    <div>
                      <p className="booking__t">{b.t}</p>
                      <p className="booking__d">{b.d}</p>
                    </div>
                    <span className="booking__day">{day.label}</span>
                  </li>
                )
              })}
            </ol>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 底部横向站点卡片（手机端方便点按） */}
      <footer className="filmstrip">
        <div className="filmstrip__track">
          {visibleDays.map((d) => (
            <div className="filmstrip__group" key={d.id} style={{ '--c': d.color, '--ink': d.ink }}>
              <div className="filmstrip__tab">
                <span className="filmstrip__tab-dot" />
                <span className="filmstrip__tab-day">{d.label}</span>
                <span className="filmstrip__tab-zone">{d.zone} · {d.date}</span>
              </div>
              {d.flight && (
                <div className="ticket">
                  <span className="ticket__dir">✈ {d.flight.dir}</span>
                  <span className="ticket__txt">{d.flight.text}</span>
                </div>
              )}
              {d.stops.map((s, i) => {
                const rm = s.reservation ? RESERVATION_META[s.reservation] : null
                return (
                  <button
                    key={s.id}
                    className={`stopcard ${selectedId === s.id ? 'is-sel' : ''} ${
                      s.reservation === 'required' ? 'stopcard--must' : ''
                    }`}
                    onClick={() => setSelectedId(s.id)}
                  >
                    <div className="stopcard__top">
                      <span className="stopcard__num">{i + 1}</span>
                      <span className="stopcard__time">{s.time}</span>
                      <span className="stopcard__kind">{KIND_ICON[s.kind] || '📍'}</span>
                    </div>
                    <p className="stopcard__zh">{s.nameZh}</p>
                    <p className="stopcard__en">{s.nameEn}</p>
                    {rm && (
                      <span className="stopcard__tag" style={{ '--tone': rm.tone }}>
                        {rm.short}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
