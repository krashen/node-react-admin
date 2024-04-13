import React from 'react';
import '../Form.css'

type Props = {
    children: React.ReactNode;
  }

const WrapperForm = ({children}: Props) => {

    return (
        <main className='form-signin w-100 m-auto'>
            {children}
        </main>
    )
}

export default WrapperForm