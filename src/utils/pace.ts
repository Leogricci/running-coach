/**
 * Format seconds-per-km into "mm:ss/km" string.
 * e.g. 235 → "3:55/km"
 */
export function secondsToKmPace(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}/km`;
}

/**
 * Parse a "mm:ss/km" or "mm:ss" string into seconds.
 * Returns NaN if invalid.
 */
export function kmPaceToSeconds(pace: string): number {
  const clean = pace.replace("/km", "").trim();
  const parts = clean.split(":");
  if (parts.length !== 2) return NaN;
  const mins = parseInt(parts[0], 10);
  const secs = parseInt(parts[1], 10);
  return mins * 60 + secs;
}

/**
 * Format seconds into "m:ss" countdown display string.
 * e.g. 95 → "1:35"
 */
export function secondsToDisplay(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Given a distance_m and target_pace string "mm:ss/km", calculate duration in seconds.
 */
export function calcRepDuration(distance_m: number, pace: string): number {
  const secsPerKm = kmPaceToSeconds(pace);
  if (isNaN(secsPerKm)) return 0;
  return Math.round((distance_m / 1000) * secsPerKm);
}

/**
 * Format a distance in metres to a human-readable string.
 * e.g. 400 → "400m", 1500 → "1500m", 1000 → "1km"
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000 && meters % 1000 === 0) return `${meters / 1000}km`;
  return `${meters}m`;
}
