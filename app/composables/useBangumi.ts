// services/bangumi.ts
import type { CollectionItem, CollectionsResponse } from "~/types/banguim";

const API_BASE = "https://api.bgm.tv/v0";

export const getCollections = async (
  username: string,
  type: "anime" | "book" | "music" | "game" | "real",
  page: number = 1
): Promise<CollectionsResponse> => {
  try {
    const response = await fetch(
      `${API_BASE}/users/${encodeURIComponent(
        username
      )}/collections?subject_type=${type}&type=subject&limit=20&offset=${
        (page - 1) * 20
      }`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return {
      data: data.list.map((item: any) => ({
        id: item.id,
        subject: {
          id: item.subject.id,
          type: item.subject.type,
          name: item.subject.name,
          name_cn: item.subject.name_cn,
          summary: item.subject.summary || "",
          images: {
            common: item.subject.images?.common || "",
            large: item.subject.images?.large || "",
            grid: item.subject.images?.grid || "",
            small: item.subject.images?.small || ""
          }
        },
        status: {
          status: item.status,
          rating: item.rating.overall,
          comment: item.comment || "",
          private: item.private,
          updated_at: item.updated_at
        }
      })),
      total: data.total,
      limit: data.limit,
      offset: data.offset
    };
  } catch (error) {
    console.error(`API Error: ${error}`);
    return {
      data: [],
      total: 0,
      limit: 0,
      offset: 0
    };
  }
};