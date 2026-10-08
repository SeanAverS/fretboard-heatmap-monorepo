import { TopMenuKeyMatcher } from '../src/TopMenuKeyMatcher';

describe('TopMenuKeyMatcher', () => {
  it('maps major scale to major chord when switching to chords', () => {
    expect(TopMenuKeyMatcher.getMatch('major-scale', 'chords')).toBe('major-chord');
  });

  it('maps minor scale to minor chord when switching to chords', () => {
    expect(TopMenuKeyMatcher.getMatch('minor-scale', 'chords')).toBe('minor-chord');
  });

  it('maps major chord to major scale when switching to scales', () => {
    expect(TopMenuKeyMatcher.getMatch('major-chord', 'scales')).toBe('major-scale');
  });

  it('maps minor chord to minor scale when switching to scales', () => {
    expect(TopMenuKeyMatcher.getMatch('minor-chord', 'scales')).toBe('minor-scale');
  });

  it('preserves active chord when already in chords mode', () => {
    expect(TopMenuKeyMatcher.getMatch('minor-chord', 'chords')).toBe('minor-chord');
  });

  it('preserves active scale when already in scales mode', () => {
    expect(TopMenuKeyMatcher.getMatch('minor-scale', 'scales')).toBe('minor-scale');
  });
});
