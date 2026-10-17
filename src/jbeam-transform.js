export const JBEAM_PATTERN = /(\[\s*"(\$[^"]+)"\s*,\s*"range"\s*,\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*)([-+]?\d*\.?\d+)(\s*,\s*)([-+]?\d*\.?\d+)(\s*,\s*)([-+]?\d*\.?\d+)/g;

export function sanitizeZipRelativePath(relativePath) {
  if (typeof relativePath !== 'string') {
    return '';
  }

  const normalized = relativePath
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^\.\/+/, '');

  const parts = normalized
    .split('/')
    .filter((part) => part && part !== '.' && part !== '..');

  return parts.join('/');
}

export function shouldProcessJbeamPath(path) {
  const normalized = sanitizeZipRelativePath(path).toLowerCase();
  return (
    normalized.endsWith('.jbeam') && (
      normalized.includes('suspension') ||
      normalized.includes('steering') ||
      normalized.includes('alignment') ||
      normalized.includes('coilovers') ||
      normalized.includes('struts') ||
      normalized.includes('susp')
    )
  );
}

export function transformJbeamContent(content, options = {}) {
  const config = {
    camberMult: 3,
    heightMult: 3,
    trackMult: 2.5,
    toeFrontMult: 2.5,
    toeBias: 0,
    toeRearMult: 2.5,
    ...options,
  };

  let varsModified = 0;
  const logLines = [];

  const newContent = content.replace(JBEAM_PATTERN, (match, prefix, varName, defaultStr, sep1, minStr, sep2, maxStr) => {
    const origDefault = defaultStr;
    const origMin = minStr;
    const origMax = maxStr;

    const defaultVal = parseFloat(defaultStr);
    const minVal = parseFloat(minStr);
    const maxVal = parseFloat(maxStr);
    const varLower = (varName || '').toLowerCase();

    const isStanceVar = (
      (varLower.includes('camber') ||
      varLower.includes('rideheight') ||
      varLower.includes('height') ||
      varLower.includes('track') ||
      varLower.includes('toe')) &&
      !varLower.includes('rally') &&
      !varLower.includes('offroad') &&
      !varLower.includes('drifter')
    );

    if (!isStanceVar) {
      return match;
    }

    let newMin = minVal;
    let newMax = maxVal;
    let adjustedDefault = defaultVal;

    if (varLower.includes('camber')) {
      const negRange = defaultVal - minVal;
      newMin = defaultVal - (Math.max(negRange, 0.01) * config.camberMult);
      newMin = Math.max(newMin, -0.22);
    } else if (varLower.includes('rideheight') || varLower.includes('height')) {
      const dropRange = defaultVal - minVal;
      newMin = defaultVal - (Math.max(dropRange, 0.01) * config.heightMult);
      newMin = Math.max(newMin, -0.25);
    } else if (varLower.includes('track')) {
      const outwardRange = maxVal - defaultVal;
      const inwardRange = defaultVal - minVal;
      newMax = defaultVal + (Math.max(outwardRange, 0.01) * config.trackMult);
      newMin = defaultVal - (Math.max(inwardRange, 0.01) * config.trackMult);
    } else if (varLower.includes('toe')) {
      const isFront = /f/.test(varLower);
      const mult = isFront ? config.toeFrontMult : config.toeRearMult;

      if (isFront) {
        adjustedDefault = defaultVal + config.toeBias;
      }

      const toeRange = Math.max(Math.abs(adjustedDefault - minVal), Math.abs(maxVal - adjustedDefault), 0.005);
      newMin = adjustedDefault - (toeRange * mult);
      newMax = adjustedDefault + (toeRange * mult);
    }

    varsModified += 1;
    logLines.push(`${varName}:\n  Baseline -> default: ${origDefault}, min: ${origMin}, max: ${origMax}\n  Scaled   -> default: ${adjustedDefault.toFixed(4)}, min: ${newMin.toFixed(4)}, max: ${newMax.toFixed(4)}\n`);

    return `${prefix}${adjustedDefault.toFixed(4)}${sep1}${newMin.toFixed(4)}${sep2}${newMax.toFixed(4)}`;
  });

  return {
    content: newContent,
    varsModified,
    logLines,
  };
}
