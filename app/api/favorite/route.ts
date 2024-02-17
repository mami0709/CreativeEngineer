import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/*
 * お気に入りがDBに存在しなければお気に入り登録し、存在すればお気に入り削除
 */
export async function POST(request: Request) {
  const requestBody = await request.text();
  const { articleId, userId } = JSON.parse(requestBody);

  if (!userId || !articleId) {
    return NextResponse.json(
      { message: "userIdまたはarticleIdが不足しています" },
      { status: 400 }
    );
  }

  try {
    // データベースにお気に入りが存在するか確認
    const favoriteExists = await prisma.favorite.findUnique({
      where: {
        userId_articleId: {
          userId: userId,
          articleId: articleId,
        },
      },
    });

    if (favoriteExists) {
      // お気に入りが存在する場合は削除
      await prisma.favorite.delete({
        where: {
          userId_articleId: {
            userId: userId,
            articleId: articleId,
          },
        },
      });
      return NextResponse.json(
        { message: "お気に入りを解除しました" },
        { status: 200 }
      );
    } else {
      // お気に入りが存在しない場合は作成
      await prisma.favorite.create({
        data: {
          userId: userId,
          articleId: articleId,
        },
      });
      return NextResponse.json(
        { message: "お気に入りに追加しました" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました: " + error.message },
      { status: 500 }
    );
  }
}
