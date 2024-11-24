import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.div`
  width: 1800px;
  height: 180px;
  overflow: auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

// Função para formatar a data no formato YYYY-MM-DD
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const UserForm = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.armario.value = onEdit.armario;
      user.estado.value = onEdit.estado;
      user.cidade.value = onEdit.cidade;
      user.data_entrega.value = formatDate(onEdit.data_entrega); // Formatação da data
      user.business_case.value = onEdit.business_case;
      user.orcamento_obra.value = onEdit.orcamento_obra;
      user.fase_atual.value = onEdit.fase_atual;
      user.status.value = onEdit.status;
      user.plano_mensal.value = onEdit.plano_mensal;
      user.responsavel_projeto.value = onEdit.responsavel_projeto;
      user.emissao_etp.value = onEdit.emissao_etp;
      user.switch_site.value = onEdit.switch_site;
      user.observacao.value = onEdit.observacao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.armario.value ||
      !user.estado.value ||
      !user.cidade.value ||
      !user.data_entrega.value ||
      !user.business_case.value ||
      !user.orcamento_obra.value ||
      !user.fase_atual.value ||
      !user.status.value ||
      !user.plano_mensal.value ||
      !user.responsavel_projeto.value ||
      !user.emissao_etp.value ||
      !user.switch_site.value ||
      !user.observacao.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const userData = {
      armario: user.armario.value,
      estado: user.estado.value,
      cidade: user.cidade.value,
      data_entrega: user.data_entrega.value,
      business_case: user.business_case.value,
      orcamento_obra: user.orcamento_obra.value,
      fase_atual: user.fase_atual.value,
      status: user.status.value,
      plano_mensal: user.plano_mensal.value,
      responsavel_projeto: user.responsavel_projeto.value,
      emissao_etp: user.emissao_etp.value,
      switch_site: user.switch_site.value,
      observacao: user.observacao.value,
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, userData);
        toast.success("Atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", userData);
        toast.success("Criado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao salvar dados.");
    }

    // Limpa os campos após o envio
    user.armario.value = "";
    user.estado.value = "";
    user.cidade.value = "";
    user.data_entrega.value = "";
    user.business_case.value = "";
    user.orcamento_obra.value = "";
    user.fase_atual.value = "";
    user.status.value = "";
    user.plano_mensal.value = "";
    user.responsavel_projeto.value = "";
    user.emissao_etp.value = "";
    user.switch_site.value = "";
    user.observacao.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer>
      <Form ref={ref} onSubmit={handleSubmit}>
        <InputArea>
          <Label>Armário</Label>
          <Input name="armario" />
        </InputArea>
        <InputArea>
          <Label>Estado</Label>
          <Input name="estado" />
        </InputArea>
        <InputArea>
          <Label>Cidade</Label>
          <Input name="cidade" />
        </InputArea>
        <InputArea>
          <Label>Data de Entrega</Label>
          <Input name="data_entrega" type="date" />
        </InputArea>
        <InputArea>
          <Label>Business Case</Label>
          <Input name="business_case" />
        </InputArea>
        <InputArea>
          <Label>Orçamento da Obra</Label>
          <Input name="orcamento_obra" />
        </InputArea>
        <InputArea>
          <Label>Fase Atual</Label>
          <Input name="fase_atual" />
        </InputArea>
        <InputArea>
          <Label>Status</Label>
          <Input name="status" />
        </InputArea>
        <InputArea>
          <Label>Plano Mensal</Label>
          <Input name="plano_mensal" />
        </InputArea>
        <InputArea>
          <Label>Responsável pelo Projeto</Label>
          <Input name="responsavel_projeto" />
        </InputArea>
        <InputArea>
          <Label>Emissão ETP</Label>
          <Input name="emissao_etp" />
        </InputArea>
        <InputArea>
          <Label>Switch Site</Label>
          <Input name="switch_site" />
        </InputArea>
        <InputArea>
          <Label>Observação</Label>
          <Input name="observacao" />
        </InputArea>
        <Button type="submit">SALVAR</Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;