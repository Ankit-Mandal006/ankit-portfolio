export function getProjectCover(
  cover?: string
) {
  return cover && cover.length > 0
    ? cover
    : "/defaults/project-cover.webp";
}

export function getScreenshots(
  screenshots?: string[]
) {
  return screenshots && screenshots.length > 0
    ? screenshots
    : ["/defaults/screenshot.webp"];
}

export function getTrailer(
  trailer?: string
) {
  return trailer && trailer.length > 0
    ? trailer
    : "/defaults/gameplay.mp4";
}