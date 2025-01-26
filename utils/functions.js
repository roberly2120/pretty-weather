const getDateAndTime = (data) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const rawDateTime = data.location.localtime
  const rawDate = rawDateTime.split(" ")[0]
  const rawTime = rawDateTime.split(" ")[1]
  let time
  let month
  let monthNum

  const year = rawDate.split("-")[0]
  const monthNumString = rawDate.split("-")[1]
  const day = rawDate.split("-")[2]

  // convert time from military to standard
  if (rawTime[0] === "0") {
    time = rawTime.slice(1) + " AM"
  } else {
    let hour = String(parseInt(rawTime.slice(0,2)) - 12)
    const minutes = rawTime.slice(3)
    time = hour + ':' + minutes + " PM"
  }

  // convert month to abbreviated string
  if (monthNumString[0] === "0") {
    monthNum = parseInt(monthNumString[1])
  } else {
    monthNum = parseInt(monthNumString)
  }
  month = months[monthNum]
  return {
    year,
    month,
    day,
    time
  }
}

const tempColor = (data) => {
  let color = ""
  const temp = parseInt(data.current.temp_f)
  
  if (temp <= 32) return "blueBright";
  if (temp <= 60) return "cyanBright";
  if (temp <= 80) return "greenBright";
  return "redBright";
}
export {
  getDateAndTime,
  tempColor
}