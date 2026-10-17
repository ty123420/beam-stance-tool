Beam Stance Tool is a beamng-suspension-modifier
it Modifies, scale, and optimize vehicle suspension geometry, camber, toe, track width, and ride height in BeamNG.drive vehicle mods (.zip archives containing .jbeam files) using an interactive web application and JBeam parsing tools. Use when the user asks to modify BeamNG vehicle mods, adjust suspension stance, scale camber/ride height, or update JBeam files.

this is the unedited max values <img width="715" height="450" alt="useme2" src="https://github.com/user-attachments/assets/40a4d4d2-0076-40f7-a328-be95efcf6965" />
this is edited values keeping it a bit moderate <img width="1084" height="574" alt="useme3" src="https://github.com/user-attachments/assets/b296cf65-693c-4288-8bdf-5a23f339d419" />
<img width="1257" height="863" alt="useme1" src="https://github.com/user-attachments/assets/7e13985f-7e86-4807-b39d-df6909eefb97" />

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


