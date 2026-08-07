// Verified profile data — sourced from profile_structured.json (2026-08-07 local review).
// Confidence levels preserved; dates marked for verification.

export const PROFILE = {
  location: 'Williamsville / Buffalo, NY area',
  headline: 'Remote IT Systems | Security, Compliance & Platform Operations',
  about:
    'I work best where technology needs to be made calmer, clearer, and more reliable. Calm, hands-on IT professional with 20+ years across technical support, endpoint systems, Microsoft 365 administration, identity and access, security operations, compliance support, infrastructure, and automation.',
  experience: [
    {
      employer: 'Concepts2Code, LLC',
      title: 'Staff — IT, Security, Compliance, Platform Operations',
      confidence: 'medium',
      bullets: [
        'Supported operational systems across infrastructure, security, compliance, and internal tooling.',
        'Supported SOC 2 Type I and Type II compliance work through process refinement, documentation, evidence workflows, and team handoffs.',
        'Maintained AWS and Terraform baselines, monitoring systems, and patching workflows where supported by team needs.',
        'Created Microsoft 365, Entra, SharePoint, and Intune reporting and automation to improve identity and endpoint visibility.',
        'Translated messy operational requirements into clear processes for better visibility and cleaner handoff.',
      ],
    },
    {
      employer: 'aHron Inc.',
      title: 'Chief Executive Artister / Self-Employed Creative Technology Work',
      confidence: 'medium',
      bullets: [
        'Managed self-directed creative technology work involving digital workflows, troubleshooting, documentation, and practical automation.',
        'Kept technical problem solving grounded in clear handoffs, repeatable process, and steady support for nontechnical users.',
      ],
    },
    {
      employer: 'M&T Bank',
      title: 'Mobility Integration and Support',
      confidence: 'medium',
      bullets: [
        'Supported mobility integration, endpoint access, user support, and operational handoffs in a banking environment.',
        'Worked with careful support practices appropriate for security-minded enterprise operations.',
      ],
    },
    {
      employer: 'Hospice Buffalo',
      title: 'Technical Lead',
      confidence: 'medium',
      bullets: [
        'Provided technical support leadership, troubleshooting, documentation, and user assistance in a healthcare setting.',
        'Helped maintain stable systems and clear support paths for staff working in service-focused operations.',
      ],
    },
    {
      employer: 'DaVita Kidney Care',
      title: 'Biomed Trainee',
      confidence: 'medium',
      bullets: [
        'Supported technical learning in a healthcare operations environment with attention to process, safety, and documentation.',
        'Worked around regulated operational expectations where reliability and careful handoff mattered.',
      ],
    },
    {
      employer: 'Crossfuze',
      title: 'Mobile Device Administrator',
      confidence: 'medium',
      bullets: [
        'Administered mobile device support workflows, MDM-related tasks, and user assistance for managed endpoints.',
        'Guided users patiently through mobile device issues where support depended on clear questions, careful listening, and step-by-step troubleshooting.',
        'Made recommendations and changes in AirWatch infrastructure used by the team.',
      ],
    },
    {
      employer: 'Mattel, Inc.',
      title: 'Desktop Support Specialist',
      confidence: 'medium',
      bullets: [
        'Supported Windows desktop environments, user troubleshooting, device setup, and incident resolution.',
        'Documented repeat support patterns and helped users return to stable working systems.',
      ],
    },
    {
      employer: 'CETech',
      title: 'Frontline MSP Support',
      confidence: 'medium',
      bullets: [
        'Provided frontline MSP support across user issues, endpoint troubleshooting, ticket handling, and remote assistance.',
        'Triaged incoming support needs and escalated issues with useful context for faster resolution.',
      ],
    },
    {
      employer: 'TxMQ',
      title: 'Chief Technology Officer',
      confidence: 'medium',
      bullets: [
        'Supported technology operations, technical planning, and practical systems decisions without overstating executive scope.',
        'Helped convert technical needs into clearer workflows, supportable systems, and documented operating practices.',
      ],
    },
    {
      employer: 'Earlier roles',
      title: 'Support, NOC, Help Desk, Mobility, and Technology Roles',
      confidence: 'low',
      bullets: [
        'Built a broad support base across help desk, NOC, mobility, troubleshooting, customer support, and hands-on technical operations.',
      ],
    },
  ],
  certifications: [
    { name: 'IT Security Foundations: Core Concepts', issuer: 'LinkedIn Learning', issued: 'Jan 2022' },
    { name: 'Windows 10: Intune Device Management', issuer: 'LinkedIn Learning', issued: 'Mar 2020' },
    { name: 'Linux: Bash Shell and Scripts', issuer: 'LinkedIn Learning', issued: 'May 2020' },
    { name: 'macOS for IT Administrators', issuer: 'LinkedIn Learning', issued: 'May 2020' },
    { name: 'Leading from the Middle', issuer: 'LinkedIn Learning', issued: 'May 2020' },
    { name: 'Creating a Culture of Collaboration', issuer: 'LinkedIn Learning', issued: 'Mar 2020' },
    { name: 'Network+', issuer: 'CompTIA', issued: 'Sep 2000', note: 'listed on public profile' },
  ],
  projects: [
    {
      name: 'SOC 2 Type II — Concepts2Code',
      dates: 'Jun 2025 - Jul 2025',
      description:
        'Concepts2Code achieved SOC 2 Type II compliance after months of process refinement and security evidence work with the team and R2R partners.',
    },
    {
      name: 'SOC 2 Type I compliance project',
      dates: 'Apr 2024 - Apr 2025',
      description:
        'SOC 2 Type I compliance project completed over a year, emphasizing control, patience, and thoughtful security measures.',
    },
  ],
  recommendations: [
    {
      recommender: 'Patrick Young',
      summary:
        'Praised Ahron\u2019s technology knowledge and ability to explain information at the audience\u2019s level without talking down.',
    },
    {
      recommender: 'Scott Strang',
      summary:
        'Praised Ahron\u2019s customer service, patience guiding mobile users, backend messaging infrastructure knowledge, and AirWatch recommendations and changes. Direct supervisor during the Crossfuze role.',
    },
  ],
  skills: {
    'Identity & Endpoint': [
      'Microsoft 365',
      'Microsoft Entra ID',
      'Intune',
      'Defender for Endpoint',
      'Endpoint Management',
      'MDM',
      'IAM',
      'MFA',
      'Conditional Access',
      'Access Reviews',
      'AirWatch',
    ],
    'Systems & Cloud': [
      'AWS',
      'Terraform',
      'PowerShell',
      'Bash',
      'Linux',
      'Windows Administration',
      'SharePoint',
      'SaaS Operations',
      'Monitoring',
      'Patching Workflows',
    ],
    'Security & Compliance': [
      'SOC 2',
      'PCI DSS',
      'Security Evidence',
      'Compliance Workflows',
      'Risk Assessment',
      'Vulnerability Management',
      'Audit Evidence',
      'Change Management',
      'Endpoint Security',
    ],
    'Support & Operations': [
      'Remote Support',
      'Incident Triage',
      'Root Cause Analysis',
      'Documentation',
      'Runbooks',
      'Dashboards',
      'Workflow Automation',
      'Customer Guidance',
    ],
  },
};
