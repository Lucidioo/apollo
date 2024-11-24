import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q = `
    INSERT INTO usuarios(
      \`armario\`, \`estado\`, \`cidade\`, \`data_entrega\`, 
      \`business_case\`, \`orcamento_obra\`, \`fase_atual\`, \`status\`, 
      \`plano_mensal\`, \`responsavel_projeto\`, \`emissao_etp\`, 
      \`switch_site\`, \`observacao\`
    ) VALUES(?)
  `;

  const values = [
    req.body.armario,
    req.body.estado,
    req.body.cidade,
    req.body.data_entrega,
    req.body.business_case,
    req.body.orcamento_obra,
    req.body.fase_atual,
    req.body.status,
    req.body.plano_mensal,
    req.body.responsavel_projeto,
    req.body.emissao_etp,
    req.body.switch_site,
    req.body.observacao,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Informação adicionada com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q = `
    UPDATE usuarios SET 
      \`armario\` = ?, \`estado\` = ?, \`cidade\` = ?, \`data_entrega\` = ?, 
      \`business_case\` = ?, \`orcamento_obra\` = ?, \`fase_atual\` = ?, \`status\` = ?, 
      \`plano_mensal\` = ?, \`responsavel_projeto\` = ?, \`emissao_etp\` = ?, 
      \`switch_site\` = ?, \`observacao\` = ? 
    WHERE \`id\` = ?
  `;

  const values = [
    req.body.armario,
    req.body.estado,
    req.body.cidade,
    req.body.data_entrega,
    req.body.business_case,
    req.body.orcamento_obra,
    req.body.fase_atual,
    req.body.status,
    req.body.plano_mensal,
    req.body.responsavel_projeto,
    req.body.emissao_etp,
    req.body.switch_site,
    req.body.observacao,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Informação alterada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Informação excluída com sucesso.");
  });
};
