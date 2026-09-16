export type CareerStop = {
  role: string
  company: string
  period: string
  summary: string
  caseStudySlug?: string
}

// Ordered chronologically from the case studies above. Confirm exact
// start/end dates and add any roles or gaps that are missing.
export const careerStops: CareerStop[] = [
  {
    role: 'Graphic and Product Designer',
    company: 'Sony Mexico',
    period: '2017 to 2018',
    summary: 'Internal communications, campaigns, and intranet design for employees.',
    caseStudySlug: 'sony-internal-communications',
  },
  {
    role: 'Product Designer',
    company: 'Litera',
    period: '2018 to 2019',
    summary: 'Built the first version of the student and tutor experience from zero.',
    caseStudySlug: 'litera-edtech-foundations',
  },
  {
    role: 'Lead Product Designer',
    company: 'Frisa',
    period: '2019',
    summary: 'Design discovery and rebuild of an internal aerospace parts sales system.',
    caseStudySlug: 'frisa-sales-system-modernization',
  },
  {
    role: 'Product Designer',
    company: 'Skooli',
    period: '2019 to 2020',
    summary: 'Closed the feature gap that was costing renewals against competitors.',
    caseStudySlug: 'skooli-classroom-experience',
  },
  {
    role: 'Product Designer',
    company: 'BBVA Mexico',
    period: '2020 to 2021',
    summary: 'Shipped branch appointment scheduling during the COVID-19 pandemic.',
    caseStudySlug: 'bbva-appointment-scheduling',
  },
  {
    role: 'Lead Product Designer',
    company: 'Stori',
    period: '2021 to 2022',
    summary: 'Combined account and credit card application into a single compliant flow.',
    caseStudySlug: 'stori-compliant-application',
  },
  {
    role: 'Lead Product Designer',
    company: 'Stori',
    period: '2022',
    summary: 'Took the Stori Black credit card from zero to a closed beta.',
    caseStudySlug: 'stori-black-card-beta',
  },
  {
    role: 'Design Manager',
    company: 'Ongoing practice',
    period: 'Present',
    summary: 'Leading design teams, building customer feedback loops, and scaling design systems.',
  },
]
