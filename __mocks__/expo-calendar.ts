export const requestCalendarPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' })
export const getCalendarsAsync = jest.fn().mockResolvedValue([{ id: '1', title: 'Calendar', source: { name: 'test' } }])
export const createEventAsync = jest.fn().mockResolvedValue('event-1')
export const EntityTypes = { EVENT: 'event' }
