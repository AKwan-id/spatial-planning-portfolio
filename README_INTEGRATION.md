# Integration & Developer Documentation

## Annisa Nur Prabawa — Professional Portfolio
**Field:** Spatial Planning and Land Administration (*Perencanaan Tata Ruang dan Pertanahan*)

---

## 1. Project Overview & Architecture

This application provides the **UI Layer** for Annisa Nur Prabawa's professional portfolio. It is designed to sit directly above an external full-screen scroll-controlled cinematic aerial landscape engine in Anti-gravity.

### Key Architectural Highlights:
- **Transparent Background Layer**: Body and section backgrounds use transparent glass surfaces (`glass-surface`, `bg-transparent`) so the underlying cinematic landscape remains visible.
- **Bilingual Core (`ID` | `ENG`)**: Centralized language context (`src/context/LanguageContext.tsx`) managing complete Indonesian and English translations.
- **Strict Anti-Hallucination Data**: Uses safe, professional placeholders for unknown details.
- **Content Repository Adapter**: `src/services/portfolioRepository.ts` abstracts data fetching/saving so local storage can easily be replaced by Firestore, Cloud SQL, or API endpoints.
- **Owner Dashboard Structure**: Accessible via the UI header button or `#owner` route, isolated from the public portfolio.

---

## 2. Directory & Component Structure

```
src/
├── components/
│   ├── owner/
│   │   ├── AboutEditor.tsx             # Form editor for profile & portrait
│   │   └── OwnerDashboard.tsx          # Isolated management portal & JSON backup
│   └── public/
│       ├── AboutSection.tsx            # [id="about"] Asymmetric editorial profile
│       ├── SelectedWorkSection.tsx     # [id="selected-work"] Featured work showcase
│       ├── SkillsSection.tsx           # [id="skills"] Categorized competencies
│       ├── ProjectsSection.tsx         # [id="projects"] Filterable project gallery
│       ├── ExperienceSection.tsx       # [id="experience"] Editorial timeline
│       ├── CertificatesSection.tsx     # [id="certificates"] Credential gallery
│       ├── CvSection.tsx               # [id="cv"] Document preview & download
│       ├── ContactSection.tsx          # [id="contact"] Cinematic closing section
│       ├── Navbar.tsx                  # Floating navigation & language toggle
│       ├── ProjectDetailModal.tsx      # Modal for inspecting project details
│       ├── CertificateLightboxModal.tsx# Lightbox for certificates
│       └── CvPreviewModal.tsx          # Modal preview for CV document
├── context/
│   └── LanguageContext.tsx             # Global language & data provider
├── data/
│   └── initialPortfolioData.ts         # Centralized portfolio data model
├── services/
│   └── portfolioRepository.ts          # Storage adapter (localStorage / API)
├── types/
│   └── portfolio.ts                    # TypeScript data definitions
├── App.tsx                             # Main entry point & single-page layout
└── index.css                           # Design tokens & glassmorphic styles
```

---

## 3. Section Anchors & Integration Hooks for Cinematic Scroll Engine

Each section component renders a stable `id` and `data-section` attribute for Anti-gravity scroll triggers:

| Section Name | React Component | Section ID | `data-section` |
| :--- | :--- | :--- | :--- |
| About Me | `AboutSection.tsx` | `about` | `about` |
| Selected Work | `SelectedWorkSection.tsx` | `selected-work` | `selected-work` |
| Skills | `SkillsSection.tsx` | `skills` | `skills` |
| Projects | `ProjectsSection.tsx` | `projects` | `projects` |
| Experience | `ExperienceSection.tsx` | `experience` | `experience` |
| Certificates | `CertificatesSection.tsx` | `certificates` | `certificates` |
| CV | `CvSection.tsx` | `cv` | `cv` |
| Contact | `ContactSection.tsx` | `contact` | `contact` |

---

## 4. Design Tokens & Color System

All tokens are defined in `src/index.css` and applied via Tailwind CSS utility classes:

- **Soft Sakura**: `#F3C6D3` (Signature accent: thin borders, badges, hover indicators)
- **Muted Rose**: `#D99AAF` (Secondary accent: icons, subtitles, active states)
- **Warm Off-White**: `#FFF9F7` (Glass surface fill with opacity)
- **Soft Charcoal**: `#2D292B` (Typography & dark accent surface)
- **Warm Blush**: `#F8F1F2` (Card background & tag fill)

---

## 5. How to Customize Portfolio Content

To update Annisa's information without code modifications:
1. Open the application and click **"Kelola" / "Owner"** in the navigation bar (or visit `#owner`).
2. Update the respective fields (About, Selected Work, Skills, Projects, Experience, Certificates, CV, Contact).
3. Click **"Export Data JSON"** in the Owner Dashboard to download a backup `.json` file.
4. Alternatively, edit default values directly in `src/data/initialPortfolioData.ts`.

---

## 6. Anti-Gravity Cinematic Background Integration

To integrate the external frame sequence / cinematic background engine:
1. Ensure the cinematic background layer renders behind the `#root` container (`z-index: 0`).
2. Keep `#root` at `z-index: 10` or relative positioning.
3. Observe `data-section` attribute changes during page scroll to sync background camera movement or frame playback.
