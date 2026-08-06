/**
 * Conclave thematic areas. Single source of truth shared by ThemesSection
 * (display), ConclaveOverview (theme list), and the abstract/paper
 * submission forms (theme dropdown).
 *
 * Content is the official conference copy and must be preserved verbatim.
 * To update a theme or add a new one, edit the arrays below — nothing in
 * the UI components needs to change.
 */

export type Theme = {
  /** Short title shown on the interactive theme cards. */
  title: string;
  /** Exact heading shown when a theme is expanded. */
  heading: string;
  /** Official description, split into paragraphs (kept verbatim). */
  description: string[];
  /** Soft visual accent used on the interactive theme cards. */
  accent: {
    shell: string;
    border: string;
  };
};

/** Introductory copy rendered above and below the theme cards, verbatim. */
export const THEMES_INTRO = {
  lead: "The conclave will focus on the following broad thematic areas:",
  closing:
    "These themes are indicative rather than exhaustive. Scholars are welcome to submit papers that broadly align with these thematic areas. We particularly encourage submissions that connect field-based experiences and empirical evidence with government policies and programmes. Papers addressing data sources, databases, and methodological approaches to the study of rural India are also welcome.",
};

export const THEMES: Theme[] = [
  {
    title:
      "Role of Science and Technology in Agrarian and Rural Transformation",
    heading:
      "Role of Science and Technology in Agrarian and Rural Transformation.",
    description: [
      "Science and technology have historically played, and continue to play, a critical role in shaping agrarian and rural transformation. However, the impact and distribution of the benefits of technological change are closely linked to the prevailing socio-economic structure, institutional arrangements, and public policies. This theme invites papers that examine the interaction between advances in agricultural science and technology and the contemporary agrarian context in India, with a focus on issues such as productivity, equity, digital agriculture, mechanisation, biotechnology, and the role of public research and extension systems.",
    ],
    accent: {
      shell: "bg-[#f3f7ea]",
      border: "border-t-[#b7c97d]",
    },
  },
  {
    title: "Inequality, Deprivation, and Living Standards in the Countryside",
    heading: "Inequality, Deprivation, and Living Standards in the Countryside.",
    description: [
      "Inequality and deprivation remain a challenge in rural India despite economic and social changes. Inequality is broadly understood as disparities on income, wealth, employment, access to education, healthcare, and other productive resources. Standards of living emphasise the ability to live a healthy life, receive quality education, secure nutritious food, access adequate housing and essential public services. This theme invites contributions examining the different dimensions of inequality and deprivation in rural areas, and data and policy debates on living standards and reducing social and economic disparities.",
    ],
    accent: {
      shell: "bg-[#f8f2e8]",
      border: "border-t-[#d9b77a]",
    },
  },
  {
    title: "Agrarian Relations",
    heading: "Agrarian Relations",
    description: [
      "Agrarian relations are shaped by interactions among class, caste, gender, and other forms of social differentiation. These interactions take place in a background defined by the interplay between global, national, and local processes that influence agricultural production systems, labour markets, and rural development. This theme welcomes papers on changing agrarian relations, the conditions of rural socio-economic classes, women's participation in the rural workforce, the condition of Scheduled Castes, Scheduled Tribes, and other marginalised communities, incomes from agriculture and related activities.",
    ],
    accent: {
      shell: "bg-[#eef4fb]",
      border: "border-t-[#9fb8db]",
    },
  },
  {
    title:
      "Dynamics of Farm and Non-Farm, and Rural and Urban Linkages (including Migration)",
    heading:
      "Dynamics of Farm and Non-Farm, and Rural and Urban Linkages (including Migration)",
    description: [
      "Rural economies are increasingly interconnected with non-farm activities, both within the village and in urban centres, leading to significant changes in livelihoods, employment patterns, and social relations. One of the major outcomes of these changes has been the increase in out-migration from the countryside. Although agriculture continues to be the primary source of livelihood for a large proportion of rural households, its contribution to the overall Gross Value Added (GVA) has steadily declined. These changes have generated new research questions on the evolving relationship between agricultural and non-agricultural activities and its implications for rural transformation. This theme invites papers that examine the changing dynamics of farm–non-farm linkages, the diversification of rural livelihoods, rural–urban economic interactions, and seasonal as well as long-term migration.",
    ],
    accent: {
      shell: "bg-[#f6eff8]",
      border: "border-t-[#c6a9d7]",
    },
  },
  {
    title: "Agriculture and the Environment (including Climate Change)",
    heading: "Agriculture and Environment including (Climate Change)",
    description: [
      "Agriculture and rural livelihoods are closely linked to environmental conditions and natural resources. Environmental degradation, water scarcity, and climate variability have emerged as major challenges affecting agricultural production and rural communities. At the same time, important debates continue over how to balance environmental sustainability, agricultural productivity and growth, and livelihood security, particularly for the rural poor.",
      "In many countries of the Global South, including India, climate change has also intensified debates over agricultural policy. A key concern is the growing emphasis on climate change mitigation, which risks overshadowing the need to increase agricultural production and productivity, critical dimensions of food security and rural livelihoods.",
      "This theme invites papers on environmental change in rural areas; climate change adaptation and mitigation; sustainable agriculture; irrigation and water resource management; and policy responses to environmental and climate-related challenges.",
    ],
    accent: {
      shell: "bg-[#eef7f3]",
      border: "border-t-[#9dc8b2]",
    },
  },
];
