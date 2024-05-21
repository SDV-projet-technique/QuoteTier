"use client";
import type { Quote } from "@/lib/types";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Avatar, List, message, Space, Spin } from "antd";
import React, { useEffect } from "react";

function IconText({
  icon,
  text,
  onClick,
}: {
  icon: React.FC;
  text: string;
  onClick: () => void;
}) {
  return (
    <Space onClick={onClick} className="cursor-pointer">
      {React.createElement(icon)}
      {text}
    </Space>
  );
}

export default function Home() {
  const [data, setData] = React.useState<Quote[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main className="w-full flex-1">
        <Spin className="mx-auto" />
      </main>
    );
  }

  const handleLikeDislike = (quote: Quote, action: "like" | "dislike") => {
    try {
      fetch(`/api/quotes/${quote.id}/${action}`, { method: "PUT" })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
      message.success("Thank you for your feedback!");
      setData((prevData) => {
        return prevData.map((oldQuote) => {
          if (oldQuote.id === quote.id) {
            return {
              ...oldQuote,
              [action === "like" ? "likes" : "dislikes"]:
                oldQuote[action === "like" ? "likes" : "dislikes"] + 1,
            };
          }
          return oldQuote;
        });
      });
    } catch (error) {
      console.error(error);
      message.error("An unexpected error occurred");
    }
  };

  return (
    <List
      itemLayout="vertical"
      className="w-full"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      header={<h2 className="text-2xl font-bold">Quotes</h2>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.text}
          actions={[
            <IconText
              icon={LikeOutlined}
              text={item.likes.toString()}
              key="list-vertical-like-o"
              onClick={() => handleLikeDislike(item, "like")}
            />,
            <IconText
              icon={DislikeOutlined}
              text={item.dislikes.toString()}
              key="list-vertical-dislike"
              onClick={() => handleLikeDislike(item, "dislike")}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`}
              />
            }
            title={<a href={item.text}>{item.text}</a>}
            description={item?.author?.name || "Unknown"}
          />
        </List.Item>
      )}
    />
  );
}
