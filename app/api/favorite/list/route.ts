import { getDetailArticle } from "@/app/lib/microcms/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * ユーザーのお気に入り記事一覧を取得
 */
export async function GET(request: Request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "userIdが不足しています" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: userId },
    });

    // 各お気に入り記事の詳細を非同期に取得
    const articlesDetails = await Promise.all(
      favorites.map((favorite) => getDetailArticle(favorite.articleId))
    );

    return new Response(JSON.stringify({ favorites, articlesDetails }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
