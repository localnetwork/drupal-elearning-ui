import BaseApi from "@/lib/api/_base.api";
const APIDOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
export default class PAGEAPI {
  static async getPages(params = "") {
    const queryParams = params ? params : ``;
    const res = await BaseApi.get(APIDOMAIN + "/jsonapi/pages" + queryParams);
    return res.data;
  }
  static async findByRoute(id, params = "") {
    const queryParams = params ? params : ``;
    const res = await BaseApi.get(
      APIDOMAIN + "/jsonapi/route/" + id + queryParams
    );
    return res.data;
  }
}
