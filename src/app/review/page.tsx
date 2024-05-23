"use client";
import type { TableProps } from "antd";
import {
  App,
  Form,
  Input,
  Popconfirm,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";

interface Quote {
  id: number;
  key: string;
  text: string;
  author: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: Quote;
  index: number;
}

function EditableCell({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}: EditableCellProps) {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

export default function Home() {
  const [form] = Form.useForm();
  const [data, setData] = useState([] as Quote[]);
  const [editingKey, setEditingKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { message } = App.useApp();

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

  const isEditing = (record: Quote) => record.id.toString() === editingKey;

  const edit = (record: Partial<Quote> & { key: React.Key }) => {
    form.setFieldsValue({ text: "", author: "", ...record });
    setEditingKey(record.id?.toString() || "");
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record: Quote) => {
    try {
      const row = (await form.validateFields()) as Quote;

      fetch(`/api/quotes/${record.id}`, {
        method: "PUT",
        body: JSON.stringify({ text: row.text }),
      }).then((res) => res.json());

      const newData = [...data];
      const index = newData.findIndex((item) => record.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      message.success("Quote updated successfully");
    } catch (errInfo) {
      message.error("Quote update failed");
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleApproveReject = (quoteId: any, action: "approve" | "reject") => {
    try {
      fetch(`/api/quotes/${quoteId}/${action}`, { method: "PUT" }).then((res) =>
        res.json(),
      );
      const newData = data.filter((item: any) => {
        return item.id !== quoteId;
      });
      setData(newData);
      message.success(`Quote ${action}d successfully`);
    } catch (error) {
      message.error(`Quote ${action} failed`);
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "10%",
      editable: false,
    },
    {
      title: "Text",
      dataIndex: "text",
      width: "50%",
      editable: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      render: (author: { name: string }) => {
        return author.name;
      },
      width: "20%",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Quote) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle" className="w-full">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                handleApproveReject(record.id, "approve");
              }}
            >
              Approve
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleApproveReject(record.id, "reject")}
            >
              <Typography.Link>Reject</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Quote) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey={(record) => record.id}
        className="w-full"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}
