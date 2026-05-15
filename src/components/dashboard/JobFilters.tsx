import { CATEGORIES } from '../../data/categories'
import { CITIES } from '../../data/cities'

export type JobFiltersState = {
  category: string
  city: string
  minRate: number
  dateFrom: string
  dateTo: string
  sortBy: 'newest' | 'closest' | 'highest-rate'
}

export const DEFAULT_FILTERS: JobFiltersState = {
  category: 'all',
  city: 'all',
  minRate: 50,
  dateFrom: '',
  dateTo: '',
  sortBy: 'newest',
}

type JobFiltersProps = {
  filters: JobFiltersState
  setFilters: (f: JobFiltersState) => void
  matchCount: number
}

const isActive = (f: JobFiltersState): boolean =>
  f.category !== 'all' ||
  f.city !== 'all' ||
  f.minRate > 50 ||
  !!f.dateFrom ||
  !!f.dateTo ||
  f.sortBy !== 'newest'

export default function JobFilters({ filters, setFilters, matchCount }: JobFiltersProps) {
  const update = <K extends keyof JobFiltersState>(key: K, value: JobFiltersState[K]) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="sticky top-16 z-20 bg-cream/95 backdrop-blur-md border-b border-stone/15 -mx-8 lg:-mx-12 px-8 lg:px-12 py-4 mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-stone mb-1">
            קטגוריה
          </label>
          <select
            value={filters.category}
            onChange={(e) => update('category', e.target.value)}
            className="bg-cream border border-stone/30 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-wine"
          >
            <option value="all">הכל</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-stone mb-1">
            עיר
          </label>
          <select
            value={filters.city}
            onChange={(e) => update('city', e.target.value)}
            className="bg-cream border border-stone/30 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-wine"
          >
            <option value="all">הכל</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-stone mb-1">
            מ-תאריך
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => update('dateFrom', e.target.value)}
            className="bg-cream border border-stone/30 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-wine"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-stone mb-1">
            עד-תאריך
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => update('dateTo', e.target.value)}
            className="bg-cream border border-stone/30 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-wine"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-stone mb-1">
            תעריף מינימלי: {filters.minRate}₪
          </label>
          <input
            type="range"
            min={50}
            max={300}
            step={5}
            value={filters.minRate}
            onChange={(e) => update('minRate', Number(e.target.value))}
            className="w-32 accent-wine"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-stone mb-1">
            מיון
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              update('sortBy', e.target.value as JobFiltersState['sortBy'])
            }
            className="bg-cream border border-stone/30 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-wine"
          >
            <option value="newest">החדשות ביותר</option>
            <option value="closest">המקרוב ביותר</option>
            <option value="highest-rate">התעריף הגבוה ביותר</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mr-auto">
          <span className="text-sm text-stone whitespace-nowrap">
            {matchCount} הזמנות תואמות
          </span>
          {isActive(filters) && (
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="text-xs text-wine hover:underline whitespace-nowrap"
            >
              איפוס פילטרים
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
