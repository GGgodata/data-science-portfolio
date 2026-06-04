import { CATEGORIES, CITIES } from '../../data/categories'

export type Filters = {
  category: string
  city: string
  minRate: number
  sortBy: 'newest' | 'closest' | 'highest'
}

export const DEFAULT_FILTERS: Filters = {
  category: 'all',
  city: 'all',
  minRate: 50,
  sortBy: 'newest',
}

const CATEGORY_NAMES = CATEGORIES.map((c) => c.name)

const selectClass =
  'bg-cream border border-stone/30 rounded-sm px-3 py-2 text-sm text-ink focus:border-wine outline-none'

export default function JobFilters({
  filters,
  setFilters,
  count,
}: {
  filters: Filters
  setFilters: (f: Filters) => void
  count: number
}) {
  const active =
    filters.category !== 'all' ||
    filters.city !== 'all' ||
    filters.minRate !== 50 ||
    filters.sortBy !== 'newest'

  return (
    <div className="sticky top-16 z-10 bg-cream/90 backdrop-blur border-b border-stone/15 py-4 -mx-6 md:-mx-8 px-6 md:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={selectClass}
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">כל הקטגוריות</option>
          {CATEGORY_NAMES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="all">כל הערים</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-sm text-stone">
          <span>תעריף מ-{filters.minRate}₪</span>
          <input
            type="range"
            min={50}
            max={300}
            step={5}
            value={filters.minRate}
            onChange={(e) => setFilters({ ...filters, minRate: Number(e.target.value) })}
            className="w-32"
          />
        </div>

        <select
          className={selectClass}
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({ ...filters, sortBy: e.target.value as Filters['sortBy'] })
          }
        >
          <option value="newest">החדשות ביותר</option>
          <option value="closest">הקרובות ביותר</option>
          <option value="highest">התעריף הגבוה ביותר</option>
        </select>

        <span className="text-sm text-stone mr-auto">{count} הזמנות תואמות</span>

        {active && (
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="text-sm text-wine hover:underline"
          >
            איפוס פילטרים
          </button>
        )}
      </div>
    </div>
  )
}
