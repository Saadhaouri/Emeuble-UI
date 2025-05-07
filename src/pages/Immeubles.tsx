import React, { useState } from "react";
import { Button, Input, Table, Modal, Form, message, Dropdown, Menu } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const initialImmeubles = [
  {
    id: "1",
    name: "Immeuble 1",
    address: "123 Rue de Paris",
    type: "Appartement",
    commercial: "Sophie Martin",
    price: 500000,
    dateConstruction: "2015-05-15",
    availableUnits: 5,
  },
  {
    id: "2",
    name: "Immeuble Casablanca 2",
    address: "456 Avenue Hassan II, Casablanca",
    type: "Villa",
    commercial: "Mohamed El Amrani",
    price: 1500000,
    dateConstruction: "2020-08-01",
    availableUnits: 3,
  },
  {
    id: "3",
    name: "Immeuble Marrakesh 3",
    address: "789 Rue Moulay Youssef, Marrakech",
    type: "Appartement",
    commercial: "Fatima Zahra Benjelloun",
    price: 1200000,
    dateConstruction: "2018-11-22",
    availableUnits: 8,
  },
  {
    id: "4",
    name: "Immeuble Fès 4",
    address: "101 Boulevard Mohammed V, Fès",
    type: "Appartement",
    commercial: "Rachid Boussalem",
    price: 800000,
    dateConstruction: "2017-02-18",
    availableUnits: 6,
  },
  {
    id: "5",
    name: "Immeuble Agadir 5",
    address: "202 Rue de la Paix, Agadir",
    type: "Villa",
    commercial: "Khalid Amine",
    price: 2000000,
    dateConstruction: "2021-03-10",
    availableUnits: 2,
  },
  {
    id: "6",
    name: "Immeuble Tangier 6",
    address: "303 Avenue de Tanger, Tanger",
    type: "Appartement",
    commercial: "Leila El Idrissi",
    price: 950000,
    dateConstruction: "2016-06-25",
    availableUnits: 4,
  },
  {
    id: "7",
    name: "Immeuble Rabat 7",
    address: "404 Rue d'Alger, Rabat",
    type: "Villa",
    commercial: "Yassine Lahlou",
    price: 2500000,
    dateConstruction: "2022-01-30",
    availableUnits: 1,
  },
  {
    id: "8",
    name: "Immeuble Tanger 8",
    address: "505 Boulevard Mohammed VI, Tanger",
    type: "Appartement",
    commercial: "Nadia Bensaid",
    price: 1300000,
    dateConstruction: "2019-07-12",
    availableUnits: 7,
  },
];

const Immeubles: React.FC = () => {
  const [immeubles, setImmeubles] = useState(initialImmeubles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingImmeuble, setEditingImmeuble] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredImmeubles = immeubles.filter(
    (immeuble) =>
      immeuble.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      immeuble.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddImmeuble = () => {
    setIsEdit(false);
    setEditingImmeuble(null);
    setIsModalOpen(true);
  };

  const handleEditImmeuble = (immeuble) => {
    setIsEdit(true);
    setEditingImmeuble(immeuble);
    form.setFieldsValue(immeuble);
    setIsModalOpen(true);
  };

  const handleDeleteImmeuble = (immeubleId) => {
    setImmeubles(immeubles.filter((immeuble) => immeuble.id !== immeubleId));
    message.success("Immeuble supprimé avec succès");
  };

  const handleFormSubmit = (values) => {
    if (isEdit) {
      setImmeubles(
        immeubles.map((immeuble) =>
          immeuble.id === editingImmeuble.id ? { ...editingImmeuble, ...values } : immeuble
        )
      );
      message.success("Immeuble mis à jour avec succès");
    } else {
      const newImmeuble = {
        ...values,
        id: (immeubles.length + 1).toString(),
      };
      setImmeubles([...immeubles, newImmeuble]);
      message.success("Immeuble ajouté avec succès");
    }
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Nom", dataIndex: "name", key: "name" },
    { title: "Adresse", dataIndex: "address", key: "address" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Prix", dataIndex: "price", key: "price" },
    { title: "Commercial", dataIndex: "commercial", key: "commercial" },
    {
      title: "Actions",
      key: "actions",
      render: (_, immeuble) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEditImmeuble(immeuble)}>
                <EditOutlined /> Modifier
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => handleDeleteImmeuble(immeuble.id)}>
                <DeleteOutlined /> Supprimer
              </Menu.Item>
            </Menu>
          }
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gestion des Immeubles</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddImmeuble}>
          Ajouter un immeuble
        </Button>
      </div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Rechercher un immeuble..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Table columns={columns} dataSource={filteredImmeubles} rowKey="id" />

      <Modal
        title={isEdit ? "Modifier un immeuble" : "Ajouter un immeuble"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label="Nom"
            name="name"
            rules={[{ required: true, message: "Le nom est requis" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Adresse"
            name="address"
            rules={[{ required: true, message: "L'adresse est requise" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Le type est requis" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Prix"
            name="price"
            rules={[{ required: true, message: "Le prix est requis" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Commercial"
            name="commercial"
            rules={[{ required: true, message: "Le commercial est requis" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Mettre à jour" : "Ajouter"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Immeubles;
