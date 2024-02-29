export function getDayOrNightIcon(
    iconName: string,
    dateTimeString: string
) : string {
    const hours = new Date(dateTimeString).getHours();
    const isDayTime = hours >= 6 && hours < 19; //Can replace hardcoded value with the time of sunrise & sunset
    
    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");

}