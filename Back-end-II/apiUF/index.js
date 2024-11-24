import express from 'express';
import { buscarUfs, buscarUfPorid, buscarUfPorNome } from './servicos/servico.js';

const app = express();

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUfPorNome(nomeUf) : buscarUfs();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": "nenhuma UF encontra" });
    }
});

app.get('/ufs/:iduf', (req, res) => {
    const uf = buscarUfPorid(req.params.iduf)

    if (uf) {
        res.json(uf);
    } else if (isNaN(parseInt(req.params.iduf))) {
        res.status(400).send({ "erro": 'Requisição inválida' })
    } else {
        res.status(404).send({ "erro": 'UF não encontrada' })
    }    
});



app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080')
});