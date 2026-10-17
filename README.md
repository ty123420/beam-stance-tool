Beam Stance Tool is a beamng-suspension-modifier
it Modifies, scale, and optimize vehicle suspension geometry, camber, toe, track width, and ride height in BeamNG.drive vehicle mods (.zip archives containing .jbeam files) using an interactive web application and JBeam parsing tools. Use when the user asks to modify BeamNG vehicle mods, adjust suspension stance, scale camber/ride height, or update JBeam files.

*****Instructions
drag and drop vehicle zips that you want to slam/stance apply scaling and add the mod.
now you dont have to mess with unpacking and messing with tricky .lua files

how it works
Modifying BeamNG.drive vehicle mods (.zip files).
Adjusting suspension geometry (negative camber, ride height lowering, track width expansion, front/rear toe alignment).
Parsing and updating JBeam configuration variables proportionally without shifting baseline spawn positions.
Inspecting live JBeam variable diffs and packaging modified vehicle archives.
Core Capabilities
Interactive Web Application (beamng_adaptive_suspension_modifier_web_app.html): Provides a full-featured graphical interface with drag-and-drop archive loading, slider controls for suspension scaling, live front/top-down canvas simulation, and live JBeam diff inspection.
JBeam Geometry Scaling Engine: Automatically detects suspension variables in .jbeam files ($camber, $rideheight, $trackwidth, $toe) and scales their bounds proportionally based on user multipliers.
Archive Packaging: Re-packs modified files into exportable .zip mods ready for BeamNG.drive.
Guidelines
Always ensure input files are valid .zip archives containing .jbeam suspension configuration files.
Validate JBeam variable patterns before applying scaling multipliers. And always make a copy of the zip you want to edit so you can alwasy have the original.


