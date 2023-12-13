import { RequestClaimPayload } from "../APIs/Claim/payload/requestClaimPayload";

export default class RequestClaimPayloadInit {
  static initRequest(eventId: number, data: any): RequestClaimPayload {
    return {
      claimEventId: eventId,
      currencyId: data.currencyId,
      remarks: data.remarks,
    };
  }
}
