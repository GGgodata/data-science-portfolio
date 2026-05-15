import { useMemo, useState } from 'react'
import { Inbox } from 'lucide-react'
import JobCard from '../../components/dashboard/JobCard'
import JobFilters, {
  DEFAULT_FILTERS,
  type JobFiltersState,
} from '../../components/dashboard/JobFilters'
import JobDetailModal from '../../components/dashboard/JobDetailModal'
import { MOCK_AVAILABLE_JOBS, type AvailableJob } from '../../data/mock-jobs'

function filterAndSort(
  jobs: AvailableJob[],
  filters: JobFiltersState
): AvailableJob[] {
  let result = jobs.filter((j) => {
    if (filters.category !== 'all' && j.category !== filters.category) return false
    if (filters.city !== 'all' && j.city !== filters.city) return false
    if (j.hourlyRate < filters.minRate) return false
    if (filters.dateFrom && new Date(j.date) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(j.date) > new Date(filters.dateTo + 'T23:59:59'))
      return false
    return true
  })

  switch (filters.sortBy) {
    case 'newest':
      result = result.sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      )
      break
    case 'closest':
      result = result.sort((a, b) => a.distance - b.distance)
      break
    case 'highest-rate':
      result = result.sort((a, b) => b.hourlyRate - a.hourlyRate)
      break
  }

  return result
}

export default function AvailableJobs() {
  const [filters, setFilters] = useState<JobFiltersState>(DEFAULT_FILTERS)
  const [selectedJob, setSelectedJob] = useState<AvailableJob | null>(null)

  const filteredJobs = useMemo(
    () => filterAndSort(MOCK_AVAILABLE_JOBS, filters),
    [filters]
  )

  const handleApply = (job: AvailableJob) => {
    setSelectedJob(null)
    alert(`ההצעה הוגשה ✓\n\n${job.title}\nלקוחה: ${job.client.name}`)
  }

  return (
    <div>
      <JobFilters
        filters={filters}
        setFilters={setFilters}
        matchCount={filteredJobs.length}
      />

      {filteredJobs.length === 0 ? (
        <div className="bg-cream border border-dashed border-stone/30 rounded-sm py-20 text-center text-stone">
          <Inbox className="mx-auto mb-4 text-stone/60" size={48} strokeWidth={1.4} />
          <p className="text-lg">לא נמצאו הזמנות תואמות</p>
          <p className="text-sm mt-1">נסי להרחיב את הפילטרים</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              onDetails={setSelectedJob}
              onApply={handleApply}
            />
          ))}
        </div>
      )}

      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={handleApply}
      />
    </div>
  )
}
