# Beam.ng-Stance-tool — 

A browser-only tool that edits BeamNG.drive vehicle mod archives (.zip with .jbeam files) to scale suspension geometry (camber, ride height, track width, toe). This repository contains the transformation logic, tests, and docs.

Important: always operate on copies of mods. This tool is community-made and not endorsed by BeamNG. Use at your own risk.

Quick start (local):
1. Serve the project folder over HTTP (recommended):
   python -m http.server 8000
2. Open the HTML page in a browser:
   beamng_stance_tool.html
Run tests:
- Node.js v16+ required
- npm install
- npm test
