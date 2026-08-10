import { PortfolioData } from '../types/portfolio';

// SVG Placeholder Data URLs for clean, self-contained rendering
const PLACEHOLDER_PORTRAIT = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
const PLACEHOLDER_PROJECT_MAP = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000";
const PLACEHOLDER_PROJECT_PLANNING = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000";
const PLACEHOLDER_PROJECT_RESEARCH = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000";
const PLACEHOLDER_CERTIFICATE = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800";
const PLACEHOLDER_CV_PREVIEW = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800";

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: "ANNISA NUR PRABAWA",
    professionalField: {
      id: "Perencanaan Tata Ruang dan Pertanahan",
      en: "Spatial Planning and Land Administration"
    },
    shortIntro: {
      id: "Berfokus pada perencanaan tata ruang, analisis spasial, dan administrasi pertanahan dengan ketertarikan pada pengolahan data spasial dan pengembangan kawasan.",
      en: "Focused on spatial planning, spatial analysis, and land administration, with an interest in spatial data processing and area development."
    },
    education: {
      id: "Perencanaan Wilayah & Kota / Spasial",
      en: "Urban & Regional Planning / Spatial"
    },
    careerInterest: {
      id: "Fokus dan minat karir profesional dalam analisis spasial, perencanaan wilayah, dan administrasi pertanahan.",
      en: "Career interests in spatial analytics, regional planning, and land administration policy."
    },
    location: {
      id: "Indonesia",
      en: "Indonesia"
    },
    portraitUrl: PLACEHOLDER_PORTRAIT,
    portraitAlt: {
      id: "Potret Profesional Annisa Nur Prabawa",
      en: "Annisa Nur Prabawa Professional Portrait"
    }
  },

  selectedWork: [
    {
      id: "selected-work-1",
      title: {
        id: "Karya Pilihan 01: Judul Proyek Perencanaan Spasial",
        en: "Selected Work 01: Spatial Planning Project Title"
      },
      shortDescription: {
        id: "Deskripsi singkat mengenai proyek perencanaan tata ruang, metodologi spasial, dan luaran analisis.",
        en: "Brief overview of spatial planning project, spatial methodology, and analytical outcomes."
      },
      fullDescription: {
        id: "Deskripsi komprehensif proyek mencakup analisis zonasi wilayah, kesesuaian lahan, dan dokumen perencanaan tata ruang pertanahan.",
        en: "Comprehensive project description covering regional zoning analysis, land suitability, and spatial planning documentation."
      },
      category: {
        id: "Perencanaan Tata Ruang",
        en: "Spatial Planning"
      },
      coverImage: PLACEHOLDER_PROJECT_PLANNING,
      galleryImages: [
        PLACEHOLDER_PROJECT_PLANNING,
        PLACEHOLDER_PROJECT_MAP
      ],
      tools: ["ArcGIS", "QGIS", "AutoCAD", "Spatial Analysis"],
      year: "2024",
      role: {
        id: "Perencana Spasial / Analis",
        en: "Spatial Planner / Analyst"
      },
      order: 1,
      featured: true,
      visible: true
    },
    {
      id: "selected-work-2",
      title: {
        id: "Karya Pilihan 02: Analisis Pertanahan & Pemetaan",
        en: "Selected Work 02: Land Administration & Mapping"
      },
      shortDescription: {
        id: "Dokumentasi peta tematik dan analisis penguasaan tanah berbasis sistem informasi geografis.",
        en: "Thematic mapping documentation and GIS-based land tenure spatial analysis."
      },
      fullDescription: {
        id: "Proyek pemetaan tematik pertanahan, verifikasi batas persil, dan pengelolaan basis data geospasial.",
        en: "Land thematic mapping project, parcel boundary verification, and geospatial database management."
      },
      category: {
        id: "Administrasi Pertanahan",
        en: "Land Administration"
      },
      coverImage: PLACEHOLDER_PROJECT_MAP,
      galleryImages: [
        PLACEHOLDER_PROJECT_MAP,
        PLACEHOLDER_PROJECT_RESEARCH
      ],
      tools: ["QGIS", "Google Earth Engine", "PostGIS", "Land Registry Tools"],
      year: "2024",
      role: {
        id: "Analis Pertanahan",
        en: "Land Analyst"
      },
      order: 2,
      featured: true,
      visible: true
    },
    {
      id: "selected-work-3",
      title: {
        id: "Karya Pilihan 03: Studi Riset Kebutuhan Ruang & Kebijakan",
        en: "Selected Work 03: Spatial Need & Policy Research Study"
      },
      shortDescription: {
        id: "Kajian akademis/kebijakan mengenai dinamika pemanfaatan ruang dan arahan struktur wilayah.",
        en: "Academic/policy research on spatial utilization dynamics and regional structural directives."
      },
      fullDescription: {
        id: "Kajian tata ruang mendalam mencakup pemodelan spasial, daya dukung lingkungan, dan evaluasi rencana tata ruang wilayah.",
        en: "In-depth spatial research encompassing spatial modeling, environmental carrying capacity, and spatial plan evaluation."
      },
      category: {
        id: "Riset & Kebijakan Spasial",
        en: "Spatial Research & Policy"
      },
      coverImage: PLACEHOLDER_PROJECT_RESEARCH,
      galleryImages: [
        PLACEHOLDER_PROJECT_RESEARCH,
        PLACEHOLDER_PROJECT_PLANNING
      ],
      tools: ["R / Python", "Spatial Econometrics", "NVivo", "GIS"],
      year: "2023",
      role: {
        id: "Peneliti Utama",
        en: "Lead Researcher"
      },
      order: 3,
      featured: true,
      visible: true
    }
  ],

  skills: [
    // Spatial & Planning
    {
      id: "skill-1",
      name: "Spatial Planning & Zoning Analysis",
      category: "spatial_planning",
      categoryLabel: {
        id: "SPASIAL & PERENCANAAN",
        en: "SPATIAL & PLANNING"
      },
      featured: true,
      order: 1,
      visible: true,
      description: {
        id: "Analisis struktur dan pola ruang, peraturan zonasi, serta evaluasi rencana tata ruang wilayah.",
        en: "Structural and spatial pattern analysis, zoning regulations, and regional plan evaluation."
      }
    },
    {
      id: "skill-2",
      name: "Land Tenure & Parcel Administration",
      category: "spatial_planning",
      categoryLabel: {
        id: "SPASIAL & PERENCANAAN",
        en: "SPATIAL & PLANNING"
      },
      featured: true,
      order: 2,
      visible: true,
      description: {
        id: "Pengelolaan data administrasi pertanahan, pendaftaran tanah, dan analisis kepemilikan persil.",
        en: "Land administration data management, land registration, and parcel tenure analytics."
      }
    },
    {
      id: "skill-3",
      name: "Land Suitability & Capability Assessment",
      category: "spatial_planning",
      categoryLabel: {
        id: "SPASIAL & PERENCANAAN",
        en: "SPATIAL & PLANNING"
      },
      featured: true,
      order: 3,
      visible: true,
      description: {
        id: "Evaluasi kesesuaian lahan spasial untuk pengembangan kawasan dan tata guna tanah.",
        en: "Land capability evaluation for regional development and spatial land use."
      }
    },
    {
      id: "skill-4",
      name: "GIS Mapping & Geospatial Database",
      category: "technical_design",
      categoryLabel: {
        id: "TEKNIK & DESAIN",
        en: "TECHNICAL & DESIGN"
      },
      featured: true,
      order: 4,
      visible: true,
      description: {
        id: "Pembuatan peta tematik profesional, pengolahan geodatabase, dan kartografi digital.",
        en: "Professional thematic map creation, geodatabase management, and digital cartography."
      }
    },
    {
      id: "skill-5",
      name: "ArcGIS Pro & QGIS Suite",
      category: "technical_design",
      categoryLabel: {
        id: "TEKNIK & DESAIN",
        en: "TECHNICAL & DESIGN"
      },
      featured: true,
      order: 5,
      visible: true,
      description: {
        id: "Penguasaan software SIG utama untuk pemrosesan data raster dan vektor.",
        en: "Proficiency in leading GIS software for vector and raster geospatial analysis."
      }
    },
    {
      id: "skill-6",
      name: "Remote Sensing & Satellite Image Interpretation",
      category: "technical_design",
      categoryLabel: {
        id: "TEKNIK & DESAIN",
        en: "TECHNICAL & DESIGN"
      },
      featured: false,
      order: 6,
      visible: true,
      description: {
        id: "Penginderaan jauh dan klasifikasi citra satelit untuk pemantauan tutupan lahan.",
        en: "Remote sensing and satellite image classification for land cover monitoring."
      }
    },
    {
      id: "skill-7",
      name: "Technical Report Writing & Policy Documentation",
      category: "productivity",
      categoryLabel: {
        id: "PRODUKTIVITAS & KELOLA",
        en: "PRODUCTIVITY & DOCS"
      },
      featured: true,
      order: 7,
      visible: true,
      description: {
        id: "Penyusunan dokumen teknis tata ruang, laporan analisis, dan naskah akademik.",
        en: "Preparation of technical spatial planning documents, analytical reports, and policy briefs."
      }
    },
    {
      id: "skill-8",
      name: "Data Analytics & Spatial Statistics",
      category: "productivity",
      categoryLabel: {
        id: "PRODUKTIVITAS & KELOLA",
        en: "PRODUCTIVITY & DOCS"
      },
      featured: false,
      order: 8,
      visible: true,
      description: {
        id: "Pengolahan data spasial numerik dan statistik deskriptif wilayah.",
        en: "Processing numerical spatial data and regional descriptive statistics."
      }
    },
    {
      id: "skill-9",
      name: "Public Speaking & Stakeholder Presentation",
      category: "other",
      categoryLabel: {
        id: "LAINNYA",
        en: "OTHER"
      },
      featured: false,
      order: 9,
      visible: true,
      description: {
        id: "Presentasi materi tata ruang dan koordinasi komunikasi dengan pemangku kepentingan.",
        en: "Presentation of spatial planning topics and stakeholder communication."
      }
    }
  ],

  projects: [
    {
      id: "project-1",
      title: {
        id: "Peta Tematik Kesesuaian Lahan dan Tata Guna Tanah",
        en: "Thematic Map of Land Suitability and Land Use"
      },
      description: {
        id: "Proyek pemetaan tematik spasial untuk identifikasi zonasi potensi pengembangan kawasan.",
        en: "Spatial thematic mapping project identifying potential zoning for regional development."
      },
      fullDetails: {
        id: "Proyek pemetaan spasial ini memvisualisasikan analisis overlay tutupan lahan, kemiringan lereng, dan keterjangkauan infrastruktur.",
        en: "This spatial mapping project visualizes overlay analysis of land cover, slope, and infrastructure accessibility."
      },
      category: "maps",
      categoryLabel: {
        id: "PETA",
        en: "MAPS"
      },
      coverImage: PLACEHOLDER_PROJECT_MAP,
      imageGallery: [
        PLACEHOLDER_PROJECT_MAP,
        PLACEHOLDER_PROJECT_PLANNING
      ],
      tools: ["ArcGIS Pro", "QGIS", "Cartography"],
      year: "2024",
      role: {
        id: "Penyusun Peta",
        en: "Cartographer / Analyst"
      },
      order: 1,
      featured: true,
      visible: true
    },
    {
      id: "project-2",
      title: {
        id: "Rencana Detail Tata Ruang (RDTR) Kawasan Strategis",
        en: "Detailed Spatial Plan (RDTR) for Strategic Zone"
      },
      description: {
        id: "Penyusunan peta zonasi dan ketentuan kegiatan pemanfaatan ruang (ITBX).",
        en: "Preparation of zoning maps and spatial activity directives."
      },
      fullDetails: {
        id: "Dokumen perencanaan tata ruang skala detail mencakup peta struktur ruang, pola ruang, dan intensitas pemanfaatan ruang.",
        en: "Detailed spatial planning document comprising spatial structure maps, spatial pattern, and building intensity standards."
      },
      category: "planning",
      categoryLabel: {
        id: "PERENCANAAN",
        en: "PLANNING"
      },
      coverImage: PLACEHOLDER_PROJECT_PLANNING,
      imageGallery: [
        PLACEHOLDER_PROJECT_PLANNING,
        PLACEHOLDER_PROJECT_MAP
      ],
      tools: ["AutoCAD Map", "ArcGIS", "Zoning Specs"],
      year: "2024",
      role: {
        id: "Tim Tata Ruang",
        en: "Spatial Planning Team Member"
      },
      order: 2,
      featured: true,
      visible: true
    },
    {
      id: "project-3",
      title: {
        id: "Kajian Akademis Dinamika Alih Fungsi Lahan Pertanian",
        en: "Academic Study on Agricultural Land Conversion Dynamics"
      },
      description: {
        id: "Riset evaluasi perubahan penggunaan lahan pertanian menjadi kawasan permukiman.",
        en: "Research evaluating land-use conversion from agricultural land to residential settlement."
      },
      fullDetails: {
        id: "Riset spasial mengukur laju alih fungsi lahan serta implikasinya terhadap ketersediaan cadangan pangan wilayah.",
        en: "Spatial research quantifying land conversion rates and implications for regional food supply resilience."
      },
      category: "research",
      categoryLabel: {
        id: "RISET",
        en: "RESEARCH"
      },
      coverImage: PLACEHOLDER_PROJECT_RESEARCH,
      imageGallery: [
        PLACEHOLDER_PROJECT_RESEARCH,
        PLACEHOLDER_PROJECT_MAP
      ],
      tools: ["QGIS", "Statistical Analysis", "Geo-Processing"],
      year: "2023",
      role: {
        id: "Peneliti Spasial",
        en: "Spatial Researcher"
      },
      order: 3,
      featured: true,
      visible: true
    },
    {
      id: "project-4",
      title: {
        id: "Digitalisasi & Manajemen Geodatabase Batas Persil",
        en: "Parcel Boundary Geodatabase Digitalization & Management"
      },
      description: {
        id: "Pengolahan data spasial persil pertanahan dan integrasi informasi geospasial.",
        en: "Processing land parcel spatial data and geospatial information integration."
      },
      fullDetails: {
        id: "Pengembangan geodatabase pertanahan yang rapi dan terstruktur untuk mendukung verifikasi hak atas tanah.",
        en: "Development of a structured land geodatabase to support tenure rights verification."
      },
      category: "other",
      categoryLabel: {
        id: "LAINNYA",
        en: "OTHER"
      },
      coverImage: PLACEHOLDER_PROJECT_MAP,
      imageGallery: [
        PLACEHOLDER_PROJECT_MAP
      ],
      tools: ["PostGIS", "QGIS", "Data Entry"],
      year: "2023",
      role: {
        id: "Analis Data Geospasial",
        en: "Geospatial Data Analyst"
      },
      order: 4,
      featured: false,
      visible: true
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: {
        id: "Praktisi Muda Perencanaan Tata Ruang",
        en: "Junior Spatial Planning Practitioner"
      },
      organization: {
        id: "Dinas Pekerjaan Umum dan Tata Ruang",
        en: "Spatial Planning & Public Works Agency"
      },
      period: {
        id: "2023 - Sekarang",
        en: "2023 - Present"
      },
      type: "work",
      typeLabel: {
        id: "Pengalaman Kerja",
        en: "Work Experience"
      },
      description: {
        id: "Rincian tugas, tanggung jawab, dan pencapaian profesional dalam posisi ini akan ditambahkan di sini.",
        en: "Details of duties, responsibilities, and professional contributions for this role will be added here."
      },
      bullets: {
        id: [
          "Melakukan analisis spasial dan penyusunan dokumen perencanaan tata ruang.",
          "Menyiapkan peta tematik dan pengelolaan basis data geospasial.",
          "Berkordinasi dengan tim teknis dan pemangku kepentingan terkait."
        ],
        en: [
          "Conducting spatial analysis and preparing spatial planning documentation.",
          "Creating thematic maps and managing geospatial databases.",
          "Coordinating with technical teams and relevant stakeholders."
        ]
      },
      location: {
        id: "Indonesia",
        en: "Indonesia"
      },
      order: 1,
      visible: true
    },
    {
      id: "exp-2",
      role: {
        id: "Mahasiswa Magang Perencanaan Wilayah",
        en: "Urban & Regional Planning Intern"
      },
      organization: {
        id: "Kantor Pertanahan Kabupaten",
        en: "District Land Administration Office"
      },
      period: {
        id: "2023",
        en: "2023"
      },
      type: "internship",
      typeLabel: {
        id: "Magang",
        en: "Internship"
      },
      description: {
        id: "Pengalaman magang profesional di bidang perencanaan tata ruang dan administrasi pertanahan.",
        en: "Professional internship experience in spatial planning and land administration."
      },
      bullets: {
        id: [
          "Membantu proses pemetaan tematik dan verifikasi data pertanahan.",
          "Menyusun laporan hasil evaluasi penggunaan tanah lokasi studi."
        ],
        en: [
          "Assisted in thematic mapping and land data verification.",
          "Prepared evaluation reports on study area land utilization."
        ]
      },
      location: {
        id: "Indonesia",
        en: "Indonesia"
      },
      order: 2,
      visible: true
    },
    {
      id: "exp-3",
      role: {
        id: "Koordinator Divisi Pengabdian Masyarakat",
        en: "Community Development Division Coordinator"
      },
      organization: {
        id: "Himpunan Mahasiswa Planologi & KKN Tematik",
        en: "Planology Student Association & Thematic KKN"
      },
      period: {
        id: "2022 - 2023",
        en: "2022 - 2023"
      },
      type: "organization",
      typeLabel: {
        id: "Organisasi & Kegiatan",
        en: "Organization & Field Work"
      },
      description: {
        id: "Pengalaman kepemimpinan, kepanitiaan, atau Kuliah Kerja Nyata (KKN) bidang pemetaan wilayah.",
        en: "Leadership, committee, or community field project (KKN) experience in spatial mapping."
      },
      bullets: {
        id: [
          "Mengordinasikan program kerja pengabdian masyarakat berbasis pemetaan desa.",
          "Menyelenggarakan kegiatan sosialisasi tata ruang dan lingkungan."
        ],
        en: [
          "Coordinated community outreach programs based on village spatial mapping.",
          "Organized spatial planning and environmental awareness sessions."
        ]
      },
      location: {
        id: "Indonesia",
        en: "Indonesia"
      },
      order: 3,
      visible: true
    }
  ],

  certificates: [
    {
      id: "cert-1",
      title: {
        id: "Sertifikat Pelatihan Sistem Informasi Geografis (SIG) Lanjut",
        en: "Advanced GIS Systems & Spatial Analytics Certificate"
      },
      issuer: {
        id: "ESRI Indonesia / Pusdiklat BIG",
        en: "ESRI Indonesia / BIG Training Center"
      },
      year: "2024",
      category: {
        id: "Keahlian Spasial",
        en: "Spatial Analytics"
      },
      imageUrl: PLACEHOLDER_CERTIFICATE,
      credentialUrl: "#",
      order: 1,
      visible: true
    },
    {
      id: "cert-2",
      title: {
        id: "Sertifikat Kompetensi Perencanaan Tata Ruang & Pertanahan",
        en: "Spatial Planning & Land Administration Competency Certificate"
      },
      issuer: {
        id: "Lembaga Sertifikasi Profesi Perencanaan Wilayah dan Kota",
        en: "Urban and Regional Planning Professional Certification Body"
      },
      year: "2023",
      category: {
        id: "Sertifikasi Profesi",
        en: "Professional Credential"
      },
      imageUrl: PLACEHOLDER_CERTIFICATE,
      credentialUrl: "#",
      order: 2,
      visible: true
    }
  ],

  cv: {
    previewImageUrl: PLACEHOLDER_CV_PREVIEW,
    fileUrl: "#",
    updatedDate: "2024",
    summary: {
      id: "Ringkasan Kurikulum Vitae profesional Annisa Nur Prabawa yang memuat riwayat pendidikan, keahlian utama, serta pengalaman di bidang Perencanaan Tata Ruang dan Pertanahan.",
      en: "Curriculum Vitae summary of Annisa Nur Prabawa detailing educational background, core skill set, and project experience in Spatial Planning and Land Administration."
    }
  },

  contact: {
    email: "annisa.prabawa@example.com",
    linkedin: "https://linkedin.com/in/annisanurprabawa-placeholder",
    phone: "+62 812-XXXX-XXXX",
    location: {
      id: "Indonesia",
      en: "Indonesia"
    },
    availabilityStatus: {
      id: "Terbuka untuk Peluang Profesional & Kolaborasi",
      en: "Open for Professional Opportunities & Collaboration"
    }
  },

  siteSettings: {
    title: "ANNISA NUR PRABAWA",
    brandSettings: {
      brandText: "ANP",
      portfolioLabel: {
        id: "PORTOFOLIO",
        en: "PORTFOLIO"
      },
      showIcon: true
    },
    footerText: {
      id: "Perencanaan Tata Ruang dan Pertanahan",
      en: "Spatial Planning and Land Administration"
    }
  }
};
