/**
 * Mailer service
 *
 * Connects to the mailer service container and sends emails
 */

import MailTemplateId from "./templates";
import axios from "axios";

const mailApi = axios.create({ baseURL: "http://mailer:8082" });

const turnOnMailer = async () => {};

const turnOffMailer = async () => {};

const getMailerStatus = async () => {};

type SendPayload = {
  templateId: MailTemplateId;
  recipients: { name: string; email: string }[];
}[];

const send = async (payload: SendPayload): Promise<boolean> => {
  try {
    await mailApi.post("/mail", payload);
    return true;
  } catch (err) {
    console.log("mailer err", err);
    return false;
  }
};

const getQueue = async () => {};

export default {
  turnOnMailer,
  turnOffMailer,
  getMailerStatus,
  send,
};
