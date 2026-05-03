/**
 * Product catalog aligned with `src/assets/Product Data Sheet` and `scripts/generate-product-thumbs.sh`.
 * PDFs are served from `/product-datasheets/{id}.pdf`; thumbnails from `src/assets/product-thumbs/{id}.png`.
 * Specs summarize datasheet titles; confirm final figures on the PDF before procurement.
 */

const PRODUCT_CATALOG_ITEMS = [
  /* ---------- Energy storage ---------- */
  {
    id: 'eos-15kwh',
    catalogSection: 'storage',
    name: 'SRNE EOS series — 15 kWh solar storage battery',
    category: 'Battery storage',
    imageCaption: 'EOS rack / tower LFP storage',
    shortDescription:
      '15 kWh-class lithium iron phosphate stack for hybrid PV systems, backup power, and scalable parallel deployment.',
    overview:
      'SRNE EOS-series batteries deliver stable DC coupling with hybrid inverters, long cycle life, and flexible scaling for homes and commercial sites that need dependable stored energy.',
    specs: [
      ['Series', 'SRNE EOS'],
      ['Usable energy (typ.)', '~15 kWh class'],
      ['Nominal voltage', '48 V / 51.2 V platform'],
      ['Battery chemistry', 'LFP (LiFePO₄)'],
      ['Parallel capability', 'Multiple units (per datasheet)'],
      ['Documentation', 'Datasheet V1.2']
    ],
    featureDetails: [
      'Designed for hybrid solar + storage operation with managed BMS integration.',
      'Suited to peak shaving, backup for critical loads, and diesel displacement.',
      'Expandable architecture when future capacity upgrades are required.'
    ],
    applicationDetails: [
      'Residential and small commercial hybrid installations.',
      'Clinics, offices, and institutions needing quiet, low-maintenance backup.',
      'Download the manufacturer datasheet for exact electrical limits and certifications.'
    ],
    datasheetPath: '/product-datasheets/eos-15kwh.pdf',
    indicativeUnitPrice: 11500
  },
  {
    id: 'se-5-15kwh',
    catalogSection: 'storage',
    name: 'SRNE SE series — 5–15 kWh solar storage battery',
    category: 'Battery storage',
    imageCaption: 'SE modular battery line',
    shortDescription:
      'Modular SE-series LiFePO₄ storage spanning roughly 5–15 kWh usable blocks for flexible system sizing.',
    overview:
      'The SE range covers smaller residential stacks through mid-size commercial storage, keeping voltage classes aligned with common hybrid inverter platforms.',
    specs: [
      ['Series', 'SRNE SE'],
      ['Energy range (family)', '5–15 kWh'],
      ['Typical voltage class', '48 V platform'],
      ['Chemistry', 'LFP'],
      ['Documentation', 'Datasheet V1.4']
    ],
    featureDetails: [
      'Step-capacity planning for installers who need incremental storage adds.',
      'Suited to retrofit battery additions behind existing PV.',
      'Compatible ecosystem with SRNE hybrid inverter families.'
    ],
    applicationDetails: [
      'Homes and SMEs balancing budget with usable kWh targets.',
      'Sites where transport or space favors modular sections.',
      'Pair with correct BMS and inverter settings per manufacturer.'
    ],
    datasheetPath: '/product-datasheets/se-5-15kwh.pdf',
    indicativeUnitPrice: 7800
  },
  {
    id: 'powerpal-y5',
    catalogSection: 'storage',
    name: 'PowerPal Y5 — 51.2 V / 314 Ah (~16 kWh) storage',
    category: 'Battery storage',
    imageCaption: 'PowerPal high-capacity block',
    shortDescription:
      'Floor-standing LFP block (~16 kWh) at 51.2 V nominal for robust hybrid and backup designs.',
    overview:
      'PowerPal Y5 targets installers needing a dense energy package with clear voltage alignment to 48 V hybrid inverter ecosystems.',
    specs: [
      ['Model family', 'PowerPal Y5'],
      ['Nominal voltage', '51.2 V'],
      ['Capacity ref.', '314 Ah'],
      ['Energy (reference)', '~16 kWh'],
      ['Documentation', 'Manufacturer datasheet']
    ],
    featureDetails: [
      'High energy density for commercial-grade backup windows.',
      'Suited to pairing with appropriately sized hybrid inverters.',
      'Refer to datasheet for charge/discharge limits and warranty terms.'
    ],
    applicationDetails: [
      'Commercial three-phase sites with hybrid storage requirements.',
      'Institutions expanding existing PV with dedicated battery bays.',
      'Always verify BMS protocol match with selected inverter brand.'
    ],
    datasheetPath: '/product-datasheets/powerpal-y5.pdf',
    indicativeUnitPrice: 11200
  },
  {
    id: 'sr-ket130b',
    catalogSection: 'storage',
    name: 'SR-Ket130B energy storage system',
    category: 'Battery storage',
    imageCaption: 'SR-Ket integrated storage',
    shortDescription:
      'Manufacturer integrated battery package (SR-Ket130B) for structured delivery with SRNE-style hybrid ecosystems.',
    overview:
      'SR-Ket series products package cells, BMS, and enclosure considerations for faster deployment when a unified cabinet solution is preferred.',
    specs: [
      ['Product line', 'SR-Ket130B'],
      ['Configuration', 'Integrated / cabinet style'],
      ['Application class', 'Commercial & industrial storage'],
      ['Documentation', 'SR-Ket130B V1.0']
    ],
    featureDetails: [
      'Suited to projects that standardize on factory-integrated storage blocks.',
      'Reduces field assembly time versus fully custom racks.',
      'Follow manufacturer torque, clearance, and ventilation guidance.'
    ],
    applicationDetails: [
      'Factories, campuses, and utilities piloting hybrid solar + storage.',
      'Sites requiring repeatable procurement specs across multiple branches.',
      'Review lifting plan and pad requirements before delivery.'
    ],
    datasheetPath: '/product-datasheets/sr-ket130b.pdf',
    indicativeUnitPrice: 14500
  },
  {
    id: 'sr-ket210c',
    catalogSection: 'storage',
    name: 'SR-Ket210C energy storage system',
    category: 'Battery storage',
    imageCaption: 'SR-Ket high-tier storage',
    shortDescription:
      'Higher-capacity SR-Ket210C cabinet line for larger hybrid plants and extended backup duty.',
    overview:
      'SR-Ket210C extends the Ket family for sites that need more kWh per footprint while maintaining integration discipline.',
    specs: [
      ['Product line', 'SR-Ket210C'],
      ['Configuration', 'Integrated / cabinet style'],
      ['Target segment', 'Larger C&I plants'],
      ['Documentation', 'SR-Ket210C V1.0']
    ],
    featureDetails: [
      'Supports scaled hybrid architectures when paired with matching inverter tiers.',
      'Engineering-friendly documentation for electrical protection studies.',
      'Commission with SRNE-approved settings where applicable.'
    ],
    applicationDetails: [
      'Medium industrial loads and logistics hubs.',
      'Expanded backup for cold-chain or continuous process lines.',
      'Coordinate shipping incoterms and customs documentation early.'
    ],
    datasheetPath: '/product-datasheets/sr-ket210c.pdf',
    indicativeUnitPrice: 18500
  },

  /* ---------- SRNE HESP hybrid ---------- */
  {
    id: 'hespsp-36-6kw-sp',
    catalogSection: 'hespsp',
    name: 'SRNE HESP — 48 V 3.6–6 kW single-phase hybrid inverter (230 V)',
    category: 'Hybrid inverter',
    imageCaption: 'HESP single-phase hybrid',
    shortDescription:
      'EU-market single-phase hybrid inverter on 48 V battery rail for residential and light commercial PV + storage.',
    overview:
      'The HESP single-phase family integrates PV, battery, and grid/generator interfaces with software suited to European 230 V nominal sites.',
    specs: [
      ['Series', 'SRNE HESP'],
      ['AC output (range)', '3.6–6 kW class'],
      ['Battery voltage', '48 V'],
      ['AC voltage', '230 V single-phase'],
      ['Topology', 'Hybrid solar storage inverter'],
      ['Documentation', 'Datasheet V1.1']
    ],
    featureDetails: [
      'Ideal entry hybrid path for homes moving beyond basic grid-tie.',
      'Supports battery charging from PV and controlled grid import rules.',
      'Use manufacturer portal for firmware and country grid profiles.'
    ],
    applicationDetails: [
      'Residential rooftops and small shops.',
      'Backup for lighting, refrigeration, and communications loads.',
      'Confirm MPPT count and string voltage window against module layout.'
    ],
    datasheetPath: '/product-datasheets/hespsp-36-6kw-sp.pdf',
    indicativeUnitPrice: 2200
  },
  {
    id: 'hespsp-8-12kw-230v',
    catalogSection: 'hespsp',
    name: 'SRNE HESP — 48 V 8–12 kW solar storage inverter (230 V)',
    category: 'Hybrid inverter',
    imageCaption: 'HESP 8–12 kW EU hybrid',
    shortDescription:
      'Higher-power single-phase hybrid inverter for larger homes and small business backup with 48 V storage.',
    overview:
      'Extends HESP capability for heavier daytime loads and stronger battery charge/discharge rates while staying in common 230 V single-phase service contexts.',
    specs: [
      ['Series', 'SRNE HESP'],
      ['AC output (range)', '8–12 kW'],
      ['Battery voltage', '48 V'],
      ['AC output', '230 V single-phase'],
      ['Documentation', 'Datasheet 1.1']
    ],
    featureDetails: [
      'Supports bigger PV arrays and faster battery throughput.',
      'Useful when backup must cover pumps, motor loads, or partial three-phase via phase assignment.',
      'Coordinate generator input rules if bi-directional hybrid design applies.'
    ],
    applicationDetails: [
      'Large residences and workshops.',
      'Retail with meaningful HVAC or refrigeration.',
      'Always validate neutral/earth regime with local utility rules.'
    ],
    datasheetPath: '/product-datasheets/hespsp-8-12kw-230v.pdf',
    indicativeUnitPrice: 3400
  },
  {
    id: 'hespsp-8-12kw-3ph',
    catalogSection: 'hespsp',
    name: 'SRNE HESP — 8–12 kW three-phase hybrid (EU datasheet)',
    category: 'Three-phase hybrid inverter',
    imageCaption: 'HESP 8–12 kW three-phase',
    shortDescription:
      'Three-phase hybrid inverter platform for balanced commercial loads and motor startups.',
    overview:
      'Addresses sites served by three-phase distribution where hybrid PV + storage must synchronize cleanly across phases.',
    specs: [
      ['Series', 'SRNE HESP (three-phase)'],
      ['Power class', '8–12 kW'],
      ['Market doc.', 'EU datasheet V1.0'],
      ['Integration', 'Hybrid PV + battery']
    ],
    featureDetails: [
      'Better phase balance than stacking multiple single-phase hybrids.',
      'Suited to pumps, compressors, and distributed loads.',
      'Follow datasheet for parallel AC coupling limits.'
    ],
    applicationDetails: [
      'Small industrial units and agricultural processing.',
      'Mini-grids upgrading from single-phase hybrids.',
      'Review transformer sizing and inrush with motor loads.'
    ],
    datasheetPath: '/product-datasheets/hespsp-8-12kw-3ph.pdf',
    indicativeUnitPrice: 5200
  },
  {
    id: 'hespsp-8-12kw-sh3',
    catalogSection: 'hespsp',
    name: 'SRNE HESP SH3 — 8–12 kW three-phase solar hybrid inverter',
    category: 'Three-phase hybrid inverter',
    imageCaption: 'HESP SH3 platform',
    shortDescription:
      'SH3 variant documentation for 8–12 kW three-phase hybrid configurations with dedicated protection philosophy.',
    overview:
      'SH3-branded HESP models document hardware revisions or firmware branches relevant to specific export markets and certification bundles.',
    specs: [
      ['Series', 'SRNE HESP SH3'],
      ['Power class', '8–12 kW'],
      ['Phases', 'Three-phase'],
      ['Documentation', 'Datasheet V1.1']
    ],
    featureDetails: [
      'Use when tender explicitly references SH3 documentation.',
      'Cross-check terminal labels against earlier HESP revisions.',
      'Commission with settings packs approved for your grid code.'
    ],
    applicationDetails: [
      'Commercial rooftops with strict inspection checklists.',
      'Replacement projects requiring model-for-model documentation.',
      'Keep serial plate photos with warranty registration.'
    ],
    datasheetPath: '/product-datasheets/hespsp-8-12kw-sh3.pdf',
    indicativeUnitPrice: 5400
  },
  {
    id: 'hespsp-16-20kw-3ph',
    catalogSection: 'hespsp',
    name: 'SRNE HESP — 16–20 kW three-phase hybrid solar storage inverter',
    category: 'Three-phase hybrid inverter',
    imageCaption: 'HESP 16–20 kW hybrid',
    shortDescription:
      'Mid-commercial three-phase hybrid inverter for larger PV arrays and stronger battery power conversion.',
    overview:
      'Moves into higher kW classes where feeder capacity and PV oversizing demand robust hybrid control and thermal headroom.',
    specs: [
      ['Series', 'SRNE HESP'],
      ['Power class', '16–20 kW'],
      ['Phases', 'Three-phase'],
      ['Documentation', 'English three-phase V1.0']
    ],
    featureDetails: [
      'Supports meaningful C&I peak shaving when paired with adequate storage.',
      'Coordinate AC disconnect rating with utility protection schemes.',
      'Monitor ambient temperature for tropical installations.'
    ],
    applicationDetails: [
      'Light manufacturing and cold storage.',
      'Schools and clinics with three-phase service entrance.',
      'Plan cable trays and inverter wall structural loads.'
    ],
    datasheetPath: '/product-datasheets/hespsp-16-20kw-3ph.pdf',
    indicativeUnitPrice: 8200
  },

  /* ---------- Utility / IESP / balance ---------- */
  {
    id: 'iesp-50-60kw',
    catalogSection: 'utility',
    name: 'SRNE IESP — 50–60 kW high-voltage three-phase hybrid inverter',
    category: 'Utility-scale hybrid inverter',
    imageCaption: 'IESP high-power hybrid',
    shortDescription:
      'High-voltage three-phase hybrid inverter for larger plants and heavy cycling applications.',
    overview:
      'IESP targets multi-hundred-kW plant segments when assembled in arrays, with high-voltage battery coupling options per manufacturer guidance.',
    specs: [
      ['Series', 'SRNE IESP'],
      ['Power class', '50–60 kW'],
      ['Topology', 'High-voltage three-phase hybrid'],
      ['Documentation', 'Datasheet V00']
    ],
    featureDetails: [
      'Suited to campus-scale solar + storage with centralized inverter yards.',
      'Requires professional studies for arc flash and fault coordination.',
      'Integrate with SCADA where export rules demand telemetry.'
    ],
    applicationDetails: [
      'Factories, mines, and logistics hubs.',
      'Mini-grid hubs coupling diesel reduction programs.',
      'Engage factory applications engineers for multi-unit layouts.'
    ],
    datasheetPath: '/product-datasheets/iesp-50-60kw.pdf',
    indicativeUnitPrice: 18500
  },
  {
    id: 'sr-box-112c-55k',
    catalogSection: 'utility',
    name: 'SR-Box112C-55K — specification package',
    category: 'Power systems / integration',
    imageCaption: 'SR-Box integration hardware',
    shortDescription:
      'SR-Box112C-55K technical specification sheet for medium/high-power solar plant integration hardware.',
    overview:
      'Use this document when designing switchgear-adjacent integration, protection coordination, and layout around SR-Box class equipment.',
    specs: [
      ['Reference', 'SR-Box112C-55K'],
      ['Document type', 'Specification sheet'],
      ['Typical use', 'Commercial plant balance-of-system']
    ],
    featureDetails: [
      'Clarifies mechanical and electrical interfaces for system integrators.',
      'Supports procurement alignment across civil and electrical trades.',
      'Coordinate with national electrical code and utility interconnection.'
    ],
    applicationDetails: [
      'Ground-mount solar farms and large rooftop collectors.',
      'Sites combining multiple inverter clusters.',
      'Review lifting and foundation drawings with EPC team.'
    ],
    datasheetPath: '/product-datasheets/sr-box-112c-55k.pdf',
    indicativeUnitPrice: 28000
  },

  /* ---------- SUN series ---------- */
  {
    id: 'sun-3-6k',
    catalogSection: 'sun',
    name: 'SUN — 3–6 kW hybrid / string inverter (SG04LP1 family)',
    category: 'String / hybrid inverter',
    imageCaption: 'SUN compact inverter',
    shortDescription:
      'Compact residential-light commercial inverter family for small three-phase or split deployments per datasheet.',
    overview:
      'SUN-branded documents cover multiple SG generations; verify MPPT layout and communication modules against your BOM.',
    specs: [
      ['Family ref.', 'SUN SG04LP1 datasheet'],
      ['Power band', '3–6 kW'],
      ['Documentation', 'Manufacturer B datasheet']
    ],
    featureDetails: [
      'Cost-effective entry for standardized residential kits.',
      'Supports monitoring when optional dongles are fitted.',
      'Validate firmware for your exact SKU before commissioning.'
    ],
    applicationDetails: [
      'Small homes and shops.',
      'Pilot solar water pumping when paired with motor controllers.',
      'Download PDF for exact efficiency curves.'
    ],
    datasheetPath: '/product-datasheets/sun-3-6k.pdf',
    indicativeUnitPrice: 950
  },
  {
    id: 'sun-3-12k',
    catalogSection: 'sun',
    name: 'SUN — 3–12 kW (SG05LP3 EU)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 3–12 kW EU',
    shortDescription:
      'Mid-range SUN inverter documentation for EU-oriented three-phase LP3 footprint installations.',
    overview:
      'Ideal when scaling beyond micro residential systems toward multi-string rooftops with broader MPPT coverage.',
    specs: [
      ['Document', 'SG05LP3 EU SM'],
      ['Power span', '3–12 kW'],
      ['Market', 'EU datasheet']
    ],
    featureDetails: [
      'Flexible string planning with multiple MPPT channels per datasheet.',
      'Supports export limitation concepts where regulations require.',
      'Mount with sunshield strategies for tropical irradiance.'
    ],
    applicationDetails: [
      'Schools and municipal rooftops.',
      'Commercial tie-ins with separate meters.',
      'Cross-check AFCI/GFDI expectations by jurisdiction.'
    ],
    datasheetPath: '/product-datasheets/sun-3-12k.pdf',
    indicativeUnitPrice: 1600
  },
  {
    id: 'sun-14-20k-sm',
    catalogSection: 'sun',
    name: 'SUN — 14–20 kW (SG05LP3 EU-SM)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 14–20 kW',
    shortDescription:
      'Higher-current SUN variant for medium commercial feeders with LP3 EU-SM documentation.',
    overview:
      'Supports heavier daytime loads with balanced AC export management when paired with correct CT metering.',
    specs: [
      ['Document', 'SG05LP3 EU-SM'],
      ['Power span', '14–20 kW'],
      ['Region', 'EU-focused datasheet']
    ],
    featureDetails: [
      'Strong fit for medium retail and warehouse roofs.',
      'Coordinate surge protection at POI per utility.',
      'Review cooling clearance with inverter stacking rules.'
    ],
    applicationDetails: [
      'Cold chain warehouses.',
      'Office campuses with daytime HVAC dominance.',
      'Plan spare MPPT channels for east-west arrays.'
    ],
    datasheetPath: '/product-datasheets/sun-14-20k-sm.pdf',
    indicativeUnitPrice: 2800
  },
  {
    id: 'sun-14-20k-sg05',
    catalogSection: 'sun',
    name: 'SUN — 14–20 kW (SG05LP3 EU-SM2 variant)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN alternate SM2 doc',
    shortDescription:
      'Alternate SM2 documentation track for SG05LP3 EU lineage — compare serial compatibility before ordering.',
    overview:
      'Some regions ship firmware branches documented under SM2 revisions; match inverter label to PDF revision.',
    specs: [
      ['Document track', 'SG05LP3 EU-SM2'],
      ['Power span', '14–20 kW'],
      ['Note', 'Verify SKU vs. SM variant']
    ],
    featureDetails: [
      'Keep procurement aligned with distributor revision letters.',
      'Commission only after confirming meter firmware handshake.',
      'Retain EMI mitigation kits where mandated.'
    ],
    applicationDetails: [
      'Replacement-for-like upgrades.',
      'Projects duplicated across counties with regional SKU splits.',
      'Contact Enersource for Liberia stocking specifics.'
    ],
    datasheetPath: '/product-datasheets/sun-14-20k-sg05.pdf',
    indicativeUnitPrice: 2900
  },
  {
    id: 'sun-25-30k',
    catalogSection: 'sun',
    name: 'SUN — 25–30 kW (SG02HP3 EU-AM3)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 25–30 kW',
    shortDescription:
      'Commercial three-phase inverter documentation for 25–30 kW HP3 EU platform.',
    overview:
      'Targets segments bridging mid C&I with simplified installation practices vs. central inverters.',
    specs: [
      ['Series ref.', 'SG02HP3 EU-AM3'],
      ['Power span', '25–30 kW'],
      ['Documentation', '2026 dated sheet']
    ],
    featureDetails: [
      'Supports fleet procurement when identical SKUs repeat.',
      'Ideal when transformer-less topology matches utility approval.',
      'Monitor harmonic emissions vs. weak grids.'
    ],
    applicationDetails: [
      'Factories with steady daytime baseload.',
      'Water treatment facilities.',
      'Coordinate tilt racking shading studies with MPPT allocation.'
    ],
    datasheetPath: '/product-datasheets/sun-25-30k.pdf',
    indicativeUnitPrice: 4200
  },
  {
    id: 'sun-5-25k',
    catalogSection: 'sun',
    name: 'SUN — 5–25 kW (SG01HP3 EU)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 5–25 kW band',
    shortDescription:
      'Wide-span SG01HP3 EU documentation covering flexible commercial sizing within one product family.',
    overview:
      'Useful when engineering wants multiple SKUs without switching vendor ecosystems.',
    specs: [
      ['Series ref.', 'SG01HP3 EU'],
      ['Power span', '5–25 kW'],
      ['Documentation', 'Manufacturer datasheet']
    ],
    featureDetails: [
      'Streamlined training for installation crews.',
      'Shared spare parts strategy across sites.',
      'Double-check DC isolator ratings per max Voc.'
    ],
    applicationDetails: [
      'Branch rollouts for banks and franchises.',
      'Municipal buildings with phased expansions.',
      'Download PDF for weight and lifting recommendations.'
    ],
    datasheetPath: '/product-datasheets/sun-5-25k.pdf',
    indicativeUnitPrice: 2400
  },
  {
    id: 'sun-29-50k',
    catalogSection: 'sun',
    name: 'SUN — 29.9–50 kW (SG01HP3 EU-BM4)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN high kW EU-BM4',
    shortDescription:
      'High-output SUN documentation for large rooftops and small utility segments.',
    overview:
      'Designed for sites pushing feeder limits while staying with string inverter serviceability.',
    specs: [
      ['Series ref.', 'SG01HP3 EU-BM4'],
      ['Power span', '29.9–50 kW'],
      ['Documentation', 'Manufacturer datasheet']
    ],
    featureDetails: [
      'Consider auxiliary transformer upgrade paths.',
      'Parallel deployment study may apply over 50 kW segments.',
      'Protective relay coordination becomes critical.'
    ],
    applicationDetails: [
      'Large warehouse roofs.',
      'Industrial parks with dedicated MV substations.',
      'Engage utility early for export caps.'
    ],
    datasheetPath: '/product-datasheets/sun-29-50k.pdf',
    indicativeUnitPrice: 6200
  },
  {
    id: 'sun-60-80k-sg01',
    catalogSection: 'sun',
    name: 'SUN — 60–80 kW (SG01HP3 EU-BM4)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 60–80 kW SG01',
    shortDescription:
      'SG01HP3 EU-BM4 track for 60–80 kW applications with BM4 hardware references.',
    overview:
      'Supports heavy commercial scaling while retaining string-level maintenance accessibility.',
    specs: [
      ['Series ref.', 'SG01HP3 EU-BM4'],
      ['Power span', '60–80 kW'],
      ['Platform', 'SG01']
    ],
    featureDetails: [
      'Plan crane or forklift placement for rooftop logistics.',
      'Consider harmonic filters if weak MV links.',
      'Pair with adequate lightning protection zones.'
    ],
    applicationDetails: [
      'Manufacturing halls with high noontime demand.',
      'Port logistics buildings.',
      'Review fire access pathways for inverter rows.'
    ],
    datasheetPath: '/product-datasheets/sun-60-80k-sg01.pdf',
    indicativeUnitPrice: 9200
  },
  {
    id: 'sun-60-80k-sg02',
    catalogSection: 'sun',
    name: 'SUN — 60–80 kW (SG02HP3 EU-EM6)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 60–80 kW SG02',
    shortDescription:
      'SG02HP3 EU-EM6 documentation variant for 60–80 kW projects requiring EM6 control features.',
    overview:
      'Differentiates monitoring/communication options vs. SG01 branch — confirm procurement BOM accordingly.',
    specs: [
      ['Series ref.', 'SG02HP3 EU-EM6'],
      ['Power span', '60–80 kW'],
      ['Variant', 'EM6']
    ],
    featureDetails: [
      'May unlock advanced export management features per datasheet.',
      'Verify firmware compatibility with lithium BESS DC coupling if hybrid.',
      'Keep labeling consistent across inverter wall.'
    ],
    applicationDetails: [
      'Large retail malls.',
      'Grid-flexibility pilot programs.',
      'Coordinate SCADA handoff with operations teams.'
    ],
    datasheetPath: '/product-datasheets/sun-60-80k-sg02.pdf',
    indicativeUnitPrice: 9400
  },
  {
    id: 'sun-100-125k',
    catalogSection: 'sun',
    name: 'SUN — 100–125 kW (SG02HP3 EU-GM10)',
    category: 'Three-phase inverter',
    imageCaption: 'SUN 100–125 kW',
    shortDescription:
      'Very large string-class inverter documentation for 100–125 kW segments before central inverter economics.',
    overview:
      'Useful when project economics favor distributed MPPT but power levels approach small central plants.',
    specs: [
      ['Series ref.', 'SG02HP3 EU-GM10'],
      ['Power span', '100–125 kW'],
      ['Documentation', 'Manufacturer B datasheet']
    ],
    featureDetails: [
      'Demands rigorous AC combiner design.',
      'Often paired with dedicated LV switchboards.',
      'Commission with insulation resistance logs.'
    ],
    applicationDetails: [
      'Large manufacturing solar roofs.',
      'Small utility-scale pilot blocks.',
      'Plan maintenance corridors between inverter lines.'
    ],
    datasheetPath: '/product-datasheets/sun-100-125k.pdf',
    indicativeUnitPrice: 12500
  },

  /* ---------- Solar modules ---------- */
  {
    id: 'bimax-580-590',
    catalogSection: 'modules',
    name: 'BiMAX-5N — 580–590 W module (182 mm, 16BB, 144 cells)',
    category: 'Solar module',
    imageCaption: 'BiMAX high-power module',
    shortDescription:
      'High-efficiency monocrystalline module line rated in the 580–590 W window for utility and C&I arrays.',
    overview:
      'BiMAX-5N targets projects optimizing DC capacity per tracker or fixed-tilt row while managing logistics weight.',
    specs: [
      ['Series', 'BiMAX-5N'],
      ['Power class', '580–590 W'],
      ['Cell format', '182 mm, 144 cells'],
      ['Design', '16BB']
    ],
    featureDetails: [
      'Suited to large-scale deployment with homogenous BOM.',
      'Review bifacial gain assumptions vs. albedo.',
      'Confirm connector vendor with junction box torque specs.'
    ],
    applicationDetails: [
      'Ground-mount solar farms.',
      'Large flat commercial roofs with structural sign-off.',
      'Download sheet for STC and NOCT parameters.'
    ],
    datasheetPath: '/product-datasheets/bimax-580-590.pdf',
    indicativeUnitPrice: 185
  },
  {
    id: 'bimax-605-635',
    catalogSection: 'modules',
    name: 'BiMAX 5N TOPCon — 605–635 W bifacial dual-glass',
    category: 'Solar module',
    imageCaption: 'BiMAX TOPCon bifacial',
    shortDescription:
      'TOPCon bifacial dual-glass module for premium yield programs targeting 605–635 W nameplate classes.',
    overview:
      'Designed for projects where LCOE benefits from higher wattage per tracker and durable glass-glass construction.',
    specs: [
      ['Technology', 'TOPCon'],
      ['Power class', '605–635 W'],
      ['Construction', 'Bifacial dual-glass'],
      ['Cells', '156 half-cut (per datasheet)']
    ],
    featureDetails: [
      'Strong candidate for hot climates with low degradation expectations.',
      'Account for higher weight in structural calculations.',
      'Use compatible clamps and torque sequences.'
    ],
    applicationDetails: [
      'Utility plants chasing kWh/kWp.',
      'Carport systems needing robust glass durability.',
      'Review warranty tiers with manufacturer.'
    ],
    datasheetPath: '/product-datasheets/bimax-605-635.pdf',
    indicativeUnitPrice: 210
  },
  {
    id: 'himax-675-700',
    catalogSection: 'modules',
    name: 'HiMAX6 — 675–700 W monofacial module (132 cells)',
    category: 'Solar module',
    imageCaption: 'HiMAX6 ultra-high watt',
    shortDescription:
      'Ultra-high watt class module for projects minimizing module count and BOS costs.',
    overview:
      'HiMAX6 appeals to EPCs optimizing cable runs and mounting hardware when logistics can accept larger formats.',
    specs: [
      ['Series', 'HiMAX6'],
      ['Power class', '675–700 W'],
      ['Cell count', '132 half-cells'],
      ['Face type', 'Monofacial (per datasheet)']
    ],
    featureDetails: [
      'Reduces land coverage for same DC MW.',
      'Verify crane/lifting ergonomics for rooftop crews.',
      'Confirm inverter MPPT voltage windows vs. cold Voc.'
    ],
    applicationDetails: [
      'Mega-roofs with uniform tilt.',
      'Large sheds and hangars.',
      'Coordinate flash-test sampling with QA plans.'
    ],
    datasheetPath: '/product-datasheets/himax-675-700.pdf',
    indicativeUnitPrice: 235
  }
];

/** Public alias — same array reference as `PRODUCT_CATALOG_ITEMS`. */
export const PRODUCTS = PRODUCT_CATALOG_ITEMS;

/** Single lookup path for chat / quotes — uses `PRODUCT_CATALOG_ITEMS` only (no `PRODUCTS` identifier inside). */
export function lookupCatalogProduct(id) {
  if (id == null || id === '') return null;
  return PRODUCT_CATALOG_ITEMS.find((x) => x.id === id) ?? null;
}

/** Full product blurb for chat / email appendix (kept next to `PRODUCTS`). */
export function formatProductForChat(p) {
  const specLines = p.specs.map(([k, v]) => `• ${k}: ${v}`).join('\n');
  return `${p.name}\nCategory: ${p.category}\n\n${p.overview}\n\nKey specs:\n${specLines}\n\nApplications:\n${p.applicationDetails.map((t) => `• ${t}`).join('\n')}`;
}

export const CATALOG_SECTIONS = [
  { id: 'storage', title: 'Energy storage' },
  { id: 'hespsp', title: 'SRNE HESP — hybrid inverters' },
  { id: 'utility', title: 'Three-phase, IESP & power systems' },
  { id: 'sun', title: 'SUN series inverters' },
  { id: 'modules', title: 'Solar modules (PV)' }
];
