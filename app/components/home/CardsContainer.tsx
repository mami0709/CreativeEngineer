import React from "react";
import { Card } from "./Card";
import { DummyData } from "../../util/constants";

export const CardsContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {DummyData.map((data) => (
        <Card
          key={data.id}
          id={data.id}
          title={data.title}
          mainImage={data.mainImage}
          content={data.content}
          tags={data.tags}
          category={data.category}
          updated_at={data.updated_at}
          created_at={data.created_at}
        />
      ))}
    </div>
  );
};
