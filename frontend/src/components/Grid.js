import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const TableContainer = styled.div`
  width: 1800px;
  height: 700px;
  overflow: auto; /* Permite rolagem caso os dados excedam o tamanho */
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px 0;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Armário</Th>
            <Th>Estado</Th>
            <Th>Cidade</Th>
            <Th>Data de Entrega</Th>
            <Th>Business Case</Th>
            <Th>Orçamento da Obra</Th>
            <Th>Fase Atual</Th>
            <Th>Status</Th>
            <Th>Plano Mensal</Th>
            <Th>Responsável pelo Projeto</Th>
            <Th>Emissão ETP</Th>
            <Th>Switch Site</Th>
            <Th>Observação</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="7%">{item.armario}</Td>
              <Td width="5%">{item.estado}</Td>
              <Td width="5%">{item.cidade}</Td>
              <Td width="9%">{item.data_entrega}</Td>
              <Td width="8%">{item.business_case}</Td>
              <Td width="10%">{item.orcamento_obra}</Td>
              <Td width="7%">{item.fase_atual}</Td>
              <Td width="5%">{item.status}</Td>
              <Td width="8%">{item.plano_mensal}</Td>
              <Td width="13%">{item.responsavel_projeto}</Td>
              <Td width="10%">{item.emissao_etp}</Td>
              <Td width="6%">{item.switch_site}</Td>
              <Td width="14%">{item.observacao}</Td>
              <Td alignCenter width="10%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Grid;
