import { music } from "~/types/musicModel";
type ApiIndexModelType = music.ApiIndex;
type ApiShowModelType = music.ApiShow;
type ApiAddModelType = music.ApiAdd;
type ApiUpdateModelType = music.ApiUpdate;
type ApiDeleteModelType = music.ApiDelete;
type ApiSheetIndexModelType = music.ApiSheetIndex;

export const ApiMusic = {
  /**
   * 查询音乐列表
   */
  getMusicList(
    params: () => ApiIndexModelType["params"] | null,
    ApiServiceOptions?: ApiServiceOptions,
  ): Promise<AsyncData<ApiIndexModelType["result"]>> {
    return ApiService.post("/music/index", params, ApiServiceOptions);
  },

  /**
   * 查询单条音乐
   */
  showMusic(
    params: () => ApiShowModelType["params"] | null,
    ApiServiceOptions?: ApiServiceOptions,
  ): Promise<AsyncData<ApiShowModelType["result"]>> {
    return ApiService.post("/music/show", params, ApiServiceOptions);
  },

  /**
   * 添加音乐
   */
  addMusic(
    params: ApiAddModelType["params"],
  ): Promise<AsyncData<ApiAddModelType["result"]>> {
    return ApiService.post("/music/add", params);
  },

  /**
   * 编辑音乐
   */
  updateMusic(
    params: ApiUpdateModelType["params"],
  ): Promise<AsyncData<ApiUpdateModelType["result"]>> {
    return ApiService.post("/music/update", params);
  },

  /**
   * 删除音乐
   */
  deleteMusic(
    params: ApiDeleteModelType["params"],
  ): Promise<AsyncData<ApiDeleteModelType["result"]>> {
    return ApiService.post("/music/delete", params);
  },

  /**
   * 查询歌单列表
   */
  getMusicSheetList(): Promise<AsyncData<ApiSheetIndexModelType["result"]>> {
    return ApiService.post("/music/sheet");
  },
};