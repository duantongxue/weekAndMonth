export const getYMD = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  }
}
export const getOtherDate = (originDate, offset) => {
  const cloneDate = new Date(originDate)
  cloneDate.setDate(cloneDate.getDate() + offset)
  return cloneDate
}
export const isEqualYMD = (date1, date2) => {
  return JSON.stringify(getYMD(date1)) === JSON.stringify(getYMD(date2))
}
export const getPrevOrNext = (chooseDate, date2) => {
  const { year: year1, month: month1 } = getYMD(chooseDate)
  const { year: year2, month: month2 } = getYMD(date2)
  if (year1 === year2 && month1 === month2) {
    return 'cur'
  }
  if (year1 !== year2) {
    return year1 > year2 ? 'prev' : 'next'
  } else if (month1 !== month2) {
    return month1 > month2 ? 'prev' : 'next'
  }
}
