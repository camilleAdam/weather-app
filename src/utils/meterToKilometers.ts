export function meterToKilometers(value: number) : string {

    const valueInKilo = value / 1000;
    return `${valueInKilo.toFixed(0)} km`;
}