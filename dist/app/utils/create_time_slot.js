"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_time_slot = void 0;
const create_time_slot = (startTime, endTime, slotDuration) => {
    // Helper function to convert 24-hour time to 12-hour AM/PM format
    const to12HourFormat = (hour, minute) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        let adjustedHour = hour % 12;
        adjustedHour = adjustedHour === 0 ? 12 : adjustedHour; // Convert 0 to 12 for midnight
        const formattedMinute = String(minute).padStart(2, '0');
        return `${adjustedHour}:${formattedMinute} ${period}`;
    };
    // Destructure and convert startTime and endTime from 'HH:MM' format strings to hours and minutes
    const [startHour, startMinute] = startTime === null || startTime === void 0 ? void 0 : startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime === null || endTime === void 0 ? void 0 : endTime.split(':').map(Number);
    // If startMinute exceeds slotDuration, use startMinute; otherwise, default to 0
    const adjustedStartMinute = startMinute >= slotDuration ? startMinute : 0;
    // If endMinute exceeds slotDuration, use endMinute; otherwise, default to 0
    const adjustedEndMinute = endMinute >= slotDuration ? endMinute : 0;
    // Calculate the total minutes from midnight for the start and end times
    const totalStartMinutes = startHour * 60 + adjustedStartMinute;
    const totalEndMinutes = endHour * 60 + adjustedEndMinute;
    let currentSlotStartTime = totalStartMinutes;
    const slots = [];
    // Loop to create time slots within given time range
    while (currentSlotStartTime + slotDuration <= totalEndMinutes) {
        // Calculate start hour and minute of the current slot
        const slotStartHour = Math.floor(currentSlotStartTime / 60);
        const slotStartMinute = currentSlotStartTime % 60;
        // Calculate end time in minutes for the current slot
        const slotEndMinutes = currentSlotStartTime + slotDuration;
        // Calculate end hour and minute of the current slot
        const slotEndHour = Math.floor(slotEndMinutes / 60);
        const slotEndMinute = slotEndMinutes % 60;
        // Convert to 12-hour format with AM/PM
        const formattedSlotStart = to12HourFormat(slotStartHour, slotStartMinute);
        const formattedSlotEnd = to12HourFormat(slotEndHour, slotEndMinute);
        // Add the formatted time slot to the slots array
        slots.push({
            startTime: formattedSlotStart,
            endTime: formattedSlotEnd,
        });
        // Move to the next slot start time
        currentSlotStartTime += slotDuration;
    }
    return slots;
};
exports.create_time_slot = create_time_slot;
