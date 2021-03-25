import React from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function DetalheEstagio(props) {
    const { estagio } = props.location.state;

    return (
        <>
            <PageHeader 
                    title='Escala de Estagios'
                    subTitle='Lista dos Grupos de Estagios' 
                    icon={ <ViewListIcon fontSize='large'/> } />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{estagio.descricao}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {estagio.grupos.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.disciplina}</TableCell>
                            <TableCell>{row.preceptor}</TableCell>
                            <TableCell>{row.local}</TableCell>
                            <TableCell>{row.setor}</TableCell>
                            <TableCell>{row.turno}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
      );
}