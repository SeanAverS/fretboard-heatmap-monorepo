package com.example.fretboardheatmap

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Display the heatmap dots
 *
 * Uses [AnimatedContent] with [Triple] state to animate heatmap dots whenever targetState parameters change
 *
 * @param selectedRoot current selected root from [BottomMenuArea]
 * @param topMenu current [TopMenuChoice] ("CHORDS" or "SCALES")
 * @param selectedDropdownOption current dropdown choice
 * @param noteLabels current visibility state for heatmap dot labels
 */
@Composable
fun HeatmapLogic(
    selectedRoot: String?,
    topMenu: TopMenuChoice?,
    selectedDropdownOption: String,
    noteLabels: Boolean
) {
    if (selectedRoot == null || topMenu == null) return

    // animations for heatmap dots
    // parameters handle state when transitioning between keys
    AnimatedContent(
        targetState = Triple(selectedRoot, selectedDropdownOption, topMenu),
        transitionSpec = {
            val duration = 280

            slideInHorizontally( // new key
                animationSpec = tween(duration),
                initialOffsetX = { -it }
            ) + fadeIn(animationSpec = tween(duration)) togetherWith
                    slideOutHorizontally( // old key
                        animationSpec = tween(duration),
                        targetOffsetX = { it }
                    ) + fadeOut(animationSpec = tween(duration))
        },
        label = "FretboardTransition"
    ) { (currentRoot, currentDropdown, currentMenu) ->
        Box(modifier = Modifier
            .fillMaxWidth()
            .height(265.dp)) {
            Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.SpaceEvenly
            ) {
                Spacer(modifier = Modifier.weight(1f))

                // display dots on each string
                repeat(6) { stringIndex ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(24.dp),
                        contentAlignment = Alignment.CenterStart
                    ) {
                        HeatmapFrets(
                            string = stringIndex,
                            selectedRoot = currentRoot,
                            topMenu = currentMenu,
                            selectedDropdownOption = currentDropdown,
                            noteLabels = noteLabels
                        )
                    }
                    Spacer(modifier = Modifier.weight(1f)) // center horizontally
                }
            }
        }
    }
}

/**
 * Map heatmap dot positions
 *
 * Uses [FretPositions] to get dot positions
 * Uses [CenterNotes] + [GuitarSpecs.frets] to center dots inside frets
 *
 * @param string the current string
 * rest of params defined in parent [HeatmapLogic]
 */
@Composable
private fun HeatmapFrets(
    string: Int,
    selectedRoot: String,
    topMenu: TopMenuChoice,
    selectedDropdownOption: String,
    noteLabels: Boolean
) {
    // get fret positions and finger numbers
    val stringPositions = remember(topMenu, selectedDropdownOption, selectedRoot, string) {
        FretPositions.getFretMap(topMenu, selectedDropdownOption, selectedRoot)[string] ?: emptyList()
    }


    // center each fret on current string
    Row(modifier = Modifier.fillMaxSize()) {
        Spacer(modifier = Modifier.width(10.dp))

        // account for current fret thickness
        GuitarSpecs.frets.forEachIndexed { index, fretWeight ->
            val currentFretNumber = index + 1

            Box(
                modifier = Modifier
                    .weight(fretWeight.value)
                    .fillMaxHeight(),
                contentAlignment = Alignment.Center
            ) {
                if (stringPositions.contains(currentFretNumber)) {
                    CenterNotes(
                        root = selectedRoot,
                        string = string,
                        fret = currentFretNumber,
                        topMenu = topMenu,
                        dropdown = selectedDropdownOption,
                        showLabels = noteLabels
                    )
                }
            }
            Spacer(modifier = Modifier.width(3.dp))
        }
    }
}

/**
 * Calculate center of heatmap dots and label positions
 *
 * Aligns [NoteCircle] inside center of current fret
 *
 * @param fret the current fret
 * @param dropdown the selected dropdown choice
 * @param showLabels current state of labels button
 * rest of params defined in [HeatmapFrets] and [HeatmapLogic]
 */
@Composable
private fun CenterNotes(
    root: String,
    string: Int,
    fret: Int,
    topMenu: TopMenuChoice,
    dropdown: String,
    showLabels: Boolean
) {
        // because parent box(HeatmapFrets) has contentAlignment.Center, alignment math used in Swift not needed
        // NoteCircle gets auto centered in current fret
        NoteCircle(
            root = root,
            string = string,
            fret = fret,
            topMenu = topMenu,
            dropdown = dropdown,
            showLabels = showLabels
        )
}

/**
 * Determine the heatmap dots color and labels display
 *
 * Highlights the current [root]
 * Displays correct [FretLabels]
 *
 * params defined in [CenterNotes], [HeatmapFrets] and [HeatmapLogic]
 */
@Composable
fun NoteCircle(
    root: String,
    string: Int,
    fret: Int,
    topMenu: TopMenuChoice,
    dropdown: String,
    showLabels: Boolean
) {
    val isRoot = remember(root, string, fret) {
        NoteAlphabet.getNoteName(string, fret) == root
    }

    val labelText = remember(topMenu, root, dropdown, string, fret) {
        FretLabels.getLabels(topMenu, root, dropdown, string, fret)
    }

    Box( // dot size
        modifier = Modifier
            .size(24.dp)
            .background(if (isRoot) Color.Red else Color(0xFF208FFA), shape = CircleShape),
        contentAlignment = Alignment.Center
    ) { // labels
        if (showLabels && labelText.isNotEmpty()) {
            Text(
                text = labelText,
                color = Color.White,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}