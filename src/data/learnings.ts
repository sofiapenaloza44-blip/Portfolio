export type Learning = {
  title: string
  issuer: string
  status: 'in progress' | 'completed'
  detail: string
}

// Dates from the original site were not legible enough to copy accurately,
// so they are left out here rather than guessed. Confirm these with Sofia
// before publishing.
export const learnings: Learning[] = [
  {
    title: 'Accessibility: How to Design for All',
    issuer: 'Interaction Design Foundation',
    status: 'in progress',
    detail: "Working toward certification now, so it isn't listed as complete yet.",
  },
  {
    title: 'Leadership certification',
    issuer: 'Interaction Design Foundation',
    status: 'completed',
    detail: 'Coursework on leading design teams through ambiguity and cross-functional pressure.',
  },
  {
    title: 'Service Design: Consumer in a Day',
    issuer: 'Interaction Design Foundation',
    status: 'completed',
    detail: 'A workshop-format course on mapping and improving end-to-end service experiences.',
  },
]

export const membership = {
  org: 'Interaction Design Foundation',
  name: 'Sofia Peñaloza',
  memberSince: '2022',
}
