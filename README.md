# BeamStance — BeamNG Adaptive Suspension Modifier

A small, client-side web tool for quickly "slamming" and adjusting suspension geometry in BeamNG.drive vehicle mods (.zip archives with .jbeam files). Drag & drop a vehicle archive, tweak sliders (camber, ride height, track width, toe) and download a repacked mod — no manual unpacking or editing of JBeam/Lua required.

Status: Beta — works in modern desktop browsers. See SECURITY and LIMITATIONS below before using on important mods.

---

## Quick features
- Browser-only: all processing happens client-side (no file uploads).
- Interactive sliders for:
  - Negative camber scaling
  - Ride height lowering
  - Track width expansion
  - Front/rear toe scaling and bias
- Live wheel geometry preview (camber & toe)
- Per-archive queue and downloadable repacked .zip
- Basic JBeam diff inspector showing modified variables

---

## Demo / Screenshots
Open the app file in a browser:
- File: `beam_stance.html/beamng_stance_tool.html`

Serve locally:
```bash
git clone https://github.com/ty123420/beam-stance-tool.git
cd beam-stance-tool
python -m http.server 8000
# Open http://localhost:8000/beam_stance.html/beamng_stance_tool.html
```

Or enable GitHub Pages on the `main`/default branch to host it as a demo.

---

## How to use
1. Open the HTML page in a modern desktop browser (Chrome, Edge, Firefox, Safari).
2. Drag & drop one or more BeamNG vehicle `.zip` archives to the "Drag & Drop Vehicle .ZIP Mods" area (or click to browse).
3. Select an archive from the queue to preview its thumbnail and current JBeam diff.
4. Adjust the sliders to taste:
   - "Negative Camber Scaling" multiplies the neg camber range.
   - "Ride Height Lowering Range" extends how far the car can be lowered.
   - "Track Width Expansion" increases min/max track width.
   - "Toe" sliders scale toe range and allow a small front bias.
5. Click "Apply Smart Suspension Scaling" to process all queued archives.
6. Download the modified archive from the queue (a `scaled_<original>.zip` link appears).

---

## Supported inputs / limitations
- Input: ZIP archives that contain `.jbeam` files.
- The app uses a best-effort regex-based JBeam matcher. It handles common array formats but may not recognize all valid JBeam file layouts, comments, or custom formatting.
- It intentionally skips variables that include `rally`, `offroad`, or `drifter` in their names to avoid changing specialized setups.
- Because processing is done in the main thread, very large archives may freeze the UI. Consider using small test archives first.

If your mod has a non-standard structure, the tool may not find the suspension files or could miss variables. Always keep a backup of the original mod.

---

## Safety & privacy
- All file processing is done in your browser — files are not uploaded to any server.
- Still: always work with a copy of your `.zip` mod. Do not use on mods you cannot restore.
- The app currently uses third-party CDNs (Tailwind, Font Awesome, JSZip). For production/public hosting, consider bundling or adding SRI hashes / a Content Security Policy.

---

## Development & testing
Recommended development workflow:
- Extract the logic from the HTML into a small JS module so it can be unit-tested.
- Add a small test suite with a few representative `.jbeam` snippets (baseline vs expected scaled output).
- Move heavy processing to a Web Worker to avoid UI blocking.

Suggested scripts (example):
```bash
# serve locally
python -m http.server 8000

# lint / format (if you convert to separate JS files)
npm init -y
npm install --save-dev eslint jest
```

---

## Contributing
Contributions welcome — please open issues or PRs. When opening PRs:
- Add unit tests for any change to the JBeam parsing/transform logic.
- Keep changes small and focused; prefer extracting pure functions (parse → transform → stringify).

Add a `CONTRIBUTING.md` for back-and-forth contribution guidance.

---

## Known issues & roadmap
- Parsing: the current regex is brittle — planned: a small parser that tolerates comments, variation in array formatting, and nonstandard whitespace.
- Performance: shift processing into a Web Worker; add progress indicators for large archives.
- UX: provide preview/restore option, and better error messages when parsing fails.

---

## License
This project is licensed under the MIT License — see `LICENSE`.

---

## Credits
- Built by: ty123420
- Uses: [JSZip](https://stuk.github.io/jszip/), Tailwind CSS, Font Awesome

---

## Contact / Support
Raise issues on this repository or email the maintainer listed in the repo profile.
