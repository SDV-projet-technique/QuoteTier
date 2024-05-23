"use client";
import type { Quote } from "@/lib/types";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { App, Avatar, List, Select, Space, Spin } from "antd";
import { createElement, FC, useEffect, useState } from "react";

function IconText({
  icon,
  text,
  onClick,
}: {
  icon: FC;
  text: string;
  onClick: () => void;
}) {
  return (
    <Space onClick={onClick} className="cursor-pointer">
      {createElement(icon)}
      {text}
    </Space>
  );
}

export default function Home() {
  const [data, setData] = useState<Quote[]>([]);
  const [dataRecent, setDataRecent] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { message } = App.useApp();

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setDataRecent(data);
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
      fetch(`/api/quotes/${quote.id}/${action}`, { method: "PUT" });
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
    <Space direction="vertical" className="w-full">
      <Space>
        <p>Order by: </p>
        <Select
          defaultValue={"recent"}
          style={{ width: 200 }}
          placeholder="Order by"
          onChange={(value) => {
            setData((prevData) => {
              switch (value) {
                case "recent":
                  return dataRecent;
                case "likes":
                  return [...prevData].sort((a, b) => b.likes - a.likes);
                case "dislikes":
                  return [...prevData].sort((a, b) => b.dislikes - a.dislikes);
                default:
                  return prevData;
              }
            });
          }}
        >
          <Select.Option value="recent">Recent</Select.Option>
          <Select.Option value="likes">Likes</Select.Option>
          <Select.Option value="dislikes">Dislikes</Select.Option>
        </Select>
      </Space>
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
              title={<p className="italic">"{item.text}"</p>}
              description={item?.author?.name || "Unknown"}
            />
          </List.Item>
        )}
      />
    </Space>
  );
}
