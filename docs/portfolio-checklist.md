# Portfolio Site Checklist

Static site for GitHub Pages (no login, no database). All projects come from `projects.json`. Rules: no full source code, no student ID anywhere, videos are YouTube embeds.

## Phase 1: Home page basics
- [x] Choose site name, tagline and short intro
- [x] Create GitHub repo and enable GitHub Pages
- [x] Page skeleton: nav bar, footer, responsive layout
- [x] Colour and font tokens in one place (for the later theme pass)
- [x] Hero / intro section
- [x] Featured projects row (from `featured: true`)
- [x] Full project grid built from `projects.json`, with filter by type/tag
- [x] About section (education, skills, languages and tools)
- [x] CV link (optional)

## Phase 2: Shared template and data
- [ ] You fill in `projects.json` (links, images, thumbnails, what I learned)
- [ ] One project page template that reads a project by id
- [ ] Optional sections hidden when empty: summary, features, tech tags, YouTube embed, screenshots, write-up link, what I learned
- [ ] Reduced-motion and keyboard basics built in
- [ ] "Add a new project" steps written down (one JSON entry plus images)

## Phase 3: Content, one checklist per project
Each project: [ ] confirm summary and dates  [ ] pick screenshots/diagrams  [ ] YouTube link  [ ] key features  [ ] "what I learned"  [ ] remove IDs/code  [ ] thumbnail

### Featured
**Sign Finder (final year project)**
- [ ] Problem and audience (drivers, learners)
- [ ] Dataset story: merged public sets plus own LabelImg annotations
- [ ] Model comparison (YOLOv2, MobileNet, YOLOv5) and result (up to 96%)
- [ ] App screens: photo scan, live scan, sign info, settings
- [ ] Limitations (far signs) and future work
- [ ] Demo video; report as write-up summary, not the full PDF

**Sudoku Solver**
- [ ] Explain propagation then backtracking in plain language
- [ ] Timing table from README
- [ ] Short code snippet only (the key idea), plus screenshot of the app

**Theatre Booking System (C++)**
- [ ] Class design (Ticket, Person, Row, Auditorium)
- [ ] Menu screenshot, Catch tests
- [ ] Note it began as the 2022 Java version

**iOS Weather App**
- [ ] Screens: current, hourly, daily, map, visited places
- [ ] Highlight your own enhancements (tap to recentre, swipe to refresh)
- [ ] Demo video if available

### AI and data
- [ ] Applied AI RNN: data pipeline, model, 85.3% accuracy, confusion matrix, video
- [ ] Robotics Q-learning: reward design, learning curve, random-environment tests
- [ ] R coursework: forecasting approach, clustering method, key plots

### Systems, backend, other
- [ ] Health System API: endpoints overview, demo video
- [ ] OOP shopping manager: UML diagrams, test plan, YouTube demo
- [ ] Database: ER diagram, design decisions
- [ ] Cyber security: methodology only, no sensitive targets or credentials
- [ ] Python grade progression (early work)
- [ ] Java theatre booking (early work)

I will review each project's files when we reach it and suggest the highlights worth showing.

## Phase 4: Styling and themes
- [ ] Define themes: `apple`, `ai-graph`, `terminal`
- [ ] Apple: device/monitor frame for screenshots, system fonts, rounded frosted cards (no Apple logos or artwork)
- [ ] AI graph: dark background, node-and-edge pattern, charts as hero
- [ ] Terminal/blueprint: monospace type, diagrams up front
- [ ] Apply theme per project (one by one, Sign Finder gets the full showcase)
- [ ] Check contrast and reduced-motion for every theme

## Phase 5: Polish and launch
- [ ] Phone, tablet and desktop checks
- [ ] Accessibility pass (alt text, headings, focus)
- [ ] Page titles, descriptions and social preview image
- [ ] Check all links and videos
- [ ] Final read for IDs, code and private info
- [ ] Publish on GitHub Pages
