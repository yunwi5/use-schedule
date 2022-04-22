import { NoIdUserContact } from "../../models/UserContact";
import axios from "axios";

export async function postContact(contactObj: NoIdUserContact) {
    let message = "";
    try {
        const { status, data } = await axios.post("/api/contact", contactObj);
        console.log("response:", { status, data });
        if (status >= 200 && status < 300) {
            return { isSuccess: true, message: data.message || "Inserting contact successful" };
        }
    } catch (err) {
        message = err instanceof Error ? err.message : "Inserting contact did not work.";
    }
    return { isSuccess: false, message };
}
