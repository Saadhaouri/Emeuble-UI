"use client";

import { useState } from "react";
import { Button, Input, Table, Modal, Form, message, Dropdown, Menu } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const initialClients = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    telephone: "0612345678",
    email: "jean.dupont@example.com",
    adresse: "123 Rue de Paris, Paris",
    dateNaissance: "1985-04-12",
    cin: "AB123456",
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    telephone: "0687654321",
    email: "sophie.martin@example.com",
    adresse: "45 Avenue des Champs, Lyon",
    dateNaissance: "1990-07-23",
    cin: "CD789012",
  },
];

export default function Clients() {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.includes(searchTerm)
  );

  const handleAddClient = () => {
    setEditingClient(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    form.setFieldsValue(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
    message.success("Client supprimé avec succès");
  };

  const handleFormSubmit = (values) => {
    if (editingClient) {
      setClients(
        clients.map((client) => (client.id === editingClient.id ? { ...client, ...values } : client))
      );
      message.success("Client mis à jour avec succès");
    } else {
      setClients([...clients, { id: (clients.length + 1).toString(), ...values }]);
      message.success("Client ajouté avec succès");
    }
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Nom", dataIndex: "nom", key: "nom" },
    { title: "Prénom", dataIndex: "prenom", key: "prenom" },
    { title: "Téléphone", dataIndex: "telephone", key: "telephone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "CIN", dataIndex: "cin", key: "cin" },
    { title: "Date de naissance", dataIndex: "dateNaissance", key: "dateNaissance" },
    {
      title: "Actions",
      key: "actions",
      render: (_, client) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEditClient(client)}>
                Modifier
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={() => handleDeleteClient(client.id)}>
                Supprimer
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
        <h1 className="text-2xl font-bold">Gestion des Clients</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClient}>
          Ajouter un client
        </Button>
      </div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Rechercher un client..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Table columns={columns} dataSource={filteredClients} rowKey="id" />
      
      <Modal
        title={editingClient ? "Modifier le client" : "Ajouter un client"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="nom" label="Nom" rules={[{ required: true, message: "Veuillez entrer le nom" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prenom" label="Prénom" rules={[{ required: true, message: "Veuillez entrer le prénom" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="telephone" label="Téléphone" rules={[{ required: true, message: "Veuillez entrer le téléphone" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Veuillez entrer un email valide" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cin" label="CIN" rules={[{ required: true, message: "Veuillez entrer le CIN" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dateNaissance" label="Date de naissance" rules={[{ required: true, message: "Veuillez entrer la date de naissance" }]}>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
