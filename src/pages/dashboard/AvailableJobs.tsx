import { useMemo, useState } from 'react'
import { Inbox } from 'lucide-react'
import { MOCK_AVAILABLE_JOBS, type AvailableJob } from '../../data/mock-jobs'
import JobCard from '../../components/dashboard/JobCard'
import JobFilters, { DEFAULT_FILTERS, type Filters } from '../../components/dashboard/JobFilters'
import JobDetailModal from '../../components/dashboard/JobDetailModal'

export default function AvailableJobs() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [selectedJob, setSelectedJob] = useState<AvailableJob | null>(null)

  const filteredJobs = useMemo(() => {
    let jobs = MOCK_AVAILABLE_JOBS.filter((j) => {
      if (filters.category !== 'all' && j.category !== filters.category) return false
      if (filters.city !== 'all' && j.city !== filters.city) return false
      if (j.hourlyRate < filters.minRate) return false
      return true
    })
    jobs = [...jobs].sort((a, b) => {
      if (filters.sortBy === 'closest') return a.distance - b.distance
      if (filters.sortBy === 'highest') return b.hourlyRate - a.hourlyRate
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    })
    return jobs
  }, [filters])

  const apply = () => {
    setSelectedJob(null)
    alert('ההצעה הוגשה ✓')
  }

  return (
    <div className="max-w-4xl">
      <JobFilters filters={filters} setFilters={setFilters} count={filteredJobs.length} />

      <div className="mt-6 space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white/40 border border-stone/15 rounded-sm py-16 text-center">
            <Inbox size={48} className="mx-auto text-stone/50 mb-4" strokeWidth={1.5} />
            <p className="text-stone">לא נמצאו הזמנות תואמות. נסי להרחיב את הפילטרים.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDetails={() => setSelectedJob(job)}
              onApply={apply}
            />
          ))
        )}
      </div>

      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onApply={apply} />
    </div>
  )
}
