import test from 'node:test';
import assert from 'node:assert/strict';

import {
  sanitizeZipRelativePath,
  shouldProcessJbeamPath,
  transformJbeamContent,
} from '../src/jbeam-transform.js';

test('sanitizeZipRelativePath strips traversal', () => {
  assert.equal(
    sanitizeZipRelativePath('../../evil/../vehicle/front_suspension.jbeam'),
    'evil/vehicle/front_suspension.jbeam'
  );
  assert.equal(
    sanitizeZipRelativePath('/absolute/path/vehicle.jbeam'),
    'absolute/path/vehicle.jbeam'
  );
});

test('shouldProcessJbeamPath matches suspension files', () => {
  assert.equal(shouldProcessJbeamPath('vehicles/foo/front_suspension.jbeam'), true);
  assert.equal(shouldProcessJbeamPath('luas/other.lua'), false);
  assert.equal(shouldProcessJbeamPath('README.md'), false);
});

test('transformJbeamContent scales camber and toe values', () => {
  const source = `
    [ "$camber", "range", "foo", "bar", -0.10, 0.00, 0.15 ]
    [ "$front_toe", "range", "foo", "bar", 0.01, -0.03, 0.05 ]
  `;

  const result = transformJbeamContent(source, {
    camberMult: 2,
    trackMult: 2,
    toeFrontMult: 2,
    toeBias: 0,
    toeRearMult: 2,
  });

  assert.equal(result.varsModified, 2);
  assert.match(result.content, /-0\.10/);
  assert.match(result.content, /-0\.13/);
  assert.match(result.content, /0\.01/);
  assert.ok(result.logLines.length >= 2);
});
