import { mailSliceActions } from "./mailBoxSlice";

export const addMailBox = (mailData) => {
  console.log(mailData);
  const senderMail = mailData.fromMail.replace("@", "").replace(".", "");
  const recieverMail = mailData.tomail.replace("@", "").replace(".", "");
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${senderMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (senderMail !== recieverMail) {
        const responseRecieve = await fetch(
          `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${recieverMail}.json`,
          {
            method: "POST",
            body: JSON.stringify(mailData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (responseRecieve.ok) {
          alert("Email successfull sent");
        } else {
          alert("failed,Please try again!");
        }
      }
      const responseData = await response.json();
      console.log(responseData, "kkkkk");
      if (response.ok) {
        dispatch(
          mailSliceActions.mailSending({
            id: responseData.name,
            ...mailData,
          })
        );
      } else {
        alert("Failed,please try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
