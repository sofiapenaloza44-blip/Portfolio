export type CaseStudy = {
  slug: string
  company: string | null
  title: string
  summary: string
  role: string
  timeline: string
  overview: string
  challenge: string
  process: string[]
  outcome: string
  gallerySeeds: string[]
}

export type IndustryGroup = {
  slug: string
  name: string
  icon: 'bank' | 'graduationCap' | 'usersThree' | 'rocket' | 'cpu'
  caseStudies: CaseStudy[]
}

// NOTE: the paragraphs under "overview" are Sofia's own words from her
// existing portfolio. Everything under "challenge", "process", and
// "outcome" is DEMO content, drafted to show how a full case study page
// reads. Replace it with real specifics once the Figma files are shared.

export const industries: IndustryGroup[] = [
  {
    slug: 'finance',
    name: 'Finance industry',
    icon: 'bank',
    caseStudies: [
      {
        slug: 'stori-compliant-application',
        company: 'Stori',
        title: 'Compliant multi-product application process',
        summary:
          'Redesigning account opening so every applicant could get a debit account and credit card in one flow.',
        role: 'Lead Product Designer',
        timeline: '2021 to 2022',
        overview:
          "Stori is a fast-growing Mexican fintech unicorn whose mission is to democratize financial services for Latin America's underbanked middle class and mass population. As the Lead Product Designer, I was responsible for the design implementation of a new digital account opening process, where every potential customer could acquire a debit account and credit card at the same time.",
        challenge:
          'The existing flow opened a credit card and a debit account as two separate journeys, each with its own KYC and compliance checks. Customers dropped off between the two, and compliance needed every screen to carry specific disclosures without slowing the flow down.',
        process: [
          'Mapped the two legacy flows side by side with compliance and engineering to find where requirements actually overlapped.',
          'Prototyped a single combined flow and tested it with users who had abandoned the credit-only application before.',
          'Worked screen by screen with the compliance team to place required disclosures without breaking the flow\'s pace.',
          'Shipped the combined flow behind a rollout flag and compared completion rates against the two legacy flows.',
        ],
        outcome:
          'The combined application shipped as the default entry point for new customers, cutting the number of screens a dual-product applicant had to complete and giving compliance one flow to audit instead of two.',
        gallerySeeds: ['stori-application-flow', 'stori-application-kyc', 'stori-application-cards'],
      },
      {
        slug: 'stori-black-card-beta',
        company: 'Stori',
        title: 'Launching the Stori Black credit card beta',
        summary: 'Taking a new credit card product from zero to a closed beta on a tight timeline.',
        role: 'Lead Product Designer',
        timeline: '2022',
        overview:
          "Creating the foundations of a product is a challenge by itself, but doing it under a record time is even more so, and I'm very proud of it. It was a deep thinking process to analyze the UX flow, do a beta launch, and get feedback from the final customers.",
        challenge:
          'Stori Black needed its own application and servicing experience, distinct enough to read as a premium tier, but built in weeks rather than the usual quarter, with no room for a second design pass before beta customers saw it.',
        process: [
          'Reused the compliant application flow as a base and layered in the eligibility and tiering logic specific to Black.',
          'Ran a paper-prototype review with the risk team before touching high-fidelity screens, to catch policy issues early.',
          'Designed a short in-app feedback prompt for beta customers instead of a separate research study, given the timeline.',
          'Tracked drop-off by screen through the first two beta cohorts and adjusted the weakest step between cohorts.',
        ],
        outcome:
          'The beta shipped on schedule to its first cohort, and the per-cohort feedback loop caught and fixed a confusing eligibility screen before the beta opened more broadly.',
        gallerySeeds: ['stori-black-card', 'stori-black-onboarding', 'stori-black-tiering'],
      },
      {
        slug: 'bbva-appointment-scheduling',
        company: 'BBVA Mexico',
        title: 'Branch appointment scheduling during the COVID-19 pandemic',
        summary: 'An appointment system so customers could visit a branch safely during lockdown restrictions.',
        role: 'Product Designer',
        timeline: '2020 to 2021',
        overview:
          'This project was a work in progress before and during the COVID-19 pandemic. It had a huge impact on the safety of customers, giving them the possibility to schedule a visit to the bank in an orderly fashion.',
        challenge:
          'Branches had to cap the number of people inside at once, and BBVA had no existing way for customers to reserve a specific time slot. The feature needed to launch fast, work for customers with low digital literacy, and hold up under a sudden spike in demand.',
        process: [
          'Started from the walk-in reasons branch staff reported most often, to decide which appointment types to support first.',
          'Kept the booking flow to a small number of steps so it worked on low-end devices and slow connections.',
          'Added a plain-language confirmation screen and SMS reminder, since many customers were booking for the first time.',
          'Worked with branch operations to test the flow in a handful of pilot branches before the citywide rollout.',
        ],
        outcome:
          'The scheduling feature rolled out across BBVA Mexico branches, giving customers a safer, predictable way to visit during a period when branch capacity was tightly restricted.',
        gallerySeeds: ['bbva-appointment-booking', 'bbva-branch-confirmation', 'bbva-branch-safety'],
      },
    ],
  },
  {
    slug: 'education-technology',
    name: 'Education technology industry',
    icon: 'graduationCap',
    caseStudies: [
      {
        slug: 'skooli-classroom-experience',
        company: 'Skooli',
        title: 'Bettering an online classroom experience',
        summary: 'Closing the feature gap that was costing Skooli renewals against its competitors.',
        role: 'Product Designer',
        timeline: '2019 to 2020',
        overview:
          'This experience was falling behind in comparison to its competitors because it was missing many features that were considered essential, and it was starting to lose customers who did not renew the service.',
        challenge:
          'Teachers using Skooli compared it directly against classrooms their students already used elsewhere, and the gaps were specific: no persistent whiteboard state, weak file sharing, and a session flow that was easy to lose track of mid-class.',
        process: [
          'Sat in on live tutoring sessions to see where teachers improvised workarounds instead of using the tool as built.',
          'Prioritized the classroom features by how often they came up in renewal conversations, not by build effort.',
          'Redesigned the in-session toolbar so the whiteboard, file sharing, and session timer stayed visible without crowding the video feed.',
          'Piloted the redesigned classroom with a subset of tutors before rolling it out to the full platform.',
        ],
        outcome:
          "The redesigned classroom closed the most commonly cited gaps against competitors and gave account managers a concrete feature list to point to in renewal conversations.",
        gallerySeeds: ['skooli-classroom-whiteboard', 'skooli-classroom-toolbar', 'skooli-classroom-session'],
      },
      {
        slug: 'litera-edtech-foundations',
        company: 'Litera',
        title: 'Ed-tech start-up design foundations',
        summary: 'Building the first version of the student and tutor experience from the ground up.',
        role: 'Product Designer',
        timeline: '2018 to 2019',
        overview:
          'Litera is a US education start-up where I owned building the foundations of the user experience for online tutoring for US schools and districts. I designed, developed, and prototyped many features like authentication, exclusive content selection, LTI tools, on-demand tutoring, and student ranking.',
        challenge:
          "There was no existing product to evolve. Every flow, from how a district administrator provisioned accounts to how a student picked up a tutoring session, had to be designed and validated for the first time, for an audience of school IT departments as well as students.",
        process: [
          'Started with district administrators, since their LTI setup decided whether a school could adopt the product at all.',
          'Designed the student-facing flows around short, on-demand sessions instead of scheduled ones, matching how the target districts actually used tutoring.',
          'Built and tested a lightweight ranking system that motivated repeat use without turning tutoring into a competition.',
          'Prototyped each core flow in isolation and tested with a handful of pilot schools before wiring flows together.',
        ],
        outcome:
          "The pilot districts were able to provision accounts and run tutoring sessions on the new foundations without support tickets for the core flows, validating the product's basic shape before the next funding round.",
        gallerySeeds: ['litera-onboarding', 'litera-tutoring-session', 'litera-student-ranking'],
      },
    ],
  },
  {
    slug: 'visibility-of-design-value',
    name: 'Visibility of design value',
    icon: 'usersThree',
    caseStudies: [
      {
        slug: 'customer-obsession',
        company: null,
        title: 'Customer obsession',
        summary: 'Making sure customer input actually changes what the design team ships, not just what it hears.',
        role: 'Design Manager',
        timeline: 'Ongoing practice',
        overview:
          "Getting qualitative and quantitative input from all the different sources is great, but it falls into a void if the design team doesn't act on it. Making sure our customers feel listened to is one of the challenges I've come across as a Design Manager, and this is how I describe my journey through it.",
        challenge:
          "Feedback arrived from support tickets, sales calls, and research interviews, but landed in different tools owned by different teams. Designers often heard about a customer complaint secondhand, months after it was raised, with no way to trace whether it had already been addressed.",
        process: [
          'Set up a single shared log where any team could tag a piece of customer feedback with the flow or feature it affected.',
          'Reviewed the log with the design team every two weeks and picked one theme to investigate, not every item that came in.',
          'Closed the loop by writing back to the original source (support, sales, or research) once a change shipped.',
          'Tracked how many themes went from raised to shipped, as a proxy for whether the process was actually working.',
        ],
        outcome:
          'Designers stopped hearing about recurring complaints secondhand, and support and sales had a place to check whether a customer\'s issue had already been addressed elsewhere.',
        gallerySeeds: ['customer-feedback-log', 'customer-feedback-review'],
      },
      {
        slug: 'design-system-implementation',
        company: null,
        title: 'Design System implementation',
        summary: 'Turning a design system from a nice-to-have into something stakeholders could see the value of.',
        role: 'Design Manager',
        timeline: 'Ongoing practice',
        overview:
          "Having a design system is often treated like a nice-to-have for stakeholders, and it's sometimes hard for them to see the value it adds to the overall experience. Across different companies, I've defined a method to make that value more visible and the system itself more flexible.",
        challenge:
          "Design systems tend to get built once and then drift from the product, because updating the system competes with feature work for the same designers' and engineers' time, and stakeholders rarely see the cost of that drift directly.",
        process: [
          'Audited live screens against the existing component library to find where product had quietly diverged from the system.',
          'Attached a rough time estimate to each divergence, so stakeholders could see the maintenance cost in familiar terms.',
          'Rebuilt the highest-cost components first and paired every system update with the product screen that needed it.',
          'Reviewed adoption with engineering leads on a regular cadence instead of leaving the system to erode silently.',
        ],
        outcome:
          "The system stayed closer to what was actually shipping, and stakeholders had a concrete cost figure to weigh the next time system work competed with a feature request.",
        gallerySeeds: ['design-system-audit', 'design-system-components'],
      },
    ],
  },
  {
    slug: 'aerospace',
    name: 'Aerospace industry',
    icon: 'rocket',
    caseStudies: [
      {
        slug: 'frisa-sales-system-modernization',
        company: 'Frisa',
        title: 'Modernizing an old aerospace parts sales system',
        summary: 'A full design discovery and rebuild of an internal sales tool, plus teaching the client what design thinking gets them.',
        role: 'Lead Product Designer',
        timeline: '2019',
        overview:
          "Stakeholders decided to make a full software update, and to obtain a design discovery to find a way to replicate the features with a newer look and feel and a more efficient version of the tool. An important highlight is that aside from doing a full design thinking process, another part of my job consisted of educating the client in design methodology and the advantages of it, since for them it was the first time getting familiar with these concepts.",
        challenge:
          "The existing sales system worked, so the internal team's first instinct was a visual refresh only. The harder problem was that nobody at Frisa had worked with a design process before, so getting buy-in for actual discovery work meant teaching the value of the process at the same time as running it.",
        process: [
          'Ran short working sessions with the sales team to observe the existing tool in real use before proposing anything.',
          'Introduced discovery as a small, time-boxed exercise first, to build trust before asking for a longer commitment.',
          'Mapped the parts-quoting workflow end to end and found the steps that existed only to compensate for the tool\'s limitations.',
          'Delivered the redesigned system alongside a short internal write-up explaining why each major change was made.',
        ],
        outcome:
          "The rebuilt system replaced the manual workarounds the sales team had built up over years, and the internal write-up gave Frisa's stakeholders a reference for evaluating design work on future projects.",
        gallerySeeds: ['frisa-sales-dashboard', 'frisa-parts-catalog', 'frisa-quote-flow'],
      },
    ],
  },
  {
    slug: 'electronics',
    name: 'Electronics industry',
    icon: 'cpu',
    caseStudies: [
      {
        slug: 'sony-internal-communications',
        company: 'Sony Mexico',
        title: 'Internal communications and intranet design',
        summary: 'Creating internal content and an intranet redesign across media and channels for employees.',
        role: 'Graphic and Product Designer',
        timeline: '2017 to 2018',
        overview:
          'I dedicated most of my time to creating internal content for different media and channels for employees, from e-mails and infographics to animated product snippets. I also had the opportunity to cover press releases and launch events.',
        challenge:
          "Internal announcements were going out through inconsistent formats, some as plain emails, some as PDFs, some as slide decks, so employees skimmed past most of them, including safety and product-launch information leadership needed everyone to see.",
        process: [
          'Set a small set of templates for the recurring announcement types (product launches, policy updates, event recaps).',
          'Redesigned the intranet landing page so the most time-sensitive announcement was always the first thing visible.',
          'Produced short animated snippets for major product launches, in place of long text announcements.',
          'Covered launch events directly, feeding same-day photo and video content back into the internal channels.',
        ],
        outcome:
          "Announcements followed a consistent, recognizable format, and major product launches got same-day internal coverage instead of a delayed recap.",
        gallerySeeds: ['sony-intranet-redesign', 'sony-launch-event', 'sony-internal-campaign'],
      },
    ],
  },
]

export const allCaseStudies: CaseStudy[] = industries.flatMap((group) => group.caseStudies)

export function findCaseStudy(slug: string) {
  return allCaseStudies.find((c) => c.slug === slug)
}

export function findIndustryForCaseStudy(slug: string) {
  return industries.find((group) => group.caseStudies.some((c) => c.slug === slug))
}
