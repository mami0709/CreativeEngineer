import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * お気に入りがDBに存在するか確認。存在すればtrueを存在しなければfalseを返す
 */
export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { articleId, userId } = await request.json();

  if (!userId || !articleId) {
    return new Response(
      JSON.stringify({ message: "userIdまたはarticleIdが不足しています" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const favoriteExists = await prisma.favorite.findUnique({
      where: {
        userId_articleId: {
          userId: userId,
          articleId: articleId,
        },
      },
    });

    return new Response(JSON.stringify({ isFavorite: !!favoriteExists }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "サーバーエラーが発生しました: " + error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
