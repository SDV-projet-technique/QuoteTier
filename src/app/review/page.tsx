"use client";
import type { Quote } from "@/lib/types";
import { Popconfirm, Space, Spin, Table } from "antd";
import React, { useEffect } from "react";

export default function Home() {
  const [data, setData] = React.useState<Quote[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetch("/api/quotes/not-approved")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spin className="mx-auto" />;
  }

  const handleApproveReject = (quoteId: any, action: "approve" | "reject") => {
    try {
      fetch(`/api/quotes/${quoteId}/${action}`, { method: "PUT" }).then((res) =>
        res.json(),
      );
      const newData = data.filter((item: any) => {
        return item.id !== quoteId;
      });
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Quote",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author: { name: string }) => {
        return author.name;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_: any, record: any) => {
        return (
          <Space size="middle" className="w-full">
            <a
              onClick={() => {
                handleApproveReject(record.id, "approve");
              }}
            >
              Approve
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleApproveReject(record.id, "reject")}
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold">Approve Quote</h2>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
