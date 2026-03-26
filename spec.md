# SkillPath - Career Guidance

## Current State
New project. Only scaffold files exist (empty Motoko actor, no frontend components).

## Requested Changes (Diff)

### Add
- Student profile: name, education level, list of current skills
- Skill input system (searchable/tag-based)
- Job listings (seeded data) with required skills and match percentage calculation
- Job match engine: compare student skills against job requirements, compute match %
- Skill gap analysis: identify missing skills per job
- Learning roadmap: for each missing skill, show suggested courses/resources
- Dashboard showing matched jobs sorted by match %, with roadmap links
- Onboarding flow: student enters their skills, gets redirected to dashboard

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: student profiles (store skills), job listings (seeded), match calculation, skill gap + roadmap data
2. Frontend: landing page, skill assessment onboarding, job matches dashboard, roadmap detail page
3. No auth required — use anonymous session keyed on Principal
