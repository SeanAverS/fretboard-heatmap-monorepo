import { BottomMenuLabels } from '../src/BottomMenuLabels';

describe('BottomMenuLabels', () => {
  it('appends m when minor scale is selected', () => {
    expect(BottomMenuLabels.getLabels('A', 'scales', 'minor-scale')).toBe('Am');
    expect(BottomMenuLabels.getLabels('B', 'scales', 'minor-scale')).toBe('Bm');
  });

  it('appends m when minor chord is selected', () => {
    expect(BottomMenuLabels.getLabels('E', 'chords', 'minor-chord')).toBe('Em');
  });

  it('does not append m when major scale is selected', () => {
    expect(BottomMenuLabels.getLabels('A', 'scales', 'major-scale')).toBe('A');
    expect(BottomMenuLabels.getLabels('B', 'scales', 'major-scale')).toBe('B');
  });

  it('does not append m when major chord is selected', () => {
    expect(BottomMenuLabels.getLabels('G', 'chords', 'major-chord')).toBe('G');
  });

  it('does not append m when topMenu is null', () => {
    expect(BottomMenuLabels.getLabels('A', null, 'minor-scale')).toBe('A');
  });
});
