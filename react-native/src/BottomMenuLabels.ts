/**
 * Bottom menu labels helper for determining major/minor root note button labels
 */
export class BottomMenuLabels {
  static getLabels(
    root: string,
    topMenu: 'scales' | 'chords' | null,
    dropdownChoice: string
  ): string {
    if (this.minorKeySelected(topMenu, dropdownChoice)) {
      return `${root}m`;
    }
    return root;
  }

  private static minorKeySelected(
    topMenu: 'scales' | 'chords' | null,
    dropdownChoice: string
  ): boolean {
    if (!topMenu) return false;
    const lower = dropdownChoice.toLowerCase();
    const isMinor = lower.includes('minor') || lower.includes('min');
    return (topMenu === 'scales' || topMenu === 'chords') && isMinor;
  }
}
