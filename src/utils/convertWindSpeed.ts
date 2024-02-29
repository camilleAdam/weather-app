export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKiloPerHour = speedInMetersPerSecond * 3.6;
    return `${speedInKiloPerHour.toFixed(0)} km/h`;
}