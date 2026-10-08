// Display same key for new top menu choice

export class TopMenuKeyMatcher {
  static getMatch(currentPattern: string, targetMenu: 'scales' | 'chords'): string {
    const lower = currentPattern.toLowerCase();
    const isChord = lower.includes('chord');
    const isMinor = lower.includes('minor') || lower.includes('min');

    if (targetMenu === 'chords') {
      if (isChord) return currentPattern;
      return isMinor ? 'minor-chord' : 'major-chord';
    } else {
      if (!isChord && lower !== 'root only') return currentPattern;
      return isMinor ? 'minor-scale' : 'major-scale';
    }
  }
}
