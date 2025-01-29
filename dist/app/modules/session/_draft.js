"use strict";
// const create_one_in_db = async (
//   session_payload: Session & { duration?: string }
// ) => {
//   // Fetch skill details
//   const skill_details = await prisma.skill.findUniqueOrThrow({
//     where: { id: session_payload.skill_id },
//   });
//   // Check for existing sessions on the same date and skill
//   const existing_sessions = await prisma.session.findMany({
//     where: {
//       session_date: session_payload.session_date,
//       skill_id: session_payload.skill_id,
//     },
//   });
//   // Validate session date
//   const is_date_valid = validate_date(session_payload.session_date);
//   if (!is_date_valid) {
//     throw new http_error(
//       NOT_FOUND,
//       "The date is invalid. It cannot be a past date."
//     );
//   }
//   if (!skill_details) {
//     throw new http_error(NOT_FOUND, "Skill not found.");
//   }
//   // Check for overlapping session slots
//   existing_sessions.forEach((existing_session) => {
//     const existing_start = new Date(
//       `1970-01-01T${existing_session.start_time}`
//     );
//     const new_start = new Date(`1970-01-01T${session_payload.start_time}`);
//     const existing_end = new Date(`1970-01-01T${existing_session.end_time}`);
//     const new_end = new Date(`1970-01-01T${session_payload.end_time}`);
//     if (existing_start < new_end && existing_end > new_start) {
//       throw new http_error(CONFLICT, "Slot overlaps with an existing session.");
//     }
//   });
//   // Generate time slots based on duration
//   const session_slots: Session[] = [];
//   const time_slots = create_time_slot(
//     session_payload.start_time,
//     session_payload.end_time,
//     Number(session_payload.duration)
//   );
//   delete session_payload.duration;
//   time_slots.forEach(({ startTime, endTime }) => {
//     session_slots.push({
//       ...session_payload,
//       start_time: startTime,
//       end_time: endTime,
//     });
//   });
//   // Create multiple session slots
//   const created_sessions = await prisma.session.createMany({
//     data: session_slots,
//   });
//   return created_sessions;
// };
