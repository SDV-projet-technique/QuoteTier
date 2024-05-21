"use client";
import { Author } from "@/lib/types";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";

const { TextArea } = Input;
type FieldType = {
  authorId?: number;
  text?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
  fetch("/api/quotes", {
    method: "POST",
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
    });
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function AddQuote() {
  const [isLoading, setIsLoading] = useState(true);
  const [authors, setAuthors] = useState<{ value: number; label: string }[]>(
    [],
  );

  useEffect(() => {
    fetch("/api/authors")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setAuthors([
          ...data.map((author: Author) => ({
            value: author.id,
            label: author.name,
          })),
        ]);
      });
    setIsLoading(false);
  }, []);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  if (isLoading) {
    return <Spin className="mx-auto" />;
  }

  return (
    <div className="w-full">
      <h2 className="mb-5 text-2xl font-bold">Add Quote</h2>
      <Form
        name="basic"
        className="w-full"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Text"
          name="text"
          rules={[{ required: true, message: "Please input a quote!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item<FieldType>
          label="Author"
          name="authorId"
          rules={[{ required: true, message: "Please chose an author!" }]}
        >
          <Select
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            options={authors}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
