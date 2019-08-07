const ConvertMonth = month => {
  switch (month) {
    case "01":
      return "มกราคม";
    case "02":
      return "กุมภาพันธ์";
    case "03":
      return "มีนาคม";
    case "04":
      return "เมษายน";
    case "05":
      return "พฤษภาคม";
    case "06":
      return "มิถุนายน";
    case "07":
      return "กรกฎาคม";
    case "08":
      return "สิงหาคม";
    case "09":
      return "กันยายน";
    case "10":
      return "ตุลาคม";
    case "11":
      return "พฤศจิกายน";
    case "12":
      return "ธันวาคม";
    default:
      return "No Month";
  }
};

export default ConvertMonth;
