import React from 'react';
import EstagioHeader from './Estagio';

export default function DetalheEstagio(props) {
    const { grupo } = props;

    return (
        <>
            <EstagioHeader />
            {grupo}
        </>
      );
}