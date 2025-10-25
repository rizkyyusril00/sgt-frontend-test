"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  message,
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Typography } from "antd";
import Image from "next/image";

export default function ProductsPage() {
  type Product = {
    product_id: string;
    product_title: string;
    product_price: number;
    product_category: string;
    product_description?: string;
    product_image?: string;
  };

  const [products, setProducts] = useState<Product[]>([]); // Menyimpan data produk
  const [loading, setLoading] = useState<boolean>(true); // Loading indicator
  const [page, setPage] = useState<number>(1); // halaman aktif
  const [total, setTotal] = useState<number>(0); // total semua produk
  const [search, setSearch] = useState<string>(""); // kata kunci pencarian
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // modal visibility
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // state untuk view modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    form.setFieldsValue(product); // isi form otomatis
  };

  const handleDetail = async (id: string) => {
    try {
      setIsViewModalOpen(true);
      setViewProduct(null); // agar tampil loading di modal

      const response = await axios.get(`/api/product?product_id=${id}`);
      const productData = response.data.data ?? response.data;
      setViewProduct(productData);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      message.error("Gagal mengambil detail produk");
      setIsViewModalOpen(false);
    }
  };

  const [form] = Form.useForm();

  const { Title } = Typography;

  // Fungsi untuk ambil data sesuai halaman
  const fetchProducts = async (pageNum: number) => {
    try {
      const response = await axios.get(
        `/api/products?page=${pageNum}&limit=10&search=${search}`
      );
      // console.log("Response:", response.data);
      // console.log("Pagination response:", response.data.pagination);
      setProducts(response.data.data || []);
      setTotal(response.data.pagination?.total || 0); // ambil total dari backend
    } catch (error) {
      console.error("Error fetch products:", error);
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetch pertama kali
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Search dengan debounce 300ms
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(1); // reset ke page 1
      setPage(1);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Struktur kolom table UI
  const columns = [
    {
      title: "Product Title",
      dataIndex: "product_title",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      render: (price: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price),
    },
    {
      title: "Category",
      dataIndex: "product_category",
    },
    {
      title: "Description",
      dataIndex: "product_description",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Product) => (
        <Space size="middle">
          <Button
            color="default"
            onClick={() => handleDetail(record.product_id)}
          >
            Detail
          </Button>
          <Button
            color="blue"
            variant="solid"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  // Ketika user klik halaman
  const handleChangePage = (pageNum: number) => {
    setPage(pageNum);
    fetchProducts(pageNum);
  };

  return (
    <div className="p-4">
      <Title level={2}>Products</Title>
      <div className="flex justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Cari products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Product
        </Button>
      </div>
      <Table
        rowKey="product_id"
        dataSource={products}
        columns={columns}
        loading={loading}
        pagination={{
          current: page,
          total: total,
          pageSize: 10,
          onChange: handleChangePage,
        }}
      />

      <Modal
        title="Product Detail"
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setViewProduct(null);
        }}
        footer={null}
      >
        {viewProduct ? (
          <div style={{ gap: 8 }}>
            <p>
              <strong>Title:</strong> {viewProduct.product_title}
            </p>
            <p>
              <strong>Price:</strong> {viewProduct.product_price}
            </p>
            <p>
              <strong>Category:</strong> {viewProduct.product_category}
            </p>
            <p>
              <strong>Description:</strong> {viewProduct.product_description}
            </p>
            {viewProduct.product_image ? (
              <Image
                src={viewProduct.product_image}
                alt={viewProduct.product_title}
                width={300}
                height={200}
              />
            ) : null}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingProduct(null); // hapus data edit
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              if (editingProduct) {
                // edit
                await axios.put(`/api/product`, {
                  product_id: editingProduct.product_id,
                  ...values,
                });
                message.success("Product updated successfully!");
              } else {
                // === MODE CREATE ===
                await axios.post(`/api/product`, values);
                message.success("Product created successfully!");
              }

              setIsModalOpen(false);
              form.resetFields();
              setEditingProduct(null);
              fetchProducts(1);
              setPage(1);
            } catch (error) {
              message.error("Failed to save product");
              console.error(error);
            }
          }}
        >
          <Form.Item
            label="Product Title"
            name="product_title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Enter product title" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="product_price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <InputNumber placeholder="Enter price" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="product_category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item label="Description" name="product_description">
            <TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
