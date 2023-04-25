const extractDate = (dateString) => {
    const dateParts = dateString.split(" ");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = dateParts[5];
    const month = monthNames.indexOf(dateParts[1]) + 1;
    const day = dateParts[2];
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
}

export default extractDate;