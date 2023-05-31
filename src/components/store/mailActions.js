import axios from "axios";

export const addmail = async (mailData) => {
  console.log(mailData, "hhhhh");
  const senderMail = mailData.fromMail.replace("@", "").replace(".", "");
  const recieverMail = mailData.tomail.replace("@", "").replace(".", "");
  try {
    console.log(mailData, "jakeeeeeeeeeee");
    const response = await axios.post(
      `https://mail-box-client-808d3-default-rtdb.firebaseio.com/${senderMail}.json`,
      mailData
    );

    if (senderMail !== recieverMail) {
      const responseRecieve = await axios.post(
        `https://mail-box-client-808d3-default-rtdb.firebaseio.com/${recieverMail}.json`,
        mailData
      );
      console.log(responseRecieve, "jjjj");
    }

    const responseData = await response.data;
    alert("mail sent successfully");
    console.log(responseData, "jjjj");
  } catch (error) {
    console.log(error, "errrrror");
  }
};
