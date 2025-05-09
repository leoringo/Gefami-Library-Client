import moment from "moment"
export const getRole = () => localStorage.getItem("role")

export const dateFormatter = (date: Date) => moment(date).format('DD-MM-YYYY HH:mm')