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
        await fetch(
          `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${recieverMail}.json`,
          {
            method: "POST",
            body: JSON.stringify(mailData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
        throw new Error("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
